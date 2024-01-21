import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './routes/product_routes.js';
import accountRoutes from './routes/account_routes.js';
import seedRoutes from './routes/seed_routes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello API My Friend');
});

const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const connectDB = () => {
  try {
    mongoose.connect(CONNECTION_URL);
      console.log(`on Port ${PORT} it seems to be everything ok.`);
  } catch (error) {
    return console.log(error.message);
  }
};

app.use("/", productRoutes);
app.use("/create_account", accountRoutes);
app.use("/accounts", accountRoutes);
app.use("/seed", seedRoutes);

app.listen(PORT,connectDB);
