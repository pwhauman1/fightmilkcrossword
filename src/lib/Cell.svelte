<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { type ICoordinate } from "../Interfaces";
    import { currentHeadStore, selectedCellStore } from "../modules/Stores";
    import { onCellClick, onCellInput } from "../modules/InteractionModule";
    import { doCoordsEqual } from "../modules/Utils";
    import type { Unsubscriber } from "svelte/store";
    export const type = "cell";
    export let dHead: ICoordinate | undefined = undefined;
    export let aHead: ICoordinate | undefined = undefined;
    export let answer: string;
    export let coordinate: ICoordinate;

    let me: HTMLInputElement;
    let unsubs: Unsubscriber[] = [];
    let value = "";
    let shouldHighlight = false;
    onMount(() => {
        const nextFocusUnsub = selectedCellStore.subscribe((event) => {
            if (!event) return;
            if (!doCoordsEqual(event.coordinate, coordinate)) return;
            me.focus();
            if (event.clear) {
                value = "";
            }
        });
        const currentHeadUnsub = currentHeadStore.subscribe((event) => {
            if (!event) return;
            const { head, orientation } = event;
            if (!head) return;
            if (orientation === 'across') shouldHighlight = doCoordsEqual(aHead, head);
            if (orientation === 'down') shouldHighlight = doCoordsEqual(dHead, head)
        });
        unsubs.push(nextFocusUnsub);
        unsubs.push(currentHeadUnsub);
    });

    onDestroy(() => {
        unsubs.forEach((u) => u());
    });

    const onkeyup = (e: KeyboardEvent) => {
        value = value.toUpperCase();
        if (value.length > 1) {
            value = value.slice(-1);
        }
        onCellInput({ coordinate, key: e.key });
    };
    const onclick = () => {
        onCellClick({
            aHead,
            dHead,
            coordinate,
        });
    };
</script>

<input
    bind:value
    on:keyup={onkeyup}
    on:click={onclick}
    class:is-correct={shouldHighlight}
    bind:this={me}
/>

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
