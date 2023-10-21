import type { ICoordinate } from "../Interfaces";

class StateModule {
    public remove = (coord: ICoordinate): void => {
        const key = this.getCoordKey(coord);
        localStorage.removeItem(key);
    }
    public write = (coord: ICoordinate, val: string): void => {
        const key = this.getCoordKey(coord);
        if (val === '') {
            this.remove(coord);
        } else {
            localStorage.setItem(key, val);
        }
    }
    public clearAll = (): void => {
        localStorage.clear()
    } 
    public get = (coord: ICoordinate): string => {
        const key = this.getCoordKey(coord);
        const val = localStorage.getItem(key);
        if (val) return val;
        return '';
    }

    private getCoordKey = (coord: ICoordinate): string => {
        const [x, y] = coord;
        return `fightMilkCrossWord_x${x}_y${y}`;
    }
}

const stateModule = new StateModule();
export { stateModule };
