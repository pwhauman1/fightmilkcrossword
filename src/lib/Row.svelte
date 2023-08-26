<script lang="ts">
    import { type ICell, type ITile } from "../Interfaces";
    import Boarder from "./Boarder.svelte";
    import Cell from "./Cell.svelte";
    export let tiles: ITile[];
</script>

{#each tiles as cell}
    {#if cell.type === "cell"}
        <Cell {...cell} />
    {:else}
        <Boarder {...cell} />
    {/if}
    
{/each}
