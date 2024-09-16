import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface VolunteerInfo {
    id: number,
    image?: string,
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
    image: {
      type: DataTypes.STRING,
      allowNull: true
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
      type: DataTypes.BIGINT,
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
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    tableName: "volunteers",
    timestamps: false,
    sequelize,
  }
);

export default Volunteer;