import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const data = {
  users: [
    {
      email: 'drazic.milan@gmail.com',
      password: bcrypt.hashSync('Kitic123'),
      vat: '123456789',
      companyName: "DMDevelo",
      name: 'Milan',
      lastName: 'Drazic',
      gender: 'Male',
      billingAddress: {
        street: 'Joanna Switcheka',
        number: '16',
        postalCode: '22000',
        city: 'Bajmok',
        country: 'Serbia'
      },
      deliveryAddresses: {
        warehouseName: 'Explode',
        street: 'Bele vode',
        number: 22,
        postalCode: 11080,
        city: 'Belgrade',
        country: 'Serbia',
        contactPersonName: 'Milan',
        contactPhone: '+38166555333',
        contactEmail: 'dmdevelo@explode.com' 
      },
      phoneNr: '+38166555333',
      details: {
        typeOfCompany: 'Mechanical workshop',
        companySize:{
          officeStaff: 150,
          externalSales: 5000000,
          warehouse: 5000,
          installationForecast: 10
        },
        newsletter: false,
        darwinPartner: false
      }
    },
  ],
  products: [
    {
      brand: 'Mox',
      title: 'Twist/SNAP end clamp',
      images: [{ image: '/images/10EndClamp.jpg'}, {image: '/images/10EndClampBlack.jpg'}, {image: '/images/10MidClamp.jpg'}],
      productInfo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      general: { country: 'Belgium', clearanceCode: '555333' },
      article: { code: 'Solar Panel', nr: 235, series: 2 },
      warranty: { factory: true, linearPowear: true },
      certifications: {
        IEC: true,
        TUV: true,
        MCS: true,
        windTunnel: false
      },
      packaging: {
        package_type: 'Factory',
        length: 10,
        width: 3000,
        height: 1500,
        stackable: true,
        cbm: mongoose.Types.Decimal128.fromString('25.55'),
        weight: mongoose.Types.Decimal128.fromString('38.44'),
        conditions: 'Good',
        units: 1,
        piecesPer20ft: 17,
        palletsPer20ft: 2
      },
      moq: { production: 2023, factory: 22, floating: 25, eu: 4 },
      price: { euro: 117, euro_per_wp: 25 },
      stocks: { factory: 26, floating: 26, eu: 13 },
      downloads: {
        datasheet: '',
        catalogue: '',
        warranty: '',
        manual: '',
        euDecla: '',
        certificate: '',
        reach: '',
        rohs: '',
        pfas: '',
        solarModule: '',
        brochure: '',
        solarProduction: ''
      }
    },
    {
      brand: 'Fluxx',
      title: 'Mubi',
      images: [{ image: '/images/image34.png'}, {image: '/images/Mubi.png'}, {image: '/images/Mubo1.png'}],
      productInfo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      general: { country: 'Belgium', clearanceCode: '555333' },
      article: { code: 'Solar Panel', nr: 235, series: 2 },
      warranty: { factory: true, linearPowear: true },
      certifications: {
        IEC: true,
        TUV: true,
        MCS: true,
        windTunnel: false
      },
      packaging: {
        package_type: 'Factory',
        length: 10,
        width: 3000,
        height: 1500,
        stackable: true,
        cbm: mongoose.Types.Decimal128.fromString('25.55'),
        weight: mongoose.Types.Decimal128.fromString('38.44'),
        conditions: 'Excelent',
        units: 1,
        piecesPer20ft: 17,
        palletsPer20ft: 2
      },
      moq: { production: 2023, factory: 22, floating: 25, eu: 4 },
      price: { euro: 224, euro_per_wp: 25 },
      stocks: { factory: 26, floating: 26, eu: 13 },
      downloads: {
        datasheet: '',
        catalogue: '',
        warranty: '',
        manual: '',
        euDecla: '',
        certificate: '',
        reach: '',
        rohs: '',
        pfas: '',
        solarModule: '',
        brochure: '',
        solarProduction: ''
      }
    },
    {
      brand: 'Ando',
      title: 'P-TYPE 410 Wp FULL BLACK DESIGN',
      images: [{ image: '/images/image1110.png'}, {image: '/images/image1120.png'}],
      productInfo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      general: { country: 'Belgium', clearanceCode: '555333' },
      article: { code: 'Solar Panel', nr: 235, series: 2 },
      warranty: { factory: true, linearPowear: true },
      certifications: {
        IEC: true,
        TUV: true,
        MCS: true,
        windTunnel: false
      },
      packaging: {
        package_type: 'Factory',
        length: 10,
        width: 3000,
        height: 1500,
        stackable: true,
        cbm: mongoose.Types.Decimal128.fromString('25.55'),
        weight: mongoose.Types.Decimal128.fromString('38.44'),
        conditions: 'Very good',
        units: 1,
        piecesPer20ft: 17,
        palletsPer20ft: 2
      },
      moq: { production: 2023, factory: 22, floating: 25, eu: 4 },
      price: { euro: 3000, euro_per_wp: 25 },
      stocks: { factory: 26, floating: 26, eu: 13 },
      downloads: {
        datasheet: '',
        catalogue: '',
        warranty: '',
        manual: '',
        euDecla: '',
        certificate: '',
        reach: '',
        rohs: '',
        pfas: '',
        solarModule: '',
        brochure: '',
        solarProduction: ''
      }
    },
    {
      brand: 'Nendo',
      title: 'Solar Panel Model Name 235',
      images: [{ image: '/images/image1110.png'}, {image: '/images/image1120.png'}],
      productInfo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      general: { country: 'Belgium', clearanceCode: '555333' },
      article: { code: 'Solar Panel', nr: 235, series: 2 },
      warranty: { factory: true, linearPowear: true },
      certifications: {
        IEC: true,
        TUV: true,
        MCS: true,
        windTunnel: false
      },
      packaging: {
        package_type: 'Factory',
        length: 10,
        width: 3000,
        height: 1500,
        stackable: true,
        cbm: mongoose.Types.Decimal128.fromString('25.55'),
        weight: mongoose.Types.Decimal128.fromString('38.44'),
        conditions: 'Very good',
        units: 1,
        piecesPer20ft: 17,
        palletsPer20ft: 2
      },
      moq: { production: 2023, factory: 22, floating: 25, eu: 4 },
      price: { euro: 3000, euro_per_wp: 25 },
      stocks: { factory: 26, floating: 26, eu: 13 },
      downloads: {
        datasheet: '',
        catalogue: '',
        warranty: '',
        manual: '',
        euDecla: '',
        certificate: '',
        reach: '',
        rohs: '',
        pfas: '',
        solarModule: '',
        brochure: '',
        solarProduction: ''
      }
    },
  ]
}

export default data;