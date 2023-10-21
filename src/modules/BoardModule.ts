import type { IBoarder, ICell, ICellType, ICoordinate, IOrientation, ITile } from "../Interfaces";
import { AlertError } from "./Utils";

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
