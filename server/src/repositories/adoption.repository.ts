import Adoption from "../database/models/Adoption";
import { AdoptionType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";
import animalsRepository from "./animals.repository";

export default {
    async getAdoptionById(id: number): Promise<{ code: number, data: {} }> {
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

            //-----Buscar animal na tabela
            const gettedAnimal = await animalsRepository.getAnimalById(adoption.dataValues.animal_id);

            if (gettedAnimal.code === 404)
                return gettedAnimal;

            
            return {
                code: 200,
                data: {
                    ...adoption.dataValues,
                    animal: gettedAnimal.data
                }
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
            const gettedAnimal = await animalsRepository.getAnimalById(data.animal_id);

            if (gettedAnimal.code === 404)
                return gettedAnimal;

            // -----Salvar adoção na tabela
            await Adoption.create({ ...data });

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