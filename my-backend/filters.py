from pyspark.sql import SparkSession
from pyspark.sql.functions import col
import sys
import json

spark = SparkSession.builder \
    .appName("Recommendation System") \
    .config("spark.mongodb.input.uri", "mongodb://localhost:27017/BDT_users.products") \
    .config("spark.mongodb.output.uri", "mongodb://localhost:27017/BDT_users.products") \
    .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1") \
    .getOrCreate()

spark.sparkContext.setLogLevel("DEBUG")

try:
    df = spark.read.format("mongo").load()
    
    df.show()

    if len(sys.argv) > 1:
        product_id = sys.argv[1]
        print(f"Processing recommendations for product ID: {product_id}")
    else:
        print("No product_id provided. Exiting.")
        spark.stop()
        sys.exit(1)

    product_data = df.filter(col("_id").cast("string") == product_id).first()

    if product_data:
        category = product_data['category']
        brand = product_data['brand']
        color = product_data['specifications'].get('color', None)
        ram = product_data['specifications'].get('ram', None)
        storage = product_data['specifications'].get('storage', None)

        # Recommend products based on similar category, brand, or specifications
        recommendations_df = df.filter(
            (col("category") == category) | (col("brand") == brand) |
            (col("specifications.color") == color) | (col("specifications.ram") == ram) |
            (col("specifications.storage") == storage)
        ).filter(col("_id").cast("string") != product_id)  # Exclude the original product

        recommendations = []
        for row in recommendations_df.collect():
            recommendations.append({
                "product_id": str(row["_id"]),  
                "name": row["name"],
                "price": row["price"],
                "category": row["category"],
                "brand": row["brand"],
                "image": row["image"],
                "specifications": row["specifications"]
            })

        # Output recommendations as JSON (captured by the Node.js backend)
        print(json.dumps(recommendations))

        recommendations_df.write.format("mongo").mode("append").save()

    else:
       
        print(json.dumps([]))

except Exception as e:
    print(f"Error during recommendation generation: {e}")
finally:
    # Stop the Spark session
    spark.stop()
