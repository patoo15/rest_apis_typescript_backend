import { Request, Response } from "express";
import Product from "../models/Product.model";

//USANDO new
// export const createProduct = async (req: Request, res: Response) => {
//   const product = new Product(req.body);
//   const savedProduct = await product.save();
//   res.json({ savedProduct });
// };

//USANDO CREATE
export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

//OBTENIENDO TODOS LOS PRODUCTOS
export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [["id", "DESC"]],
  });
  res.json({ data: products });
};

//OBTENIENDO SOLO UN PRODUCTO
export const getProductsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  res.json({ data: product });
};

//ACTUALIZACION DE PRODUCTO
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  //VERIFICO QUE EL PRODUCTO EXISTA
  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  //ACTUALIZAR
  await product.update(req.body);
  await product.save();

  res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  //VERIFICO QUE EL PRODUCTO EXISTA
  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  //ACTUALIZAR
  product.availability = !product.dataValues.availability;
  await product.save();

  res.json({ data: product });
};
//BORRAR PRODUCTO
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  //VERIFICO QUE EL PRODUCTO EXISTA
  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  await product.destroy();
  res.json({ data: "Producto Eliminado" });
};
