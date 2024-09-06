import Volunteer from "../database/models/Volunteers";
import { VolunteerType } from "../utils/types";
import serverErrorHandler from "../utils/serverErrorHandler";
import checkReplicatedData from "../utils/checkReplicatedData";

export default {
    async getVolunteerById (id: number): Promise<{ code: number, data: {} }> {
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
                data: volunteer
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllVolunteers (): Promise<{ code: number, data: {} }> {
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

    async createVolunteer (data: VolunteerType): Promise<{ code: number, data?: {} }> {
        try {
            if (await checkReplicatedData({ email: data.email, phone: data.phone }))
                return {
                    code: 401,
                    data: {
                        error: 'Volunteer already exists'
                    }
                };

            // -----Salvar voluntário na tabela
            await Volunteer.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateVolunteer ({ id, data }: { id: number, data: VolunteerType }): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar voluntário na tabela
            const volunteer = await Volunteer.findOne({ where: { id } })
            
            if (volunteer === null)
                return {
                    code: 404,
                    data: {
                        error: 'Volunteer not found'
                    }
                };

            if (await checkReplicatedData({ email: data.email, phone: data.phone }))
                return {
                    code: 401,
                    data: {
                        error: 'Email or phone already in use'
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
    
    async deleteVolunteer (id: number): Promise<{ code: number, data?: {} }> {
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