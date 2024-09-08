import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface AdminInfo {
    id: number,
    user: string,
    email: string,
    phone: string
    password: string,
    role: string,
    created_at?: string,
    updated_at?: string,
}

type AdminInfoCreation = Optional<AdminInfo, 'id'>;

class Admin extends Model<AdminInfo, AdminInfoCreation> {}

Admin.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  }, {
    tableName: "admins",
    sequelize,
  }
);

export default Admin;