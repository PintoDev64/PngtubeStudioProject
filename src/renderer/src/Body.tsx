// Components
import Controls from "./Controls"
import AvatarsShowcase from "./modules/Avatars";
import ModelViewer from "./modules/Avatars/components/modelViewer";
import Settings from "./modules/Settings";
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