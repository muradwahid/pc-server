const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

function run() {
  try {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri =
      'mongodb+srv://pc-builder:pc-builder@cluster0.xgycl9p.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    const data = client.db('pc-builder');
    const products = data.collection('products');
    const categories = data.collection('categories');

    app.get('/products', async (req, res) => {
      const allProducts = await products.find({}).toArray();
      res.status(200).json({
        data: allProducts,
      });
    });
    app.get('/categories', async (req, res) => {
      const allCategories = await categories.find({}).toArray();
      res.status(200).json({
        data: allCategories,
      });
    });

    app.listen(port, () => {
      console.log(`server is listening on ${port}`);
    });
  } finally {
  }
}
run();
