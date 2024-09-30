import { Op } from "sequelize";
import Volunteer from "../database/models/Volunteer";
import { VolunteerType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";
import VolunteerForm from "../database/models/VolunteerForm";

export default {
    //-----Volunteers
    async getVolunteerById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Search volunteer in the table
            const volunteer = await Volunteer.findOne({ where: { id } });

            if (volunteer === null)
                return {
                    code: 404,
                    data: {
                        message: 'Volunteer not found'
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
            //-----Search volunteers in the table
            const volunteers = await Volunteer.findAll();

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
            // -----Save volunteer in the table
            await Volunteer.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateVolunteer(data: VolunteerType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Search volunteer in the table
            const volunteer = await Volunteer.findByPk(data.id)
            
            if (volunteer === null)
                return {
                    code: 404,
                    data: {
                        message: 'Volunteer not found'
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
            //-----Search volunteer in the table
            const volunteer = await Volunteer.findOne({ where: { id } });
            
            if (volunteer === null)
                return {
                    code: 404,
                    data: {
                        message: 'Volunteer not found'
                    }
                };
                
            await volunteer.destroy();
            
            return {
                code: 200
            };
            
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    //-----Volunteers forms
    async getAllVolunteersForms(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar formulários na tabela
            const volunteers = await VolunteerForm.findAll();

            if (volunteers === null)
                return {
                    code: 404,
                    data: {
                        message: 'No volunteers forms found'
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

    async createVolunteerForm(data: VolunteerType): Promise<{ code: number, data?: {} }> {
        try {
            // -----Save volunteer in the table
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
            // -----Search form in the table
            const form = await VolunteerForm.findByPk(id);
            
            if (!form)
                return {
                    code: 404,
                    data: {
                        message: 'Volunteer form not found'
                    }
                }

            const data = { ...form.dataValues };
            delete data.id;
            
            await Volunteer.create(data);
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
            // -----Search form in the table
            const form = await VolunteerForm.findByPk(id);

            await form?.destroy();

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
};