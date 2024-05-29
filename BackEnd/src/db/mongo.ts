import mongoose, { ConnectOptions } from 'mongoose';

const mongoURI: string = 'mongodb://localhost:27017/Turnify'; // Make sure to change the name of the database.

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions)
.then(() => console.log('Connected to MongoDB successfully.'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

export default mongoose;
