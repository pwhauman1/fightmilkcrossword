export type ICoordinate = [number, number];
export type IOrientation = 'down' | 'across';

interface ITileCommon {
    type: 'boarder' | 'cell',
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
}
export type ITile = ICell | IBoarder;

export interface IWordForConfig {
    answer: string,
    clue: string,
    head: ICoordinate,
    relatedAnswers?: IWordForConfig['answer'][],
    orientation: IOrientation
}

export type IKeyType = 'char' | 'delete' | 'ignore';