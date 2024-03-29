import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/generate_token.js";
import Company_account from "../models/company_account_model.js";
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

export const createUser = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password, companyName, vat, name, lastName, gender, billingAddress, deliveryAddresses, phoneNr, details, newsletter, darwinPartner } = req.body;
  
    if(!email || !password || !vat) {
      res.status(400);
      throw new Error("Enter all required information");
    }
  
    const userExist = await Company_account.findOne({ email });
  
    if(userExist) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new Company_account({
      email,
      password: hashedPassword,
      companyName,
      vat,
      name,
      lastName,
      gender,
      billingAddress,
      deliveryAddresses,
      phoneNr,
      details,
      newsletter,
      darwinPartner
    });

    const user = await newUser.save();
    const token = generateToken(newUser._id);

    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      vat: user.vat,
      companyName: user.companyName,
      gender: user.gender,
      address: user.address,
      phoneNr: user.phoneNr,
      country: user.country,
      city: user.city,
      postalcode: user.postalcode,
      billingAddress: user.billingAddress,
      deliveryAddresses: user.deliveryAddresses,
      details: user.details,
      darwinPartner: user.darwinPartner,
      newsletter: user.newsletter,
    });

  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating a new user" });
  }
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
  
    const user = await Company_account.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "The user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    
  } catch (error) {
    res.status(500).json({ message: "An error occurred while login a user" });
  }

}) 

export const createNewDeliveryAddress = async (req, res) => {
  try {

    const id = req.params.id;
    const { deliveryAddresses: 
      {
        warehouseName,
        street,
        number,
        postalCode,
        city,
        country,
        contactPersonName,
        contactPhone,
        contactEmail
      }
    } = req.body;

    const user = await Company_account.findById(id);
    if (!user) {
      return res.status(404).json({ message: "The user does not exist" });
    }

    const newDeliveryAddresses = user.deliveryAddresses;
    const newAddress = { 
      warehouseName,
      street,
      number,
      postalCode,
      city,
      country,
      contactPersonName,
      contactPhone,
      contactEmail
    };
    newDeliveryAddresses.push(newAddress);
    await user.save();

    res.status(201).json({ message: "New address added successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while adding a new address" });
  }
}

export const updateDeliveryAddress = async (req, res) => {
  try {

    const { deliveryAddress, userId, deliveryAddressId } = req.body;
console.log(deliveryAddress, userId, deliveryAddressId);
    const user = await Company_account.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressIndex = user.deliveryAddresses.findIndex(addr => addr._id.toString() === deliveryAddressId);
    
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Delivery address not found" });
    }

    user.deliveryAddresses[addressIndex] = { ...user.deliveryAddresses[addressIndex], ...deliveryAddress };

    await user.save();

    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating a address" });
  }
}

export const deleteDeliveryAddress = async (req, res) => {
  try {

    const { addressId, userId } = req.body;
    const user = await Company_account.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = user.deliveryAddresses.id(addressId);  
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    address.remove();
    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting a address" });
  }
}

export const getUsers = async (req, res) => {
  try {
    const allSigninUsers = await Company_account.find();
    res.status(200).json(allSigninUsers);
  }catch(error) {
    res.status(404).json({
      message: error.message
    });
  }
};

export const getUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Company_account.findById(userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  }catch(error) {
    res.status(404).json({
      message: error.message
    });
  }
});

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await Company_account.findByIdAndRemove(id).exec();
    res.send("Successfully Deleted User");
  } catch (error) {
    res.status(409).json({
      message: error.message
    });
  }  
};