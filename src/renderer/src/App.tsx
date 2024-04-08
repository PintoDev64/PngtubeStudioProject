// Components
import Controls from "./Controls"
// Events
import useEventsDefinitios from "./events";

function App(): JSX.Element {
  
  useEventsDefinitios()

  return (
    <main id="Main">
      example
      <Controls />
    </main>
  )
}

export default App
