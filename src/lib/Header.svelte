<script lang="ts">
    import type { IAnswerKey } from "../Interfaces";

    export let answerKey: IAnswerKey[];
    const answers = answerKey.map(e => e.answer);
    const answerKeyMap = new Map<string, string>();
    answerKey.forEach(e => {
        if (answerKeyMap.get(e.answer)) throw new Error(`DUPLICATE ANSWER ${e}`)
        answerKeyMap.set(e.answer, e.clue);
    });
    let clue: string | undefined;
    setInterval(() => {
        const idx = Math.floor(Math.random() * (answers.length+1));
        const a = answers[idx];
        clue = answerKeyMap.get(a);
    }, 1500);

</script>

<h1>
    {#if clue}
        {clue}
    {:else}
        Click a cell you dummy
    {/if}
</h1>
