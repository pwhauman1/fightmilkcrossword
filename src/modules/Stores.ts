import { writable } from "svelte/store";
import { type IOrientation, type ICoordinate } from "../Interfaces";

interface ISelectCellEvent {
    coordinate: ICoordinate,
    clear: boolean,
}
export const selectedCellStore = writable<ISelectCellEvent | undefined>();
interface ICurrentHeadEvent {
    head?: ICoordinate,
    orientation: IOrientation,
}
export const currentHeadStore = writable<ICurrentHeadEvent | undefined>();

export interface IReferencedAnswers {
    head: ICoordinate,
    orientation: IOrientation,
}
export const referencedAnswersStore = writable<IReferencedAnswers[]>([]);

class StoreReader {
    private orientation: IOrientation = 'across';
    private currentHead: ICoordinate | undefined;
    private selectedCell: ICoordinate | undefined;
    private referencedAnswers: IReferencedAnswers[] = [];
    public static instance: StoreReader | undefined;
    private constructor() {
        this.setOrientation = this.setOrientation.bind(this);
        this.getOrientation = this.getOrientation.bind(this);

        this.setCurrentHead = this.setCurrentHead.bind(this);
        currentHeadStore.subscribe(this.setCurrentHead);
        this.getCurrentHead = this.getCurrentHead.bind(this);

        this.setSelectedCell = this.setSelectedCell.bind(this);
        selectedCellStore.subscribe(this.setSelectedCell);
        this.getCurrentCell = this.getCurrentCell.bind(this);

        this.setReferencedAnswers = this.setReferencedAnswers.bind(this);
        referencedAnswersStore.subscribe(this.setReferencedAnswers);
        this.getReferencedAnswers = this.getReferencedAnswers.bind(this);
    }

    static get(): StoreReader {
        if (!this.instance) {
            this.instance = new StoreReader();
        };
        return this.instance;
    }

    public toggleOrientation(): IOrientation {
        if (this.orientation === 'across') {
            this.orientation = 'down';
        }
        else {
            this.orientation = 'across';
        }
        return this.orientation;
    }
    private setOrientation(value: IOrientation) {
        this.orientation = value;
    }
    public getOrientation() {
        return this.orientation;
    }
    
    private setCurrentHead(value: ICurrentHeadEvent | undefined) {
        this.currentHead = value?.head;
    }
    public getCurrentHead(): ICoordinate | undefined {
        return this.currentHead;
    }

    private setSelectedCell(value: ISelectCellEvent | undefined) {
        this.selectedCell = value?.coordinate;
    }
    public getCurrentCell(): ICoordinate | undefined {
        return this.selectedCell;
    }

    private setReferencedAnswers(value: IReferencedAnswers[]) {
        this.referencedAnswers = value;
    }
    public getReferencedAnswers(): IReferencedAnswers[] {
        return this.referencedAnswers;
    }
}

export const storeReaderSingleton = StoreReader.get();