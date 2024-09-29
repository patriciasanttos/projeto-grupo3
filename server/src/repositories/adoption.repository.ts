import { Animal } from "../database/models";
import Adoption from "../database/models/Adoption";
import AdoptionsForm from "../database/models/AdoptionForm";
import { AdoptionFormType, AdoptionType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";

export default {
    //-----Adoptions
    async getAdoptionById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar adoção na tabela
            const adoption = await Adoption.findByPk(id);

            if (adoption === null)
                return {
                    code: 404,
                    data: {
                        error: 'Adoption not found'
                    }
                };
            
            return {
                code: 200,
                data: adoption.dataValues
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllAdoptions(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar adoções na tabela
            const adoption = await Adoption.findAll();

            if (adoption === null)
                return {
                    code: 404,
                    data: {
                        error: 'No adoptions found'
                    }
                };

            return {
                code: 200,
                data: adoption
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createAdoption(data: AdoptionType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar animal na tabela
            const gettedAnimal = await Animal.findByPk(data.animal_id);

            if (gettedAnimal === null)
                return {
                    code: 404,
                    data: {
                        error: 'Animal not found'
                    }
                };

            const animal = gettedAnimal.dataValues;

            delete data?.animal_id;
            // -----Salvar adoção na tabela
            await Adoption.create({
                ...data,
                animal_id: animal.id,
                animal_name: animal.name,
                image: animal.image,
                species: animal.species,
                race: animal.race,
                size: animal.size,
                color: animal.color,
                vacine: animal.vacine,
                castrated: animal.castrated,
                age: animal.age,
                gender: animal.gender,
                temperament: animal.temperament,
                status: 'Adotado',
                animal_observation: animal.observation,
                animal_created_at: animal.created_at,
            });
            await gettedAnimal.destroy();

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateAdoption(data: AdoptionType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar adoção na tabela
            const adoption = await Adoption.findOne({ where: { animal_id: data.animal_id } })
            
            if (adoption === null)
                return {
                    code: 404,
                    data: {
                        error: 'Adoption not found'
                    }
                };

            await adoption.update({ ...data });

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
    
    async deleteAdoption(id: number): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar adoção na tabela
            const adoption = await Adoption.findOne({ where: { id } });
            
            if (adoption === null)
                return {
                    code: 404,
                    data: {
                        error: 'Adoption not found'
                    }
                };
                
            await adoption.destroy();
            
            return {
                code: 200
            };
            
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    //-----Adoptions forms
    async getAllAdoptionsForms(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar formulários na tabela
            const adoptions = await AdoptionsForm.findAll();

            if (adoptions === null)
                return {
                    code: 404,
                    data: {
                        error: 'No adoptions forms found'
                    }
                };

            return {
                code: 200,
                data: adoptions
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createAdoptionForm(data: AdoptionFormType): Promise<{ code: number, data?: {} }> {
        try {
            // -----Salvar formulário na tabela
            await AdoptionsForm.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async acceptAdoptionForm(id: number): Promise<{ code: number, data?: {} }> {
        try {
            // -----Buscar formulário na tabela
            const form = await AdoptionsForm.findByPk(id);
            
            if (!form)
                return {
                    code: 404,
                    data: {
                        error: 'Adoption form not found'
                    }
                }

            const adoption = { ...form.dataValues }
            delete adoption.id;

            await this.createAdoption(adoption);
            await form.destroy();

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async denyAdoptionForm(id: number): Promise<{ code: number, data?: {} }> {
        try {
            // -----Buscar formulário na tabela
            const form = await AdoptionsForm.findByPk(id);

            await form?.destroy();

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
};