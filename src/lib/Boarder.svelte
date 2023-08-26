<script lang="ts">
    import { onMount } from "svelte";
    import { type ICoordinate } from "../Interfaces";
    export let coordinate: ICoordinate;
    onMount(() => {
        console.log(`mounted boarder ${coordinate}`);
    });

</script>

<input disabled/>

<style>
    input {
        height: 30px;
        width: 30px;
        cursor: not-allowed;
        caret-color: transparent;
        background-color: black;
    }
</style>
