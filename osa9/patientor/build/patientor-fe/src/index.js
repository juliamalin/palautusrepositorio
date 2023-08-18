"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dgrouter_1 = __importDefault(require("./routes/dgrouter"));
const patientrouter_1 = __importDefault(require("./routes/patientrouter"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
const PORT = 3000;
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/diagnoses', dgrouter_1.default);
app.use('/api/patients', patientrouter_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
