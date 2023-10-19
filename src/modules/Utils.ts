import type { ICoordinate, IKeyType } from "../Interfaces";

export function doCoordsEqual(c1?: ICoordinate, c2?: ICoordinate) {
    // yes, even if both are undefined. Then there are no coordinates
    // the vacuous case is false for this. otherwise, if there is no
    // head, then a cell with no ahead could highlight itself
    if (!c1 || !c2) return false;
    const [x1, y1] = c1;
    const [x2, y2] = c2;
    return (x1 === x2) && (y1 === y2);
}

export function getKeyType(key: string): IKeyType {
    const upperCasedKey = key.toLocaleUpperCase();
    if (upperCasedKey === 'BACKSPACE' || upperCasedKey === 'DELETE') return 'delete';
    const charRegExp = /^[A-Z]|[1-9]$/;
    const matches = upperCasedKey.match(charRegExp);
    if (matches?.length) {
        return 'char'
    }
    return 'ignore';
}

export function isFlagOn(flag: string): boolean{
    const hashWithoutHashChar = location.hash.slice(1);
    const flags = hashWithoutHashChar.split('_');
    return !!flags.find(f => f === flag);
}

export class AlertError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Utils';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AlertError);
        }
        if (isFlagOn('alerterrors')) {
            this.displayAlert();
        }
    }
    displayAlert = () => {
        window.alert(this.message);
    }
}