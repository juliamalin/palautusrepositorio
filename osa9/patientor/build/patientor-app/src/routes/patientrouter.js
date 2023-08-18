"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataservice_1 = __importDefault(require("../services/dataservice"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(dataservice_1.default.getPatients());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = dataservice_1.default.findById(id);
    if (patient) {
        res.json(patient);
    }
    else {
        res.status(404).json({ error: 'Patient not found' });
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedPatient = dataservice_1.default.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
