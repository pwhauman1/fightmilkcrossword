import { BoardSingleton, type ICrossAnswerRef } from "./BoardModule";
import { referencedAnswersStore, type IReferencedAnswers } from "./Stores";
import { AlertError } from "./Utils";

export function scrubClue(clue: string): string {
    if (!shouldScrubBrackets(clue)) {
        referencedAnswersStore.set([]);
        return clue;
    }
    let scrubbedClue = '';
    const parts = clue.split(/\[|\]/);
    let shouldScrubThisPart = false;
    const referencedAnswersToEmit: IReferencedAnswers[] = [];
    parts.forEach(p => {
        if (shouldScrubThisPart) {
            const {
                strToShow,
                referencedAnswers
            } = getReplacement(p);
            scrubbedClue += strToShow;
            const refs = referencedAnswers.map(a => ({
                orientation: a.or,
                head: a.head,
            }));
            referencedAnswersToEmit.push(...refs);
        } else {
            scrubbedClue += p;
        }
        shouldScrubThisPart = !shouldScrubThisPart;
    });
    referencedAnswersStore.set(referencedAnswersToEmit);
    return scrubbedClue;
}

function getReplacement(answer: string) {
    const referencedAnswers = BoardSingleton.getCrossReference(answer);
    const convertToPresentableString = (crossRef: ICrossAnswerRef) => {
        return `${crossRef.id}${crossRef.or.slice(0, 1).toLocaleUpperCase()}`;
    }
    if (referencedAnswers.length === 0) {
        throw new AlertError('Cross Reference Not Found! Looking for ' + answer);
    }
    let strToShow = '';
    if (referencedAnswers.length === 1) {
        strToShow = convertToPresentableString(referencedAnswers[0]);
    } else {
        strToShow = convertToPresentableString(referencedAnswers[0]);
        referencedAnswers.forEach((o, idx) => {
            if (idx === 0) return;
            strToShow += ' and ' + convertToPresentableString(o);
        });
    }
    return {
        strToShow,
        referencedAnswers,
    };
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
