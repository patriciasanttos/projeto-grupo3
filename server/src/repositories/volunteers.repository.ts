import { Op } from "sequelize";
import Volunteer from "../database/models/Volunteer";
import { VolunteerType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";
import VolunteerForm from "../database/models/VolunteerForm";

export default {
    async getVolunteerById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar voluntário na tabela
            const volunteer = await Volunteer.findOne({ where: { id } });

            if (volunteer === null)
                return {
                    code: 404,
                    data: {
                        error: 'Volunteer not found'
                    }
                };

            return {
                code: 200,
                data: volunteer.dataValues
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllVolunteers(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar voluntários na tabela
            const volunteers = await Volunteer.findAll();

            if (volunteers === null)
                return {
                    code: 404,
                    data: {
                        error: 'No volunteers found'
                    }
                };

            return {
                code: 200,
                data: volunteers
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllVolunteersForms(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar formulários na tabela
            const volunteers = await VolunteerForm.findAll();

            if (volunteers === null)
                return {
                    code: 404,
                    data: {
                        error: 'No volunteers forms found'
                    }
                };

            return {
                code: 200,
                data: volunteers
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createVolunteer(data: VolunteerType): Promise<{ code: number, data?: {} }> {
        try {
            // -----Salvar voluntário na tabela
            await Volunteer.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createVolunteerForm(data: VolunteerType): Promise<{ code: number, data?: {} }> {
        try {
            // -----Salvar formulário na tabela
            await VolunteerForm.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async acceptVolunteerForm(id: number): Promise<{ code: number, data?: {} }> {
        try {
            // -----Buscar formulário na tabela
            const form = await VolunteerForm.findByPk(id);
            
            if (!form)
                return {
                    code: 404,
                    data: {
                        error: 'Volunteer form not found'
                    }
                }

            await Volunteer.create(form.dataValues);
            await form.destroy();

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async denyVolunteerForm(id: number): Promise<{ code: number, data?: {} }> {
        try {
            // -----Buscar formulário na tabela
            const form = await VolunteerForm.findByPk(id);
            
            if (!form)
                return {
                    code: 404,
                    data: {
                        error: 'Volunteer form not found'
                    }
                }   

            await form.destroy();

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateVolunteer(data: VolunteerType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar voluntário na tabela
            const volunteer = await Volunteer.findByPk(data.id)
            
            if (volunteer === null)
                return {
                    code: 404,
                    data: {
                        error: 'Volunteer not found'
                    }
                };

            await volunteer.update({ ...data });

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
    
    async deleteVolunteer(id: number): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar voluntário na tabela
            const volunteer = await Volunteer.findOne({ where: { id } });
            
            if (volunteer === null)
                return {
                    code: 404,
                    data: {
                        error: 'Volunteer not found'
                    }
                };
                
            await volunteer.destroy();
            
            return {
                code: 200
            };
            
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    }
};