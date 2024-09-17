import { Animal, Sponsor } from '../database/models/index';

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
}