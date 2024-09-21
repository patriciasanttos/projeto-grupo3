import { DataTypes, Model } from "sequelize";
import sequelize from "..";

interface PermissionInfo {
    id: number,
    name: string,
    created_at?: string,
    updated_at?: string,
}

class Permission extends Model<PermissionInfo> {}

Permission.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    tableName: "permissions",
    sequelize,
  }
);

export default Permission;