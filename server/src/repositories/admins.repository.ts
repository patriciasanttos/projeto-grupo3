import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin, Permission } from "../database/models";
import { AdminType } from "../types/types";
import serverErrorHandler from "../utils/serverErrorHandler";
require('dotenv').config();

type UpdateDataType = {
    id?: number,
    name?: string,
    email?: string,
    phone?: number,
    password?: string,
    permissions?: Permission[],
    observation?: string
}

export default {
    async getAdminById(id: number): Promise<{ code: number, data: {} }> {
        try {
            //-----Search admin in the table
            const gettedAdmin = await Admin.findByPk(id, {
                attributes: [ 'id', 'name', 'email', 'phone', "observation" ],
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
                        message: 'Administrator not found'
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
            //-----Search admins in the table
            const admins = await Admin.findAll({
                attributes: [ 'id', 'name', 'email', 'phone', "observation" ],
                include: {
                    model: Permission,
                    as: 'permissions',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            });

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
            //-----Search admin in the table
            const gettedAdmin = await Admin.findByPk(id);

            if (gettedAdmin === null)
                return {
                    code: 404,
                    data: {
                        message: 'Administrator not found'
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
            //-----Search admin in the table
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
                        message: 'Administrator not found'
                    }
                };
            
            // -----Compare password
            const comparePassword = await bcrypt.compare(password, gettedAdmin.dataValues.password);

            if (!comparePassword)
                return {
                    code: 401,
                    data: {
                        message: 'Invalid password'
                    }
                };

            const secret: string = process.env.JWT_SECRET || '';
            const token = jwt.sign(
                {
                    userId: gettedAdmin.dataValues.id,
                    name: gettedAdmin?.dataValues.name,
                    permissions: gettedAdmin.permissions
                },
                secret
            );

            return {
                code: 200,
                data: {
                    token: token
                }
            };
        } catch (error: any) {
            return serverErrorHandler(error);
        }
    },

    async createAdmin(data: AdminType): Promise<{ code: number, data?: {} }> {
        try {
            //-----Check duplicate email or phone
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
                        message: 'Email or phone already in use'
                    }
                };
            //-----


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
            //-----Search admin in the table
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
                        message: 'Administrator not found'
                    }
                };
                

            const genNewToken = (user: {
                id: number,
                name: string,
                permissions: Permission[]
            }) => {
                const secret: string = process.env.JWT_SECRET || '';
                const token = jwt.sign({
                    userId: user.id,
                    name: user.name,
                    permissions: user.permissions
                }, secret);

                return token;
            }
            
            const userData = { ...data };
            if (data.password) {
                const salt = await bcrypt.genSalt(12);
                userData.password = await bcrypt.hash(data.password, salt);

                const comparePassword = await bcrypt.compare(data.password, gettedAdmin.dataValues.password);

                if (comparePassword)
                    return {
                        code: 400,
                        data: {
                            message: 'Try a different password'
                        }
                    };
            };

            delete userData.permissions;
            delete userData.id;

            const admin = await gettedAdmin.update({ ...userData });
            if (data.permissions && data.permissions.length > 0)
                await admin.setPermissions([ ...data.permissions ]);

            const updatedAdmin = await Admin.findByPk(data.id, {
                include: {
                    model: Permission,
                    as: 'permissions',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            });

            const newToken = genNewToken({ 
                id: updatedAdmin!.dataValues.id,
                name: updatedAdmin!.dataValues.name,
                permissions: updatedAdmin!.permissions
            });

            return {
                code: 200,
                data: {
                    token: newToken
                }
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