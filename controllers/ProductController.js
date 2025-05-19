import Product from "../models/ProductModel.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.getAll();

    res.status(200).json({ data: products, success: true });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.getById(productId);

    res.status(200).json({ data: product, success: true });
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  //when auth-middleware is applied get userId from req.user
  // const {id:userId} = req.user
  try {
    //make sure req.body is validated
    const productData = { ...req.body, userId: 1 };

    const newProduct = await Product.create(productData);

    res
      .status(201)
      .json({ data: newProduct, message: "Product created succesfully", success: true });
  } catch (error) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    //make sure req.body is validated
    const productData = { ...req.body, userId: 1 };

    const updatedProduct = await Product.update(productData, productId);

    res
      .status(201)
      .json({ data: updatedProduct, message: "Product updated succesfully", success: true });
  } catch (err) {
    next(err);
  }
};
