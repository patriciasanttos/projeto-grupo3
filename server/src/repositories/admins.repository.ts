import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin, Permission } from "../database/models";
import { AdminType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";
require('dotenv').config();

type UpdateDataType = {
    id: number,
    name?: string,
    email?: string,
    phone?: number,
    password?: string,
    permissions?: Permission[],
}

export default {
    async getAdminById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar administrador na tabela
            const gettedAdmin = await Admin.findByPk(id, {
                attributes: [ 'id', 'name', 'email', 'phone', 'image', "observation" ],
                include: {
                    model: Permission,
                    as: 'permissions',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            });

            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };

            return {
                code: 200,
                data: gettedAdmin.toJSON()
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async getAllAdmins(): Promise<{ code: number, data: {} }> {
        try {
            //-----Buscar administradores na tabela
            const admins = await Admin.findAll({
                attributes: [ 'id', 'name', 'email', 'phone', 'image', "observation" ],
                include: {
                    model: Permission,
                    as: 'permissions',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            });

            if (admins === null)
                return {
                    code: 404,
                    data: {
                        error: 'No administrator found'
                    }
                };

            return {
                code: 200,
                data: admins.map(admin => admin.toJSON())
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async verifyUser(id: number): Promise<{ code: number, data?: {} }> {
        try {
            //-----Buscar administrador na tabela
            const gettedAdmin = await Admin.findByPk(id);

            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };

            return {
                code: 200
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
                },
                include: {
                    model: Permission,
                    as: 'permissions',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
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
                    userId: gettedAdmin.dataValues.id,
                    permissions: gettedAdmin.permissions
                },
                secret
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

            const adminProps = { ...data };
            delete adminProps.permissions;
            //-----Salvar administrador na tabela
            const admin = await Admin.create({ ...adminProps });
            if (data.permissions)
                data.permissions.forEach(async perm => await admin.addPermission(perm));

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
            const gettedAdmin = await Admin.findByPk(data.id, {
                include: {
                    model: Permission,
                    as: 'permissions',
                    attributes: ['id'],
                }
            })
            
            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        error: 'Administrator not found'
                    }
                };
            
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

            const adminUpdated = { ...data };
            delete adminUpdated.permissions;

            const admin = await gettedAdmin.update({ ...adminUpdated });
            if (data.permissions && data.permissions.length > 0)
                await admin.setPermissions([ ...data.permissions ]);

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