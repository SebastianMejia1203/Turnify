"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURI = 'mongodb://localhost:27017/Turnify'; // Make sure to change the name of the database.
mongoose_1.default.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB successfully.'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
exports.default = mongoose_1.default;
