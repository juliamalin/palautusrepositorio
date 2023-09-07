import { Client, Level, Duration } from "../types"

//type Client = AssessmentClient | TherapyClient;

const clients: Client[] = [
    {
        id: "1",
        name: "milla niemelä",
        address: "Toukolankuja 2 A B 57",
        birthDate: "1989-03-15",
        problem: "oppimisvaikeudet",
        level: Level.medium,
        type: "Assessment"
    },
    {
        id: "2",
        name: "mikko järvinen",
        address: "Laitakatu 13 A 18",
        birthDate: "1997-04-20",
        problem: "sosiaaliset taidot",
        level: Level.narrow,
        type: "Assessment"
    },
    {
        id: "3",
        name: "moona malin",
        address: "Aallonhalkoja 15 A 23",
        birthDate: "2000-05-31",
        problem: "tarkkaavuus ja toiminnanohjaus",
        level: Level.narrow,
        type: "Assessment"
    },
    {
        id: "4",
        name: "lumi niemi",
        address: "Aleksanterin katu 1 A 2",
        birthDate: "1985-09-21",
        problem: "ahdistus",
        duration: Duration.short,
        type: "Therapy"
    },
    {
        id: "5",
        name: "aleksanteri valo",
        address: "Niemenkatu 11 A 45",
        birthDate: "1982-10-21",
        problem: "masennus",
        duration: Duration.long,
        type: "Therapy"
    },
    {
        id: "6",
        name: "tuomas kivi",
        address: "Fredrikinkatu 12 B 30",
        birthDate: "1980-11-21",
        problem: "mielialan lasku, stressi",
        duration: Duration.medium,
        type: "Therapy"
    },
    {
        id: "7",
        name: "minna hirvonen",
        address: "kalliontie 12 A 53",
        birthDate: "2010-03-04",
        problem: "käytösongelmat",
        level: Level.full,
        type: "Assessment"
    },
]

export default clients;