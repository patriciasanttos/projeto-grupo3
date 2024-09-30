export default function serverErrorHandler(error: Error): { code: number, data: {} } {
    console.log(error)
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