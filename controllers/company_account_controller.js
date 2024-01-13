
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/generate_token.js";
import Company_account from "../models/company_account_model.js";
import bcrypt from 'bcryptjs';

export const createUser = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password, companyName, vat, name, lastName, gender, billingAddress, deliveryAddresses, phoneNr, details, newsletter,    darwinPartner } = req.body;
  
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
  
    const newUser = await Company_account.create({
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
  
    if(newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        token: generateToken(newUser._id)
      });

    }else {
      res.status(400);
      throw new Error("The user does not exist");
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating a new user" });
  }
});

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

    const { addressId, userId, newAddress } = req.body;
    const user = await Company_account.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = user.deliveryAddresses.id(addressId);  
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    address.set(newAddress);
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

export const getUser = async (req, res) => {
  try {
    const allSigninUsers = await Company_account.find();
    res.status(200).json(allSigninUsers);
  }catch(error) {
    res.status(404).json({
      message: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await Company_account.findByIdAndRemove(id).exec();
    res.send("Успешно Избрисан Корисник");
  } catch (error) {
    res.status(409).json({
      message: error.message
    });
  }  
};

export const authUser = expressAsyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Company_account.findOne({ email });

    if(user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: generateToken(user._id)
      });
  }else {
    res.status(401);
    throw new Error("Нетачан имејл или шифра");
  }
});