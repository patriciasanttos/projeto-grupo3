import Animal from "../database/models/Animal";
import { AnimalType } from "../utils/types";
import serverErrorHandler from "../utils/serverErrorHandler";

export default {
    async getAnimal (id: number) {
        try {
            //-----Buscar CNPJ da animal na tabela
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

    async createAnimal (data: AnimalType) {
        try {
            // -----Salvar os dados da empresa na tabela
            const animal = await Animal.create({ ...data });

            console.log(animal);

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