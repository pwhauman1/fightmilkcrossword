<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Board from "./lib/Board.svelte";
</script>

<main>
  <div>
    <Header />
  </div>
  <div>
    <Board />
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>