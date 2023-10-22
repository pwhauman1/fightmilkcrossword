<script lang="ts">
    import Header from "./lib/Header.svelte";
    import Board from "./lib/Board.svelte";
    import Loading from "./lib/Loading.svelte";
    import { Csv, type IValidator } from "./modules/CSVModule";
    import type { IAnswerKey } from "./Interfaces";
    import { BoardModule, BoardSingleton } from "./modules/BoardModule";
    import { onMount } from "svelte";
    let isLoading = true;
    let boardCsv: Csv<string[]>;
    let answerKeyCsv: Csv<IAnswerKey>;

    onMount(() => {
        const WAIT_TIME = 10 * 1000; // wait 10 s
        setTimeout(() => {
            isLoading = false;
        }, WAIT_TIME);
    });

    const boardValidator: IValidator = (data: unknown): string | true => {
        if (!Array.isArray(data)) return "Data is not an array!";
        let reason: string | undefined = undefined;
        data.forEach((e: unknown) => {
            // if reason was previously set, don't continue
            // JS has no `break` functionality
            if (reason) return;
            if (typeof e !== "string") {
                reason = `${JSON.stringify(e)} is not a string!`;
                return;
            }
            const isBoarder = e === "xx";
            const isEmpty = e === "";
            const isLetter = e.length === 1;
            if (!(isBoarder || isEmpty || isLetter)) {
                reason = `${JSON.stringify(e)} is not a cell or border!`;
            }
        });
        return reason || true;
    };

    const answerKeyValidator: IValidator = (data: unknown): string | true => {
        const strData = JSON.stringify(data);
        if (typeof data !== "object") return strData + " is not an object!";
        if (!data) return strData + " is falsy!";
        if (!("clue" in data)) return strData + " does not have a clue!";
        if (!("answer" in data)) return strData + " does not have an answer!";
        if (!(data.answer as string).match(/[a-zA-Z]+/)) {
            return strData + " does not format answer correctly!";
        }
        return true;
    };

    const boardCsvSource = "./board.csv";
    boardCsv = new Csv(boardCsvSource, boardValidator, false);
    const boardPromise = boardCsv.ingest();

    const answerKeyCsvSource = "./answerKey.csv";
    answerKeyCsv = new Csv(answerKeyCsvSource, answerKeyValidator, true);
    const answerKeyPromise = answerKeyCsv.ingest();

    const isBoardReadyPromise = Promise.all([boardPromise, answerKeyPromise]);
    let board: BoardModule;
    boardPromise.then(() => {
        const boardCsvContent = boardCsv.getCsv();
        board = new BoardModule(boardCsvContent);
        BoardSingleton.set(board);
    });
</script>

<main>
    <div>
        {#await isBoardReadyPromise}
            <Loading />
        {:then _}
            <div class:hide={!isLoading}>
                <Loading />
            </div>
            <div class:hide={isLoading}>
                <Header answerKey={answerKeyCsv.getCsv()} {board} />
                <br />
                <Board {board} />
            </div>
        {/await}
    </div>
</main>

<style>
    .hide {
        visibility: hidden;
    }
</style>
