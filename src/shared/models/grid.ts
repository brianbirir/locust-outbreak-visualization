export enum impactLevel {
    None = '0',
    Low = '25%',
    Medium = '50%',
    High = '80%',
}

interface coordinate {
    x: number;
    y: number;
}
export interface grid {
    x: number;
    y: number;
    sourceOfOutbreak: boolean;
    infectedNeighbour: boolean;
    impactLevel: string;
}

interface apiResponseData {
    grid_width_and_length: number;
    wind_direction: string;
    confirmed_outbreaks: coordinate[];
}

export type { apiResponseData, coordinate };
