import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './routes/product_routes.js';
import accountRoutes from './routes/account_routes.js';
import seedRoutes from './routes/seed_routes.js';

const app = express();

app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello API My Friend');
});

app.use("/", productRoutes);
app.use("/create_account", accountRoutes);
app.use("/seed", seedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
