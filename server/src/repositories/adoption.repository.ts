import { Animal } from "../database/models";
import Adoption from "../database/models/Adoption";
import { AdoptionType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";

export default {
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

            // -----Salvar adoção na tabela
            await Adoption.create({
                ...data,
                id: animal.id,
                name: animal.name,
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
                observation: animal.observation,
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

    async updateAdoption({ id, data }: { id: number, data: AdoptionType }): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar adoção na tabela
            const adoption = await Adoption.findOne({ where: { id } })
            
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
    }
};