import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface AdoptionInfo {
  id: number,
  animal_id: number,
  animal_name: string,
  image: string,
  species: string,
  race?: string,
  size: string,
  color?: string,
  vacine?: number,
  castrated?: boolean,
  age?: string,
  gender?: string,
  temperament?: string,
  status: string,
  observation?: string,
  animal_observation?: string,
  animal_created_at?: string,
  tutors_name: string,
  email: string,
  phone: number,
  address: string,
  cpf: number,
  created_at?: string,
  updated_at?: string,
}

type AdoptionInfoCreation = Optional<AdoptionInfo, 'id'>;

class Adoption extends Model<AdoptionInfo, AdoptionInfoCreation> {}

Adoption.init({
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
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    animal_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false
    },
    race: {
      type: DataTypes.STRING,
      allowNull: true
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vacine: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    castrated: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    temperament: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    animal_observation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    animal_created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tutors_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cpf: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "adoptions",
    sequelize,
  }
);

export default Adoption;