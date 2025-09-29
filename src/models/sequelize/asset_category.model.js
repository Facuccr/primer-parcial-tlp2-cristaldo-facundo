import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model.js";
import { CategoryModel } from "./category.model.js";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA
AssetModel.belongsToMany(CategoryModel, {
  through: AssetCategory,
  foreignKey: "asset_id",
  as: "category",
  onDelete: "CASCADE",
});

CategoryModel.belongsToMany(AssetModel, {
  through: AssetCategory,
  foreignKey: "category_id",
  as: "asset",
  onDelete: "CASCADE",
});
