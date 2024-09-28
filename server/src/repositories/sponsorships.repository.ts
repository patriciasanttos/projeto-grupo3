import Sponsorship from "../database/models/Sponsorship";
import { SponsorshipFormType, SponsorshipType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";
import { Animal } from "../database/models/index";
import SponsorshipForm from "../database/models/SponsorshipForm";

export default {
    //-----Sponsorships
    async getSponsorshipById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar apadrinhamento na tabela
            const sponsorship = await Sponsorship.findByPk(id, {
                include: [ Animal ]
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
            const sponsorship = await Sponsorship.findAll({
                include: [ Animal ]
            });

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

            delete data?.animal_id;
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

    async updateSponsorship(data: SponsorshipType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar apadrinhamento na tabela
            const sponsorship = await Sponsorship.findByPk(data.id)
            
            if (sponsorship === null)
                return {
                    code: 404,
                    data: {
                        error: 'Sponsorship not found'
                    }
                };

            delete data?.id;
            delete data?.animal_id

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
    },

    //-----Sponsorships forms
    async getAllSponsorshipsForms(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar formulários na tabela
            const sponsorships = await SponsorshipForm.findAll();

            if (sponsorships === null)
                return {
                    code: 404,
                    data: {
                        error: 'No sponsorship forms found'
                    }
                };

            return {
                code: 200,
                data: sponsorships
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createSponsorshipForm(data: SponsorshipFormType): Promise<{ code: number, data?: {} }> {
        try {
            // -----Salvar formulário na tabela
            await SponsorshipForm.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async acceptSponsorshipForm(id: number): Promise<{ code: number, data?: {} }> {
        try {
            // -----Buscar formulário na tabela
            const form = await SponsorshipForm.findByPk(id);
            
            if (!form)
                return {
                    code: 404,
                    data: {
                        error: 'Sponsorship form not found'
                    }
                }

            const sponsorship = { ...form.dataValues }
            delete sponsorship.id;

            await this.createSponsorship(sponsorship);
            await form.destroy();

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async denySponsorshipForm(id: number): Promise<{ code: number, data?: {} }> {
        try {
            // -----Buscar formulário na tabela
            const form = await SponsorshipForm.findByPk(id);

            await form?.destroy();

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
};