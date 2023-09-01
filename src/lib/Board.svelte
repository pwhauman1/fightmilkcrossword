<script lang="ts">
    import { BoardMaker } from "../modules/BoardModule";
    import Row from "./Row.svelte";
    export let board: string[][];
    const rows = new BoardMaker(board).makeRows();
</script>

{#each rows as row }
    <Row tiles={row}/>
    <br>
{/each}


