import app from './app';
import dbConnection from './database/dbConnection';

dbConnection()
    .then(() => {
        app.listen(4444, () => console.log('Server started.'));
    })