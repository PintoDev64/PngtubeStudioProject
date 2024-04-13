import { useContext } from "react";
// Componets
import ComponentsPropagator from "../packages/ComponentsPropagator";
// Contants
import Contants from "../../constants";
// Hooks
import useSettings from "../../hooks/useSaveSettings";
// Contexts
import { MemoryContext } from "@renderer/context";
// Icons
import Close from "@renderer/assets/icons/Close";

export default function ViewSettings() {

    const { MemoryState, ModifyState } = useContext(MemoryContext);

    const { SettingsRoutes, VoiceRoutes } = Contants();
    const { Compare, Discard, Save, SaveResponce } = useSettings()

    function DrawInterface() {
        if (MemoryState.SettingRouter === 'Appareance') {
            return <ComponentsPropagator Data={SettingsRoutes} />
        }
        if (MemoryState.SettingRouter === 'Audio') {
            return <ComponentsPropagator Data={VoiceRoutes} />
        }
        if (MemoryState.SettingRouter === 'Advanced') {
            return <div></div>
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
            </section>
        </article>
    )
}