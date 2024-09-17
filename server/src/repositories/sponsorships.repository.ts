import Sponsorship from "../database/models/Sponsorship";
import { SponsorshipType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";
import { Animal } from "../database/models/index";

export default {
    async getSponsorshipById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar apadrinhamento na tabela
            const sponsorship = await Sponsorship.findByPk(id, {
                include: Animal
            });

            if (sponsorship === null)
                return {
                    code: 404,
                    data: {
                        error: 'Sponsorship not found'
                    }
                };
            
            return {
                code: 200,
                data: sponsorship.dataValues
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllSponsorships(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar apadrinhamentos na tabela
            const sponsorship = await Sponsorship.findAll();

            if (sponsorship === null)
                return {
                    code: 404,
                    data: {
                        error: 'No sponsorships found'
                    }
                };

            return {
                code: 200,
                data: sponsorship
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createSponsorship(data: SponsorshipType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar animal na tabela
            const gettedAnimal = await Animal.findByPk(data.animal_id);

            if (!gettedAnimal)
                return {
                    code: 404,
                    data: {
                        error: 'Animal not found'
                    }
                };

            // -----Salvar apadrinhamento na tabela
            const sponsorship = await Sponsorship.create({ ...data });
            await gettedAnimal.addSponsorship(sponsorship);

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateSponsorship({ id, data }: { id: number, data: SponsorshipType }): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar apadrinhamento na tabela
            const sponsorship = await Sponsorship.findByPk(id)
            
            if (sponsorship === null)
                return {
                    code: 404,
                    data: {
                        error: 'Sponsorship not found'
                    }
                };

            await sponsorship.update({ ...data });

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
    
    async deleteSponsorship(id: number): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar apadrinhamento na tabela
            const sponsorship = await Sponsorship.findByPk(id);
            
            if (sponsorship === null)
                return {
                    code: 404,
                    data: {
                        error: 'Sponsorship not found'
                    }
                };
                
            await sponsorship.destroy();
            
            return {
                code: 200
            };
            
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    }
};