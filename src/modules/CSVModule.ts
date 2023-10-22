import { parse, type ParseResult } from 'papaparse';
import { AlertError } from './Utils';

export type IValidator = (data: unknown) => true | string;

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
    constructor(path: string, validator?: IValidator, areHeadersPresent?: boolean) {
        this.path = path;
        this.areHeadersPresent = !!areHeadersPresent;
        if (validator) {
            this.validator = (data: unknown) => {
                console.log('Validating:', data);
                const isValid = validator(data);
                if (isValid !== true) throw new AlertError(`Invalid cell in ${this.path}. ${isValid}: ${JSON.stringify(data)}`)
            }
        }
    }
    public ingest = async () => {
        if (this.isRead) return;
        const res = await fetch(this.path);
        const data = await res.text();
        console.log('Read Data', {data});
        parse<T>(data, {
            header: this.areHeadersPresent,
            complete: this.onParse,
            delimitersToGuess: ['|', '\t'],
            transform: this.trimCell,
            transformHeader: this.trimCell,
        });
    }
    private trimCell = (cell: string): string => {
        return cell.trim();
    }
    private onParse = (res: ParseResult<T>): void => {
        const actualErrs = res.errors.filter(e => {
            return e.code !== 'UndetectableDelimiter';
        })
        if (actualErrs.length) {
            console.error(actualErrs);
            throw new AlertError('Parse Error');
        }
        if (this.validator) res.data.map(this.validator);
        this.csv = res.data;
    }

    public getCsv = (): T[] => {
        return this.csv;
    }
}
