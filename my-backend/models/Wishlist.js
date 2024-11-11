const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      category: String,
      brand: String,
      price: Number,
      specifications: {
        color: String,
        ram: String,
        storage: String,
        processor: String,
        screenSize: String,
        bluetoothVersion: String,
        batteryLife: Number,
        weight: Number,
        sensorType: String,
        megapixels: Number,
        videoResolution: String,
        screenType: String,
        resolution: String,
        refreshRate: String,
        hdmiPorts: Number,
      },
      features: [String],
      ratings: {
        average: Number,
        count: Number,
      },
      availability: Boolean,
      image: String,
      addedAt: { type: Date, default: Date.now }
    }
  ]
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
module.exports = Wishlist;
