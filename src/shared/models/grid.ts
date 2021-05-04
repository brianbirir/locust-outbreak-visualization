interface coordinate {
    x: number;
    y: number;
}

interface apiResponseData {
    grid_width_and_length: number;
    wind_direction: string;
    confirmed_outbreaks: coordinate[];
}

export type { apiResponseData, coordinate };
