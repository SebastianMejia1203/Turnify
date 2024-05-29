import mongoose from '../../db/mongo';

const auditoriaBaneoSchema = new mongoose.Schema({
    idSuperUsuario: { type: Number, required: true },
    idUsuarioBaneado: { type: Number, required: true },
    razonBaneo: { type: String, required: true },
    fechaHoraBaneo: { type: Date, required: true }
});

const AuditoriaBaneo = mongoose.model('AuditoriaBaneo', auditoriaBaneoSchema);

export default AuditoriaBaneo;