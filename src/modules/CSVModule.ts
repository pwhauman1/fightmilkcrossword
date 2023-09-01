import { parse, type ParseResult } from 'papaparse';

export type IValidator<T> = (data: unknown) => data is T;

/**
 * If headers are not present, res.data is a double array of strings.
 * If it is present, then is an array of objects
 */
export class Csv<T> {
    private csv: T[] = [];
    private path: string;
    private isRead = false;
    private areHeadersPresent = false;
    private validator?: (data: unknown) => void;
    constructor(path: string, validator?: IValidator<T>, areHeadersPresent?: boolean) {
        this.path = path;
        this.areHeadersPresent = !!areHeadersPresent;
        if (validator) {
            this.validator = (data: unknown) => {
                const isValid = validator(data);
                if (!isValid) throw new Error(`Invalid cell in ${this.path}: ${JSON.stringify(data)}`);
            }
        }
    }
    public ingest = async () => {
        if (this.isRead) return;
        const res = await fetch(this.path);
        const data = await res.text();
        parse<T>(data, {
            header: this.areHeadersPresent,
            complete: this.onParse
        });
    }
    private onParse = (res: ParseResult<T>): void => {
        console.log(`Finished parsing ${this.path}`);
        const actualErrs = res.errors.filter(e => {
            return e.code !== 'UndetectableDelimiter';
        })
        if (actualErrs.length) {
            console.error(actualErrs);
            throw new Error('Parse Error');
        }
        if (this.validator) res.data.map(this.validator);
        console.log(`${this.path} returned ${res.data.length} items`)
        this.csv = res.data;
    }

    public getCsv = (): T[] => {
        return this.csv;
    }
}
