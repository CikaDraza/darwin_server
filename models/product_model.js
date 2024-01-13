import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    image: {type: String, required: true}
  },
  {
    timestamps: true
  }
);

const productSchema = new mongoose.Schema({
  brand: String,
  title: String,
  images: [imageSchema],
  productInfo: String,
  general: { country: String, clearanceCode: String },
  article: { code: String, nr: Number, series: String },
  warranty: { factory: Boolean, linearPowear: Boolean },
  certifications: {
    IEC: Boolean,
    TUV: Boolean,
    MCS: Boolean,
    windTunnel: Boolean
  },
  packaging: {
    package_type: String,
    length: Number,
    width: Number,
    height: Number,
    stackable: Boolean,
    cbm: { type: mongoose.Schema.Types.Decimal128 },
    weight: { type: mongoose.Schema.Types.Decimal128 },
    conditions: String,
    units: Number,
    piecesPer20ft: Number,
    palletsPer20ft: Number
  },
  moq: { production: Number, factory: Number, floating: Number, eu: Number },
  price: { euro: Number, euro_per_wp: Number },
  stocks: { factory: Number, floating: Number, eu: Number },
  downloads: {
    datasheet: String,
    catalogue: String,
    warranty: String,
    manual: String,
    euDecla: String,
    certificate: String,
    reach: String,
    rohs: String,
    pfas: String,
    solarModule: String,
    brochure: String,
    solarProduction: String
  }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;
