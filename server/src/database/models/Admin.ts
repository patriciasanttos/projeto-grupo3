import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface AdminInfo {
    id: number,
    image?: string,
    name: string,
    email: string,
    phone: number
    password: string,
    permissions: string,
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
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permissions: {
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
    tableName: "admins",
    timestamps: false,
    sequelize,
  }
);

export default Admin;