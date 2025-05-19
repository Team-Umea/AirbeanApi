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
  //make sure req.body is validated
  const productData = { ...req.body, userId: 1 };

  try {
    const newProduct = await Product.create(productData);

    res.status(201).json({
      data: newProduct,
      message: `Product '${newProduct.product_name}' created succesfully`,
      success: true,
    });
  } catch (error) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  //make sure req.body is validated
  const productData = { ...req.body, userId: 1 };

  try {
    const updatedProduct = await Product.update(productData, productId);

    res.status(200).json({
      data: updatedProduct,
      message: `Product '${updateProduct.product_name}' updated succesfully`,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProductStockQuantity = async (req, res, next) => {
  const { productId } = req.params;
  //make sure req.body is validated
  const { stockQuantity } = req.body;

  try {
    const updatedProduct = await Product.updateStock(stockQuantity, productId);

    res.status(200).json({
      data: updatedProduct,
      message: `Stock quantity of '${updateProduct.product_name}' updated succesfully to ${updateProduct.stock_quantity}`,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.delete(productId);

    res.status(200).json({
      data: deletedProduct,
      message: `Product '${deletedProduct.product_name}' deleted succesfully`,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
