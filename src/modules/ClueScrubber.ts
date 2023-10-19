export function scrubClue(clue: string): string {
    if (!shouldScrubBrackets(clue)) return clue;
    let scrubbedClue = '';
    const parts = clue.split(/\[|\]/);
    let shouldScrubThisPart = false;
    parts.forEach(p => {
        if (shouldScrubThisPart) {
            scrubbedClue += '***';
        } else {
            scrubbedClue += p;
        }
        shouldScrubThisPart = !shouldScrubThisPart;
    });
    return scrubbedClue;
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
        throw new Error(`Invalid clue format. L Brackets: ${leftBracketsNum}, R Brackets: ${rightBracketsNum} for clue "${clue}"`);
    }
    return !!leftBracketsNum;
}