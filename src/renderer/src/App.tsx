// Components
import Controls from "./Controls"
import AvatarsShowcase from "./components/Avatars";
import ModelViewer from "./components/Avatars/modelViewer";
import Settings from "./components/Settings";
// Events
import useEventsDefinitios from "./events";
// Hooks
import useBackgroundStyle from "./hooks/useBackgroundStyle";

function App(): JSX.Element {
  
  useEventsDefinitios()

  return (
    <main id="Main" style={useBackgroundStyle()}>
      <AvatarsShowcase />
      <ModelViewer />
      <Controls />
      <Settings />
    </main>
  )
}

export default App
