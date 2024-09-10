import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../database/models/Admin";
import { AdminType } from "../utils/types";
import serverErrorHandler from "../utils/serverErrorHandler";
require('dotenv').config();

type UpdateDataType = {
    id: number,
    name?: string,
    email?: string,
    phone?: number,
    password?: string,
    permissions?: string,
}

export default {
    async getAdminById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar administrador na tabela
            const gettedAdmin = await Admin.findOne({ where: { id } });

            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };

            return {
                code: 200,
                data: {
                    user: {
                        name: gettedAdmin.dataValues.name,
                        email: gettedAdmin.dataValues.email,
                        phone: gettedAdmin.dataValues.phone,
                        permissions: gettedAdmin.dataValues.permissions,
                        image: gettedAdmin.dataValues.image
                    }
                }
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllAdmins(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar administradores na tabela
            const admins = await Admin.findAll();

            if (admins === null)
                return {
                    code: 404,
                    data: {
                        error: 'No administrator found'
                    }
                };

            return {
                code: 200,
                data: admins.map(user => {
                    return {
                        id: user.dataValues.id,
                        user: user.dataValues.name,
                        email: user.dataValues.email,
                        phone: user.dataValues.phone,
                        permissions: user.dataValues.permissions,
                        image: user.dataValues.image
                    };
                })
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async login({ user, password }: { user: string, password: string }): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar administrador na tabela
            const gettedAdmin = await Admin.findOne({
                where: {
                  [Op.or]: [
                    { name: user },
                    { email: user }
                  ]
                }
            });

            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };
            
            // -----Comparar senha
            const comparePassword = await bcrypt.compare(password, gettedAdmin.dataValues.password);

            if (!comparePassword)
                return {
                    code: 401,
                    data: {
                        error: 'Invalid password'
                    }
                };

            const secret: string = process.env.JWT_SECRET || '';
            const token = jwt.sign(
                { 
                    userId: gettedAdmin.dataValues.id
                },
                secret,
                { 
                    expiresIn: "1d"
                }
            );

            return {
                code: 200,
                data: token
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createAdmin(data: AdminType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar administrador na tabela
            const adminExistis = await Admin.findOne({
                where: {
                  [Op.or]: [
                    { email: data.email },
                    { phone: data.phone }
                  ]
                }
            });

            if (adminExistis !== null)
                return {
                    code: 409,
                    data: {
                        error: 'Email or phone already registered'
                    }
                };

            const userData = data;
            const salt = await bcrypt.genSalt(12);
            userData.password = await bcrypt.hash(userData.password, salt);

            // -----Salvar administrador na tabela
            await Admin.create({ ...data });

            return {
                code: 201
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async updateAdmin(data: UpdateDataType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar administrador na tabela
            const gettedAdmin = await Admin.findOne({ where: { id: data.id } })
            
            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };

            if (data.email || data.phone) {
                if (data.email === gettedAdmin.dataValues.email)
                    return {
                        code: 409,
                        data: {
                            error: 'Email already registered'
                        }
                    };

                if (data.phone === gettedAdmin.dataValues.phone)
                    return {
                        code: 409,
                        data: {
                            error: 'Phone already registered'
                        }
                    };
            }
            
            if (data.password) {
                const userData = { ...data };
                const salt = await bcrypt.genSalt(12);
                userData.password = await bcrypt.hash(data.password, salt);

                const comparePassword = await bcrypt.compare(data.password, gettedAdmin.dataValues.password);

                if (comparePassword)
                    return {
                        code: 400,
                        data: {
                            error: 'Use a different password'
                        }
                    };
    
                await gettedAdmin.update({ ...userData });

                return {
                    code: 200
                };
            };
            
            await gettedAdmin.update({ ...data });

            return {
                code: 200
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },
    
    async deleteAdmin(id: number): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar administrador na tabela
            const gettedAdmin = await Admin.findOne({ where: { id } });
            
            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };
                
            await gettedAdmin.destroy();
            
            return {
                code: 200
            };
            
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    }
};