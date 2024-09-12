import Animal from "../database/models/Animal";
import { AnimalType } from "../utils/types";
import serverErrorHandler from "../utils/serverErrorHandler";

export default {
    async getAnimalById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar animal na tabela
            const animal = await Animal.findOne({ where: { id } });

            if (animal === null)
                return {
                    code: 404,
                    data: {
                        error: 'Animal not found'
                    }
                };

            return {
                code: 200,
                data: animal.dataValues
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllAnimals(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar animais na tabela
            const animals = await Animal.findAll();

            return {
                code: 200,
                data: animals
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createAnimal(data: AnimalType): Promise<{ code: number, data?: {} }> {
        try {
            // -----Salvar animal na tabela
            await Animal.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateAnimal({ id, data }: { id: number, data: AnimalType }): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar animal na tabela
            const animal = await Animal.findOne({ where: { id } })
            
            if (animal === null)
                return {
                    code: 404,
                    data: {
                        error: 'Animal not found'
                    }
                };

            await animal.update({ ...data });

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
    
    async deleteAnimal(id: number): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar animal na tabela
            const animal = await Animal.findOne({ where: { id } });
            
            if (animal === null)
                return {
                    code: 404,
                    data: {
                        error: 'Animal not found'
                    }
                };
                
            await animal.destroy();
            
            return {
                code: 200
            };
            
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    }
};