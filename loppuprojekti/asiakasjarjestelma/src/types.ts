
export enum Level {
    "narrow" = 1,
    "medium" = 2,
    "full" = 3
}

export enum Duration {
    "short" = 10,
    "medium" = 20,
    "long" = 30
}

export interface BaseClient {
    id: string,
    name: string,
    address: string,
    birthDate: string,
    problem: string,
}

export interface TherapyClient extends BaseClient {
    type: "Therapy",
    duration: Duration
}

export interface AssessmentClient extends BaseClient {
    type: "Assessment",
    level: Level
}

export type Client = 
| TherapyClient
| AssessmentClient