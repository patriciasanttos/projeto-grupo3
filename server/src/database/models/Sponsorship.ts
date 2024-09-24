import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";
import Animal from "./Animal";

interface SponsorshipInfo {
    id: number,
    name: string,
    email: string,
    phone: number,
    observation: string,
    created_at?: string,
    updated_at?: string,
}

type SponsorshipInfoCreation = Optional<SponsorshipInfo, 'id'>;

class Sponsorship extends Model<SponsorshipInfo, SponsorshipInfoCreation> {}

Sponsorship.init({
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
    tableName: "sponsorships",
    sequelize,
  }
);

export default Sponsorship;