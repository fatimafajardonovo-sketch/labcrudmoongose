import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema (
    {
        codigo : {
            type: String,
            required: [true, "El código del ticket es obligatorio"],
            unique: true,
            uppercase: true,
            trim: true
        },
        titulo: {
            type: String,
            required: [true, "El título es obligatorio"],
            trim: true,
            minlength: [5, "El título debe tener al menos 5 caracteres"],
        },
        prioridad: {
            type: String,
            required: true,
            trim: true,
            enum: {
                values: ["Baja", "Media", "Alta", "Critica"]
            },
            default: "Media",

        },
        estado: {
            type: String,
            required: true,
            enum: ["Abierto", "En progreso", "Resuelto", "Cerrado"],
            default: "Abierto",
        },
        agenteAsignado : { 
            type: String,
            trim: true,
        },
        horasInvertidas: {
            type: Number,
            default: 0,
            min: [0, "Las horas no pueden ser negativas"]
        },
        etiquetas: {
            type: [String],
            default: []

        }
    },
    {
    timestamps: true
    }
);

// En servidores que recargan modulos, reutiliza el modelo ya regustrado para evitar el error de 
const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
