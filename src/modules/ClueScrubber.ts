import { BoardSingleton, type ICrossAnswerRef } from "./BoardModule";
import { AlertError } from "./Utils";

export function scrubClue(clue: string): string {
    if (!shouldScrubBrackets(clue)) return clue;
    let scrubbedClue = '';
    const parts = clue.split(/\[|\]/);
    let shouldScrubThisPart = false;
    parts.forEach(p => {
        if (shouldScrubThisPart) {
            scrubbedClue += getReplacement(p);
        } else {
            scrubbedClue += p;
        }
        shouldScrubThisPart = !shouldScrubThisPart;
    });
    return scrubbedClue;
}

function getReplacement(answer: string): string {
    const options = BoardSingleton.getCrossReference(answer);
    const convertToPresentableString = (crossRef: ICrossAnswerRef) => {
        return `${crossRef.id}${crossRef.or.slice(0, 1).toLocaleUpperCase()}`;
    }
    if (options.length === 0) {
        throw new AlertError('Cross Reference Not Found! Looking for ' + answer);
    }
    if (options.length === 1) {
        return convertToPresentableString(options[0]);
    } else {
        let str = convertToPresentableString(options[0]);
        options.forEach((o, idx) => {
            if (idx === 0) return;
            str += ' and ' + convertToPresentableString(o);
        });
        return str;
    }
}

/**
 * 
 * @param clue 
 * @throws if clue is invalid
 */
export function shouldScrubBrackets(clue: string): boolean {
    const leftBracketsNum = clue.match(/\[/g)?.length;
    const rightBracketsNum = clue.match(/\[/g)?.length;
    if (leftBracketsNum !== rightBracketsNum) {
        throw new AlertError(`Invalid clue format. L Brackets: ${leftBracketsNum}, R Brackets: ${rightBracketsNum} for clue "${clue}"`);
    }
    return !!leftBracketsNum;
}
