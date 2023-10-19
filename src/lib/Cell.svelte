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
    export let id: number | undefined = undefined;

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
            if (orientation === "across")
                shouldHighlight = doCoordsEqual(aHead, head);
            if (orientation === "down")
                shouldHighlight = doCoordsEqual(dHead, head);
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
    const onBadgeClick = () => {
        me.focus();
        onclick();
    }
</script>

<div class="container">
    {#if id}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div 
            class="badge"
            on:click={onBadgeClick}
        >
            {id}
        </div>
    {/if}
    <input
        bind:value
        on:keyup={onkeyup}
        on:click={onclick}
        class:should-highlight={shouldHighlight}
        bind:this={me}
    />
</div>

<style>
    input {
        height: 25px;
        width: 25px;
        cursor: pointer;
        caret-color: transparent;
        text-align: center;
    }
    .should-highlight {
        background-color: yellow;
    }
    .container {
        position: relative;
        display: inline-block;
    }

    .badge {
        position: absolute;
        top: 0;
        left: 0;
        color: grey; /* Customize badge text color */
        padding: 4px 8px; /* Adjust padding to control badge size */
        font-size: 8px; /* Customize font size */
    }
</style>
