import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface VolunteerInfo {
    id: number,
    name: string,
    email: string,
    phone: number,
    address: string,
    availability: string,
    created_at?: string,
    updated_at?: string,
}

type VolunteerInfoCreation = Optional<VolunteerInfo, 'id'>;

class Volunteer extends Model<VolunteerInfo, VolunteerInfoCreation> {}

Volunteer.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    availability: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: "volunteers",
    sequelize,
  }
);

export default Volunteer;