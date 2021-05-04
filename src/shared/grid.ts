import { coordinate } from '../shared/models/grid';

/**
 * Grid coordinates
 * @param numberOfFarms number
 * @returns array of grid co-ordinates
 */
export const gridCoordinates = (farmSize: number): coordinate[][] => {
    let grid = new Array(farmSize);

    for (var i = 0; i < grid.length; i++) {
        grid[i] = [];
    }

    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid.length; x++) {
            grid[y][x] = {
                y: y,
                x: x,
            };
        }
    }
    return grid;
};
