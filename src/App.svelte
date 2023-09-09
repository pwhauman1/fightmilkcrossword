<script lang="ts">
    import Header from "./lib/Header.svelte";
    import Board from "./lib/Board.svelte";
    import { Csv, type IValidator } from "./modules/CSVModule";
    import type { IAnswerKey } from "./Interfaces";
    import { BoardModule } from "./modules/BoardModule";
    let boardCsv: Csv<string[]>;
    let answerKeyCsv: Csv<IAnswerKey>;

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

    const boardCsvSource = "/board.csv";
    boardCsv = new Csv(boardCsvSource, boardValidator, false);
    const boardPromise = boardCsv.ingest();

    const answerKeyCsvSource = "/answerKey.csv";
    answerKeyCsv = new Csv(answerKeyCsvSource, answerKeyValidator, true);
    const answerKeyPromise = answerKeyCsv.ingest();
    
    const isBoardReadyPromise = Promise.all([boardPromise, answerKeyPromise]);
    let board: BoardModule;
    boardPromise.then(() => {
        const boardCsvContent = boardCsv.getCsv();
        board = new BoardModule(boardCsvContent);
    });
</script>

<main>
    <div>
        {#await isBoardReadyPromise}
            <p>Loading...</p>
        {:then _} 
            <Header answerKey={answerKeyCsv.getCsv()} board={board}/>
            <Board board={board}/>  
        {/await}
    </div>
</main>
