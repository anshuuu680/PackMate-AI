import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

class Wardrobe extends Model {}

Wardrobe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        "T-Shirt",
        "Shirt",
        "Pants",
        "Shoes",
        "Jacket",
        "Accessories"
      ),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Wardrobe",
    tableName: "wardrobes",
    timestamps: true,
  }
);

Wardrobe.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Wardrobe, { foreignKey: "userId" });

export default Wardrobe;
