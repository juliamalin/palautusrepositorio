import clientData from '../data/clients'
import { Client } from '../types'

//const clients: AssessmentClient[] | TherapyClient[] = clientData

const clients: Client[]= clientData

const getClients = (): Client[] => {
    return clients
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getClients
}

