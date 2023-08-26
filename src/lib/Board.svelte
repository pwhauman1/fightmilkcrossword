<script lang="ts">
    import { getRows } from "../modules/BoardModule";
    import Row from "./Row.svelte";
    const rows = getRows();
</script>

{#each rows as row }
    <Row tiles={row}/>
    <br>
{/each}


