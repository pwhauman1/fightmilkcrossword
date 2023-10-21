import type { ICoordinate, IOrientation } from "../Interfaces";
import { BoardSingleton } from "./BoardModule";
import { stateModule } from "./StateModule";
import {
    selectedCellStore,
    currentHeadStore,
    storeReaderSingleton,
} from './Stores'
import { doCoordsEqual, getKeyType } from "./Utils";

function getNextCell(coordinate: ICoordinate, or: IOrientation): ICoordinate {
    const [x, y] = coordinate;
    const nextCoord: ICoordinate = or === 'across'
        ? [x + 1, y]
        : [x, y + 1];
    return nextCoord;
}

function getPreviousCell(coordinate: ICoordinate, or: IOrientation): ICoordinate {
    const [x, y] = coordinate;
    const nextCoord = or === 'across'
        ? [x - 1, y]
        : [x, y - 1];
    return nextCoord as ICoordinate;
}

interface IOnCellClick {
    aHead?: ICoordinate,
    dHead?: ICoordinate,
    coordinate: ICoordinate,
}
export function onCellClick(props: IOnCellClick): void {
    let or = storeReaderSingleton.getOrientation();
    const clickedCell = props.coordinate;
    const selectedCell = storeReaderSingleton.getCurrentCell();
    if (doCoordsEqual(clickedCell, selectedCell)) {
        or = storeReaderSingleton.toggleOrientation();
    }
    let head: ICoordinate | undefined;
    if (!props.aHead && !props.dHead) {
        console.error(`Cell ${props.coordinate} has no associated head!`);
    } else if (!props.aHead && props.dHead) {
        head = props.dHead;
    } else if (!props.dHead && props.aHead) {
        head = props.aHead;
    } else {
        head = or === 'across' ? props.aHead : props.dHead;
    }
    currentHeadStore.set({
        head,
        orientation: or,
    });
    selectedCellStore.set({
        coordinate: clickedCell,
        clear: false,
    });
}

interface IOnCellInput {
    coordinate: ICoordinate,
    pressedKey: string,
}
export function onCellInput(props: IOnCellInput): void {
    const { coordinate, pressedKey } = props;
    const keyType = getKeyType(pressedKey);

    if (keyType === 'ignore') return;

    const or = storeReaderSingleton.getOrientation();
    if (keyType === 'delete') {
        stateModule.remove(coordinate);
        const prevCoord = getPreviousCell(coordinate, or);
        selectedCellStore.set({
            coordinate: prevCoord,
            clear: true,
        });
    }

    if (keyType === 'char') {
        stateModule.write(coordinate, pressedKey);
        let nextCoord = getNextCell(coordinate, or);
        if (!BoardSingleton.isBoarder(nextCoord)) {
            selectedCellStore.set({
                coordinate: nextCoord,
                clear: false,
            });
            return;
        }
        // if the next cell would be a boarder, simulate clicking
        nextCoord = BoardSingleton.getNextHead(coordinate, or);
        onCellClick({
            coordinate: nextCoord,
            aHead: BoardSingleton.getHead(nextCoord, 'across'),
            dHead: BoardSingleton.getHead(nextCoord, 'down'),
        });
    }
}
