import { apiResponseData, grid, impactLevel } from './models/grid';
import { direction } from './models/direction';

/**
 * Grid coordinates
 * @param numberOfFarms number
 * @returns array of grid co-ordinates
 */
export const gridCoordinates = (responseData?: apiResponseData): grid[][] => {
    let gridObject = new Array(responseData?.grid_width_and_length || 0);
    const confirmedOutbreaks = responseData?.confirmed_outbreaks;
    const windDirection = responseData?.wind_direction;

    for (var i = 0; i < gridObject.length; i++) {
        gridObject[i] = [];
    }

    for (let y = 0; y < gridObject.length; y++) {
        for (let x = 0; x < gridObject.length; x++) {
            let sourceOfOutbreak = false;
            let infectedNeighbour = false;
            let impact = impactLevel.None;
            confirmedOutbreaks?.forEach((infectedFarm) => {
                if (infectedFarm.x === x && infectedFarm.y === y) {
                    sourceOfOutbreak = true;
                    impact = impactLevel.High;
                }
                const nFarm = infectedNeighbouringFarms(
                    infectedFarm.x,
                    infectedFarm.y
                );
                const isInfected = true;

                switch (isInfected) {
                    case nFarm.northNeighbour.x === x &&
                        nFarm.northNeighbour.y === y:
                        infectedNeighbour = true;
                        impact =
                            direction.NORTH === windDirection
                                ? impactLevel.Medium
                                : impactLevel.Low;
                        break;

                    case nFarm.southNeighbour.x === x &&
                        nFarm.southNeighbour.y === y:
                        infectedNeighbour = true;
                        impact =
                            direction.SOUTH === windDirection
                                ? impactLevel.Medium
                                : impactLevel.Low;
                        break;

                    case nFarm.eastNeighbour.x === x &&
                        nFarm.eastNeighbour.y === y:
                        infectedNeighbour = true;
                        impact =
                            direction.EAST === windDirection
                                ? impactLevel.Medium
                                : impactLevel.Low;
                        break;

                    case nFarm.westNeighbour.x === x &&
                        nFarm.westNeighbour.y === y:
                        infectedNeighbour = true;
                        impact =
                            direction.WEST === windDirection
                                ? impactLevel.Medium
                                : impactLevel.Low;
                        break;

                    default:
                        break;
                }
            });
            gridObject[y][x] = {
                y: y,
                x: x,
                sourceOfOutbreak: sourceOfOutbreak,
                infectedNeighbour: infectedNeighbour,
                impactLevel: impact,
            };
        }
    }
    return gridObject;
};

const infectedNeighbouringFarms = (x: number, y: number) => {
    return {
        northNeighbour: { x: x, y: y - 1 },
        southNeighbour: { x: x, y: y + 1 },
        eastNeighbour: { x: x + 1, y },
        westNeighbour: { x: x - 1, y: y },
    };
};
