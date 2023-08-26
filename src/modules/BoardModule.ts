import type { ICell, ITile } from "../Interfaces";

export function getRows(): ITile[][] {
    const row1: ICell[] = [
        {
            type: 'cell',
            aAnswer: 'ab',
            dAnswer: 'ac',
            aHead: [0, 0],
            dHead: [0, 0],
            coordinate: [0, 0],
            answer: 'a',
        },
        {
            type: 'cell',
            aAnswer: 'ab',
            dAnswer: 'bd',
            aHead: [0, 0],
            dHead: [1, 0],
            coordinate: [1, 0],
            answer: 'b',
        }
    ];
    const row2: ICell[] = [{
        type: 'cell',
        aAnswer: 'cd',
        dAnswer: 'ac',
        aHead: [0, 1],
        dHead: [0, 0],
        coordinate: [0, 1],
        answer: 'c',
    },
    {
        type: 'cell',
        aAnswer: 'cd',
        dAnswer: 'bd',
        aHead: [0, 1],
        dHead: [1, 0],
        coordinate: [1, 1],
        answer: 'd',
    }];
    const row3: ITile[] = [
        {
            type: 'boarder',
            coordinate: [0, 2],
        },
        {
            type: 'boarder',
            coordinate: [1, 2]
        }
    ]
    return [row1, row2, row3];
}