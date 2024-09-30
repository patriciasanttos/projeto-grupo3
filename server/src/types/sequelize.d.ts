import { Animal, Permission, Sponsor } from '../database/models/index';

declare module '../database/models' {
  interface Animal {
    addSponsorship: (sponsor: Sponsor | Sponsor[]) => Promise<void>;
  }

  interface Sponsorship {
    addAnimal: (animal: Animal | Animal[]) => Promise<void>;
  }

  interface Adoption {
    addAdoption: (animal: Animal | Animal[]) => Promise<void>;
  }

  interface Admin {
    addPermission: (permission: Permission | Permission[]) => Promise<void>;
    setPermissions: (permission: Permission | Permission[]) => Promise<void>;
    permissions: Permission[];
  }
}