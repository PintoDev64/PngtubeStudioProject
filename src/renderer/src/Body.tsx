// Components
import Controls from "./Controls"
import AvatarsShowcase from "./components/Avatars";
import ModelViewer from "./components/Avatars/modelViewer";
import Settings from "./components/Settings";
// Hooks
import useBackgroundStyle from "./hooks/useBackgroundStyle";

export default function Body() {
    return (
        <main id="Main" style={useBackgroundStyle()}>
            <AvatarsShowcase />
            <ModelViewer />
            <Controls />
            <Settings />
        </main>
    )
}