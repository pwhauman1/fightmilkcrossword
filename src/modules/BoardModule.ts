import type { IBoarder, ICell, ICellType, ICoordinate, IOrientation, ITile } from "../Interfaces";

export class BoardModule {
    private input: string[][];
    private currentAHead: ICoordinate | undefined;
    private dHeads: (ICoordinate | undefined)[] = [];
    private nextId: number = 1;
    private answersMap: Map<string, string>;
    private rows: ITile[][];

    constructor(input: string[][]) {
        this.input = input;
        this.answersMap = new Map();
        this.rows = this.makeRows(input);
    }

    public getRows = (): ITile[][] => {
        return this.rows;
    }

    public getAnswer = (coord: ICoordinate, orientation: IOrientation): string | undefined => {
        const key = this.getAnswersMapKey(coord, orientation);
        return this.answersMap.get(key);
    }

    private makeRows = (input: string[][]): ITile[][] => {
        return input.map(this.processRow);
    }

    private processRow = (row: string[], y: number): ITile[] => {
        this.currentAHead = undefined;
        const rowOfTiles: ITile[] = row.map((cellVal, x) => {
            const currentCoord: ICoordinate = [x, y];
            const type = this.getCellType(cellVal);
            return type === 'boarder' ? this.createBoarder(currentCoord) : this.createCell(currentCoord, cellVal);
        });
        return rowOfTiles;
    }

    private createCell = (coord: ICoordinate, cellAnswer: string): ICell => {
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
        this.updateAnswersMap(this.currentAHead, cellAnswer, 'across');
        this.updateAnswersMap(this.dHeads[y], cellAnswer, 'down');
        return {
            type: 'cell',
            answer: cellAnswer,
            aHead: this.currentAHead,
            dHead: this.dHeads[y],
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
