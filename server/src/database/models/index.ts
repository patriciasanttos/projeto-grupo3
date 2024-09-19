import Animal from "./Animal";
import Sponsorship from "./Sponsorship";
import Admin from "./Admin";
import Permission from "./Permissions";

Animal.belongsToMany(Sponsorship, { through: 'animal_sponsors', foreignKey: 'animal_id' });
Sponsorship.belongsToMany(Animal, { through: 'animal_sponsors', foreignKey: 'sponsor_id' });

Admin.belongsToMany(Permission, { through: 'admin_permissions', as: 'admin', foreignKey: 'admin_id' });
Permission.belongsToMany(Admin, { through: 'admin_permissions', as: 'permissions', foreignKey: 'permission_id' });

export { Animal, Sponsorship, Admin, Permission };