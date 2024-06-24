import { useContext } from "react";
// Componets
import ComponentsPropagator from "./ComponentsPropagator";
// Contants
import Contants from "../utils";
// Hooks
import useSettings from "../hooks/useSaveSettings";
// Contexts
import { MemoryContext } from "@renderer/context";
// Icons
import Close from "@renderer/assets/icons/Close";

export default function ViewSettings() {

    const { MemoryState, ModifyState } = useContext(MemoryContext);

    const { SettingsRoutes, VoiceRoutes, AdvancedRoutes, IntegrationsRoutes, AvatarsRoutes } = Contants();
    const { Compare, Discard, Save, SaveResponce } = useSettings()

    function DrawInterface() {
        if (MemoryState.SettingRouter === 'Appareance') {
            return <ComponentsPropagator Data={SettingsRoutes} />
        }
        if (MemoryState.SettingRouter === 'Audio') {
            return <ComponentsPropagator Data={VoiceRoutes} />
        }
        if (MemoryState.SettingRouter === 'Advanced') {
            return <ComponentsPropagator Data={AdvancedRoutes} />
        }
        if (MemoryState.SettingRouter === 'Integrations') {
            return <ComponentsPropagator Data={IntegrationsRoutes} />
        }
        if (MemoryState.SettingRouter === 'Avatars') {
            return <ComponentsPropagator Data={AvatarsRoutes} />
        } else {
            return <div></div>
        }
    }

    return (
        <article id="SettingsView">
            <section id="SettingsView-Tool">
                <button id="SettingsView-Tool-CloseButton" onClick={() => {
                    ModifyState({
                        action: 'Settings',
                        value: !MemoryState.Settings
                    })
                }}>
                    <Close />
                </button>
            </section>
            <section id="SettingsView-Content">
                <DrawInterface />
            </section>
            <footer id="SettingsView-Content-Confirm" style={
                Compare()
                    ? {
                        display: 'none'
                    }
                    : {
                        display: 'flex'
                    }
            }>
                <p id="SettingsView-Content-Confirm-Text">¿Quieres guardar los cambios?</p>
                <div id="SettingsView-Content-Confirm-Options">
                    <button className="SettingsView-Content-Confirm-Options_Buttons" id="SettingsView-Content-Confirm-Options_Discard" onClick={Discard}>
                        <h4>Descartar</h4>
                    </button>
                    <button className={`SettingsView-Content-Confirm-Options_Buttons ${SaveResponce ? "SettingsView-Content-Confirm-Good" : "SettingsView-Content-Confirm-Failure"}`} id="SettingsView-Content-Confirm-Options_Save" onClick={Save}>
                        <h4>{SaveResponce ? "💾 Guardar" : "Reintentar"}</h4>
                    </button>
                </div>
            </footer>
        </article>
    )
}