import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface AdminInfo {
  id: number,
  name: string,
  email: string,
  phone: number
  password: string,
  observation?: string,
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
  observation: {
    type: DataTypes.TEXT,
    allowNull: true
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
    sequelize,
  }
);

export default Admin;