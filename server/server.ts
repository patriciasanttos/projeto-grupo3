import app from './src/app';
import dbConnection from './src/database/dbConnection';

dbConnection()
    .then(() => {
        app.listen(4444, () => console.log('Server started.'));
    })