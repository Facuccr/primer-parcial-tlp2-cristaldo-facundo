import { UserModel } from "../models/mongoose/user.model.js";
import { AssetModel } from "../models/mongoose/asset.model.js";
import { CategoryModel } from "../models/mongoose/category.model.js";
export const createAsset = async (req, res) => {
  try {
    // TODO: crear asset (usuario autenticado)
    const {
      inventoryNumber,
      description,
      brand,
      model,
      status,
      acquisitionDate,
      acquisitionValue,
      responsible,
      categories,
    } = req.body;

    const user = await UserModel.findById(responsible);
    if (!user)
      return res.status(404).json({ msg: "Usuario responsable no encontrado" });

    const asset = await AssetModel.create({
      inventoryNumber,
      description,
      brand,
      model,
      status,
      acquisitionDate,
      acquisitionValue,
      responsible,
      categories,
    });

    res.status(201).json(asset);
    return res.status(201).json({ msg: "Asset creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const getAllAssets = async (req, res) => {
  try {
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)

    const assets = await AssetModel.find()
      .populate("responsible", "username email")
      .populate("categories", "name");

    return res.status(200).json({ data: assets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)
    const myAssets = await AssetModel.findById(req.params.id)
      .populate("responsible", "username email")
      .populate("categories", "name");
    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)
    const asset = await AssetModel.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ msg: "Asset no encontrado" });
    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
