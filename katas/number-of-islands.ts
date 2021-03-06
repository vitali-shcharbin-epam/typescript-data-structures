import './../cross-cutting/collection-extensions';

const WATER = 0;
const EARTH = 1;
const LAND_CONNECTIONS = [
    [0, +1],
    [0, -1],
    [+1, 0],
    [-1, 0],
];

export class Word {

    width: number = 0
    height: number = 0;
    islands: number = 0;
    map: number[][] = [];
    earthMap: number[][] = [];

    constructor(map: number[][]) {
        this.width = map.length;
        this.height = map[0].length;
        this.map = map;
        this.earthMap.fillWith(this.width, this.height, WATER);
    }

    getNumberOfIslands() {
        for (let row = 0; row < this.width; row++) {
            for (let column = 0; column < this.height; column++) {
                if (this.earthMap[row][column] === EARTH) {
                    continue;
                }
    
                if (this.map[row][column] === EARTH) {
                    this.earthMap[row][column] = EARTH;
                    this.islands++;

                    this.checkCells(row, column);
                }
            }
        }

        return this.islands;
    }

    checkCells(row: number, column: number) {
        for (const land of LAND_CONNECTIONS) {
            this.checkCell(row + land[0], column + land[1]);
        }
    }

    checkCell(row: number, column: number) {
        if (row < 0 || row >= this.width || column < 0 || column >= this.height) {
            return;
        }

        if (this.earthMap[row][column] === EARTH) {
            return;
        }

        if (this.map[row][column] === EARTH) {
            this.earthMap[row][column] = EARTH;
            this.checkCells(row, column);
        }
    }
}