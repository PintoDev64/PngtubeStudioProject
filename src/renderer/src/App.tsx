// Components
import Controls from "./Controls"
import AvatarsShowcase from "./modules/Avatars";
import ModelViewer from "./modules/Avatars/components/modelViewer";
import Settings from "./modules/Settings";
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
