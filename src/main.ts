import './app.css'
import App from './App.svelte'

const app = new App({
  // safe to cast since it is defined in index.html
  target: document.getElementById('app') as HTMLElement,
})

export default app
