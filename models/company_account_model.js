import mongoose from 'mongoose';

const deliveryAddressesSchema = new mongoose.Schema(
  {
    warehouseName: String,
    street: String,
    number: Number,
    postalCode: Number,
    city: String,
    country: String,
    contactPersonName: String,
    contactPhone: String,
    contactEmail: String 
  },
  {
    timestamps: true
  }
)

const companyAccountSchema = new mongoose.Schema(
{
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {type: String, required: true},
  vat: {
    type: String,
    unique: true
  },
  companyName: String,
  name: String,
  lastName: String,
  gender: String,
  billingAddress: {
    street: String,
    number: String,
    postalCode: String,
    city: String,
    country: String
  },
  deliveryAddresses: [deliveryAddressesSchema],
  phoneNr: String,
  details: {
    typeOfCompany: String,
    companySize:{
      officeStaff: Number,
      externalSales: Number,
      warehouse: Number,
      installationForecast: Number
    },
    newsletter: Boolean,
    darwinPartner: Boolean
  }
},
{
  timestamps: true
}
);

const Company_account = mongoose.model("Company_account", companyAccountSchema);

export default Company_account;