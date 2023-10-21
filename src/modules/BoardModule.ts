import type { IBoarder, ICell, ICellType, ICoordinate, IOrientation, ITile } from "../Interfaces";
import { AlertError, doCoordsEqual, toggleOrientation } from "./Utils";

export class BoardModule {
    private input: string[][];
    private currentAHead: ICoordinate | undefined;
    private dHeads: (ICoordinate | undefined)[] = [];
    private nextId: number = 1;
    private answersMap: Map<string, string>;
    /**
     * y is first dimension
     */
    private rows: ITile[][];

    public constructor(input: string[][]) {
        this.input = input;
        this.answersMap = new Map();
        this.rows = this.makeRows(input);
    }

    ///////////////////
    // Basic Getters //
    ///////////////////

    public getCell = (coord: ICoordinate): ITile => {
        const [x, y] = coord;
        return this.rows[y][x];
    }

    public getRows = (): ITile[][] => {
        return this.rows;
    }

    public getAnswer = (coord: ICoordinate, orientation: IOrientation): string | undefined => {
        const key = this.getAnswersMapKey(coord, orientation);
        return this.answersMap.get(key);
    }

    public getNextHead = (start: ICoordinate, or: IOrientation): ICoordinate | undefined => {
        const [startX, startY] = start;
        const headKey = or === 'across' ? 'aHead' : 'dHead';
        let x = startX
        for (let y = startY; y < this.rows.length, y++;) {
            for(; x < this.rows[y].length, x++;) {
                const cell = this.getCell([x, y]);
                if (cell.type === 'boarder') continue;
                const h = cell[headKey];
                if (h) return h;
            }
            x = 0;
        }
    }

    ////////////////////////////////////
    // Methods for board construction //
    ////////////////////////////////////

    private makeRows = (input: string[][]): ITile[][] => {
        return input.map(this.processRow);
    }

    private processRow = (row: string[], y: number): ITile[] => {
        console.log('Process row y:', y);
        this.currentAHead = undefined;
        const rowOfTiles: ITile[] = row.map((cellVal, x) => {
            console.log('Going through x', x, cellVal);
            const currentCoord: ICoordinate = [x, y];
            const type = this.getCellType(cellVal);
            return type === 'boarder' ? this.createBoarder(currentCoord) : this.createCell(currentCoord, cellVal);
        });
        return rowOfTiles;
    }

    private createCell = (coord: ICoordinate, cellAnswer: string): ICell => {
        const [x, y] = coord;
        let shouldAssignId = false;
        if (!this.currentAHead) {
            const a = this.input[y]?.[x - 1];
            const b = this.input[y]?.[x + 1];
            const newHead = this.getHead(coord, a, b);
            if (newHead) shouldAssignId = true;
            this.currentAHead = newHead;
        }
        if (!this.dHeads[x]) {
            const a = this.input[y - 1]?.[x];
            const b = this.input[y + 1]?.[x];
            const newHead = this.getHead(coord, a, b);
            if (newHead) shouldAssignId = true;
            this.dHeads[x] = newHead;
        }
        this.updateAnswersMap(this.currentAHead, cellAnswer, 'across');
        this.updateAnswersMap(this.dHeads[x], cellAnswer, 'down');
        return {
            type: 'cell',
            answer: cellAnswer,
            aHead: this.currentAHead,
            dHead: this.dHeads[x],
            coordinate: coord,
            id: shouldAssignId ? this.nextId++ : undefined
        };
    }

    private getAnswersMapKey = (head: ICoordinate, orientation: IOrientation) => {
        return `x${head[0]}y${head[1]}_${orientation}`;
    }

    private updateAnswersMap = (head: ICoordinate | undefined, cellAnswer: string, orientation: IOrientation) => {
        if (!head) return;
        const key = this.getAnswersMapKey(head, orientation);
        let answer = this.answersMap.get(key);
        if (!answer) answer = '';
        answer += cellAnswer;
        this.answersMap.set(key, answer);
    }

    private getHead = (coord: ICoordinate, a?: string, b?: string): ICoordinate | undefined => {
        let aType: ICellType = 'boarder';
        if (a) aType = this.getCellType(a);
        let bType: ICellType = 'boarder';
        if (b) bType = this.getCellType(b);
        if (aType === 'boarder' && bType === 'boarder') return undefined;
        return coord;
    }

    private createBoarder = (coord: ICoordinate): IBoarder => {
        const [x, y] = coord;
        this.currentAHead = undefined;
        this.dHeads[x] = undefined;
        return {
            type: 'boarder',
            coordinate: coord,
        };
    }

    private getCellType = (c: string): ICellType => {
        if (c === '' || c === 'xx') return 'boarder';
        if (c.length !== 1) throw new AlertError(`Invalid Cell! ${c}`);
        return 'cell';
    }
}

export class BoardSingleton {
    private static board: BoardModule | undefined; 
    private constructor() {};
    public static set = (b: BoardModule) => {
        if (this.board) throw new AlertError('BoardSingleton already set!')
        this.board = b;
    }
    public static get = (): BoardModule => {
        if (!this.board) throw new AlertError('BoardSingleton never set!');
        return this.board as BoardModule;
    }
    public static isBoarder = (coord: ICoordinate) => {
        const cell = this.board?.getCell(coord);
        if (!cell) return true;
        return cell.type === 'boarder';
    }
    public static getNextHead = (start: ICoordinate, or: IOrientation): ICoordinate => {
        if (!this.board) throw new AlertError('BoardSingleton never set!');
        const startsHead = this.getHead(start, or);
        if (!startsHead) return start;
        let nextHead = this.board.getNextHead(startsHead, or);
        if (nextHead) return nextHead;
        // commented out b/c rn there is no way to update everyone when OR changes
        return start;
    }
    public static getHead(coord: ICoordinate, or: IOrientation): ICoordinate | undefined {
        if (!this.board) throw new AlertError('BoardSingleton never set!');
        const cell = this.board.getCell(coord);
        if (cell.type === 'boarder') return undefined;
        return or === 'across' ? cell.aHead : cell.dHead;
    }
}
