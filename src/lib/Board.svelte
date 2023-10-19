<script lang="ts">
    import { BoardModule } from "../modules/BoardModule";
    import Row from "./Row.svelte";
    export let board: BoardModule;
    const rows = board.getRows();
</script>

<div class="board">
    {#each rows as row}
        <Row tiles={row} />
        <br />
    {/each}
</div>

<style>
    .board {
        padding-top: 30px;
    }
</style>