import connection from "."

export default async function dbConnection() {
    try {
        await connection.authenticate()
            .then(() => console.log('Database connected.'));
    } catch (error) {
        console.log(error)
    }
}