import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "..";

interface SponsorshipsInfo {
    id: number,
    name: string,
    email: string,
    phone: number,
    animal_id: number,
    created_at?: string,
    updated_at?: string,
}

type SponsorshipsInfoCreation = Optional<SponsorshipsInfo, 'id'>;

class Sponsorships extends Model<SponsorshipsInfo, SponsorshipsInfoCreation> {}

Sponsorships.init({
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
      type: DataTypes.INTEGER,
      allowNull: true,
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
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  }, {
    tableName: "sponsorships",
    sequelize,
  }
);

export default Sponsorships;