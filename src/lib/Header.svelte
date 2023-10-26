<script lang="ts">
    import type { IAnswerKey } from "../Interfaces";
    import { AlertError } from "../modules/Utils";
    import type { BoardModule } from "../modules/BoardModule";
    import { scrubClue } from "../modules/ClueScrubber";
    import { currentHeadStore, storeReaderSingleton } from "../modules/Stores";
    import { savedStateModule } from "../modules/StateModule";

    export let answerKey: IAnswerKey[];
    export let board: BoardModule;
    const answerKeyMap = new Map<string, string>();
    answerKey.forEach((e) => {
        if (answerKeyMap.has(e.answer))
            throw new AlertError(`DUPLICATE ANSWER ${e}`);
        answerKeyMap.set(e.answer, e.clue);
    });
    let clueToShow: string = "Click a cell you dummy!";
    currentHeadStore.subscribe((event) => {
        if (!event || !event.head) return;
        const headCoord = event.head;
        const orientation = storeReaderSingleton.getOrientation();
        const answer = board.getAnswer(headCoord, orientation);
        if (!answer) return;
        const clue = answerKeyMap.get(answer);
        if (!clue) {
            throw new AlertError(
                `UNKNOWN ANSWER: ${answer}. For head ${headCoord}`
            );
        }
        clueToShow = scrubClue(clue);
    });
    function clearCache() {
        savedStateModule.clearAll();
        location.reload();
    }
</script>

<div class="sticky-header">
    <div>
        <button on:click={clearCache}> Clear cache </button>
    </div>
    <h2>{clueToShow}</h2>
</div>

<style>
    .sticky-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #3ac115;
        z-index: 999;
        display: flex;
        align-items: center;
    }
    button {
        background-color: #18557e; /* Just a nice blue color for your button */
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        margin-left: 10px;
    }

    h2 {
        padding-left: 10px;
        flex-grow: 1; /* This makes the h2 take up all available space */
        text-align: center; /* Horizontally center the text */
    }
</style>
