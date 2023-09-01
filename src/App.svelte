<script lang="ts">
    import Header from "./lib/Header.svelte";
    import Board from "./lib/Board.svelte";
    import { Csv, type IValidator } from "./modules/CSVModule";
    import { onMount } from "svelte";
    import type { IAnswerKey } from "./Interfaces";
    let boardCsv: Csv<string[]>;
    let answerKeyCsv: Csv<IAnswerKey>;
    let isBoardReadyPromise: Promise<unknown[]>;

    const boardValidator: IValidator<string[]> = (
        data: unknown
    ): data is string[] => {
        if (!Array.isArray(data)) return false;
        let allGood = true;
        data.forEach((e: unknown) => {
            if (typeof e !== "string") {
                allGood = false;
                return;
            }
            const isBoarder = e === 'xx';
            const isEmpty = e === '';
            const isLetter = e.length === 1;
            allGood = isBoarder || isEmpty || isLetter;
        });
        return allGood;
    };

    const answerKeyValidator: IValidator<IAnswerKey> = (
        data: unknown
    ): data is IAnswerKey => {
        if (typeof data !== 'object') return false;
        if (!data) return false;
        if (!('clue' in data)) return false;
        if (!('answer' in data)) return false;
        return true;
    } 

    onMount(() => {
        const boardCsvSource = "/board.csv";
        const answerKeyCsvSource = "/answerKey.csv";
        boardCsv = new Csv(boardCsvSource, boardValidator, false);
        const boardPromise = boardCsv.ingest();
        answerKeyCsv = new Csv(answerKeyCsvSource, answerKeyValidator, true);
        const answerKeyPromise = answerKeyCsv.ingest();
        isBoardReadyPromise = Promise.all([boardPromise, answerKeyPromise]);
    });
</script>

<main>
    <div>
        {#await isBoardReadyPromise}
            <p>Loading...</p>
        {:then _} 
            <Header />
            <Board />  
        {/await}
    </div>
</main>
