<script lang="ts">
    import { onMount } from "svelte";
    import { type ICoordinate } from "../Interfaces";
    export let dHead: ICoordinate | undefined = undefined;
    export let aHead: ICoordinate | undefined = undefined;
    export let answer: string;
    export let coordinate: ICoordinate;
    export let aAnswer: string | undefined = undefined;
    export let dAnswer: string | undefined = undefined;
    onMount(() => {
        console.log(`mounted ${coordinate}`, {
            dHead,
            aHead,
            answer,
            aAnswer,
            dAnswer,
        });
    });

    let value = '';
    let isCorrect = false;
    $: isCorrect = value === answer.toUpperCase();

    const onkeyup = () => {
        value = value.toUpperCase();
        if (value.length > 1) {
            value = value.slice(-1);
        }
    };
    
</script>

<input 
    bind:value
    on:keyup={onkeyup} 
    class:is-correct={isCorrect}/>

<style>
    input {
        height: 30px;
        width: 30px;
        cursor: pointer;
        caret-color: transparent;
        text-align: center;
    }
    .is-correct {
        background-color: yellow;
    }
</style>
