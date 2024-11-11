const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., mobile, laptop, etc.
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  specifications: {
    color: { type: [String], required: true }, // Array of colors
    ram: { type: Number, required: true }, // RAM size in GB
    storage: { type: Number, required: true }, // Storage size in GB
    processor: { type: String, required: true }, // Processor type
    screenSize: { type: String }, // Screen size in inches
    batteryLife: {
      min: { type: Number }, // Minimum battery life in hours
      max: { type: Number }, // Maximum battery life in hours
    }, // For earbuds, headphones
    bluetoothVersion: { type: String }, // For wireless devices
    waterResistance: { type: String }, // IP ratings
    screenType: { type: String }, // For TVs (e.g., OLED, QLED)
    resolution: { type: String }, // For TVs (e.g., 4K, 1080p)
    refreshRate: { type: String }, // For TVs (e.g., 60Hz, 120Hz)
    HDR: { type: String }, // For TVs (e.g., HDR10, Dolby Vision)
    sensorType: { type: String }, // Type of camera sensor (e.g., CMOS, CCD)
    megapixels: { type: Number }, // Camera megapixels (e.g., 12 MP, 48 MP)
    videoResolution: { type: String }, // Video resolution (e.g., 4K, 1080p)
  },
  features: { type: [String] }, // Array of features
  ratings: {
    average: { type: Number, min: 0, max: 5 }, // Average rating out of 5
    count: { type: Number, min: 0 }, // Count of ratings
  },
  availability: { type: Boolean, default: true }, // Availability status
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
