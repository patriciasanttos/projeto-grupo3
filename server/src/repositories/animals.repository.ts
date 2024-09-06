import Animal from "../database/models/Animal";
import { AnimalType } from "../utils/types";
import serverErrorHandler from "../utils/serverErrorHandler";

export default {
    async getAnimalById (id: number) {
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
                data: animal
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllAnimal () {
        try {
            //-----Buscar animais na tabela
            const animals = await Animal.findAll();

            if (animals === null)
                return {
                    code: 404,
                    data: {
                        error: 'No animals found'
                    }
                };

            return {
                code: 200,
                data: animals
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createAnimal (data: AnimalType) {
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

    async updateAnimal ({ id, data }: { id: number, data: AnimalType }) {
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
            serverErrorHandler(error);
        }
    },
    
    async deleteAnimal (id: number) {
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
            serverErrorHandler(error);
        }
    }
};