<script lang="ts">
    import type { IAnswerKey } from "../Interfaces";
    import type { BoardModule } from "../modules/BoardModule";
    import { currentHeadStore, storeReaderSingleton } from "../modules/Stores";

    export let answerKey: IAnswerKey[];
    export let board: BoardModule;
    const answerKeyMap = new Map<string, string>();
    answerKey.forEach(e => {
        if (answerKeyMap.has(e.answer)) throw new Error(`DUPLICATE ANSWER ${e}`)
        answerKeyMap.set(e.answer, e.clue);
    });
    let clueToShow: string = 'Click a cell you dummy!';
    currentHeadStore.subscribe((event) => {
        if (!event || !event.head) return;
        const headCoord = event.head;
        const orientation = storeReaderSingleton.getOrientation();
        const answer = board.getAnswer(headCoord, orientation);
        if (!answer) return;
        const clue = answerKeyMap.get(answer);
        if (!clue) {
            throw new Error(`UNKNOWN ANSWER: ${answer}. For head ${headCoord}`);
        };
        clueToShow = clue;
    });
    
</script>

<h1>
    {clueToShow}
</h1>
