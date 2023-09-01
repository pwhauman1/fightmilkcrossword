import type { IBoarder, ICell, ICellType, ICoordinate, ITile } from "../Interfaces";

export class BoardMaker {
    private input: string[][];
    private currentAHead: ICoordinate | undefined;
    private dHeads: (ICoordinate | undefined)[] = [];
    private nextId: number = 1;

    constructor(input: string[][]) {
        this.input = input;
    }

    public makeRows = (): ITile[][] => {
        return this.input.map(this.processRow);
    }

    private processRow = (row: string[], x: number): ITile[] => {
        this.currentAHead = undefined;
        const rowOfTiles: ITile[] = row.map((cellVal, y) => {
            const currentCoord: ICoordinate = [x, y];
            const type = this.getCellType(cellVal);
            return type === 'boarder' ? this.createBoarder(currentCoord) : this.createCell(currentCoord, cellVal);
        });
        return rowOfTiles;
    }

    private createCell = (coord: ICoordinate, answer: string): ICell => {
        const [x, y] = coord;
        const shouldAssignId = !this.currentAHead || !this.dHeads[y];
        if (!this.currentAHead) {
            const a = this.input[x - 1]?.[y];
            const b = this.input[x + 1]?.[y];
            this.currentAHead = this.getHead(coord, a, b);
        }
        if (!this.dHeads[y]) {
            const a = this.input[x]?.[y - 1];
            const b = this.input[x]?.[y + 1];
            this.dHeads[y] = this.getHead(coord, a, b);
        }
        return {
            type: 'cell',
            answer,
            aHead: this.currentAHead,
            dHead: this.dHeads[y],
            coordinate: coord,
            id: shouldAssignId ? this.nextId++ : undefined
        };
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
        this.dHeads[y] = undefined;
        return {
            type: 'boarder',
            coordinate: coord,
        };
    }

    private getCellType = (c: string): ICellType => {
        if (c === '' || c === 'xx') return 'boarder';
        if (c.length !== 1) throw new Error(`Invalid Cell! ${c}`);
        return 'cell';
    }
}
