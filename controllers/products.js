const Product = require('../models/product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (err) {
    return res.status(422).send({ message: 'error while getting products' });
  }
};

module.exports = { getProducts };