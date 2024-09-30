export default function serverErrorHandler(error: Error): { code: number, data: {} } {
    if (error.name.includes('Sequelize')){
        return {
            code: 500, 
            data: {
                message: 'Database connection error'
            },
        }
    }
    
    return {
        code: 500, 
        data: {
            message: error.message
        }
    }
}