import { Request, Response } from "express";
import Product from "../models/Product.model";

//CREAR PRODUCTO
export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
};

//OBTENER TODOS
export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [["id", "DESC"]],
  });
  res.json({ data: products });
};

//OBTENER POR ID
export const getProductsById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  res.json({ data: product });
};

//ACTUALIZAR
export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  await product.update(req.body);
  await product.save();

  res.json({ data: product });
};

//CAMBIAR DISPONIBILIDAD
export const updateAvailability = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  product.availability = !product.dataValues.availability;
  await product.save();

  res.json({ data: product });
};

//ELIMINAR
export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: "Producto No Encontrado",
    });
    return;
  }

  await product.destroy();
  res.json({ data: "Producto Eliminado" });
};
