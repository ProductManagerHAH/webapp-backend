import mongoose from 'mongoose';



export default function initDBConnection(callback: () => void) {
    // Set up mongoose connection


    const mongoDB = process.env.MONGODB_URI ; 
    mongoose.connect(mongoDB);
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.on('error', () => {
        console.log('Failed to connect to database');
        process.exit(1);
    });

    db.once('open', () => {
        console.log('Connected to database');
        callback();
    });
};