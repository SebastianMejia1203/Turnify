"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("../../db/mongo"));
const auditoriaBaneoSchema = new mongo_1.default.Schema({
    idSuperUsuario: { type: Number, required: true },
    idUsuarioBaneado: { type: Number, required: true },
    razonBaneo: { type: String, required: true },
    fechaHoraBaneo: { type: Date, required: true }
});
const AuditoriaBaneo = mongo_1.default.model('AuditoriaBaneo', auditoriaBaneoSchema);
exports.default = AuditoriaBaneo;
