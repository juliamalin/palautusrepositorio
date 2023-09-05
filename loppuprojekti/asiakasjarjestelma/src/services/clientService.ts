import clientData from '../data/clients'
import { AssessmentClient, Client, TherapyClient } from '../types'

//const clients: AssessmentClient[] | TherapyClient[] = clientData

const getClients = (): (Client)[] => {
    return clientData.map(({id, name, address, birthDate, problem, type, duration, level }) => {
        if(type === 'Therapy') {
            return {
                id,
                name,
                address,
                birthDate,
                problem,
                duration,
                type: 'Therapy', 
            } as TherapyClient
        } else if (type === 'Assessment') {
            return {
                id, 
                name,
                address,
                birthDate,
                problem,
                level,
                type: 'Assessment',
             } as AssessmentClient
        }
        return null 
    }).filter(client => client !==null) as (TherapyClient | AssessmentClient)[]
}

export default {
    getClients
}