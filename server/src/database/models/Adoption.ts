import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface AdoptionInfo {
    id: number,
    name: string,
    email: string,
    phone: number,
    address: string,
    animal_id: number,
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "animals",
        key: "id",
      },
      onDelete: "CASCADE",
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
    tableName: "adoptions",
    timestamps: false,
    sequelize,
  }
);

export default Adoption;