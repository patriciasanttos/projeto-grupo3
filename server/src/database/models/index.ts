import Animal from "./Animal";
import Sponsorship from "./Sponsorship";

Animal.belongsToMany(Sponsorship, { through: 'animal_sponsors', foreignKey: 'animal_id' });
Sponsorship.belongsToMany(Animal, { through: 'animal_sponsors', foreignKey: 'sponsor_id' });

export { Animal, Sponsorship };