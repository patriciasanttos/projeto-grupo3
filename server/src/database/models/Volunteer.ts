import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface VolunteerInfo {
    id: number,
    name: string,
    responsible_name?: string,
    email: string,
    phone: number,
    address: string,
    availability: string,
    study_schedule?: string,
    profession?: string,
    sector: string,
    state: string,
    observation?: string,
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
    responsible_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    study_schedule: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observation: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    sequelize,
  }
);

export default Volunteer;