export type ICoordinate = [number, number];
export type IOrientation = 'down' | 'across';
export type ICellType = 'boarder' | 'cell';

interface ITileCommon {
    type: ICellType,
    coordinate: ICoordinate,
}
export interface IBoarder extends ITileCommon {
    type: 'boarder',
};
export interface ICell extends ITileCommon {
    type: 'cell',
    aHead?: ICoordinate,
    dHead?: ICoordinate,
    answer: string,
    id?: number,
}
export type ITile = ICell | IBoarder;

export interface IWordForConfig {
    answer: string,
    clue: string,
    head: ICoordinate,
    relatedAnswers?: IWordForConfig['answer'][],
    orientation: IOrientation,
}

export type IKeyType = 'char' | 'delete' | 'ignore';

export interface IAnswerKey {
    answer: string,
    clue: string,
}
