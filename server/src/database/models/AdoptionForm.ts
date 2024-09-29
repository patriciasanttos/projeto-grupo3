import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface AdoptionsFormInfo {
    id: number,
    name: string,
    email: string,
    phone: number,
    address: string,
    cpf: string,
    animal_id: string,
    observation?: string,
    created_at?: string,
    updated_at?: string,
}

type AdoptionsFormInfoCreation = Optional<AdoptionsFormInfo, 'id'>;

class AdoptionsForm extends Model<AdoptionsFormInfo, AdoptionsFormInfoCreation> {}

AdoptionsForm.init({
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
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cpf: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  animal_id: {
    type: DataTypes.STRING,
    allowNull: true,
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
    tableName: "adoptions-forms",
    sequelize,
  }
);

export default AdoptionsForm;