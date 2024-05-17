// Modules
import { useContext } from 'react';
// Contexts
// Components
import ListSettings from './components/ListSettings';
import ViewSettings from './components/ViewSettings';
// Styles
import '../../assets/settings.css'
import { MemoryContext } from '@renderer/context';

export default function Settings() {

    const { MemoryState, ModifyState } = useContext(MemoryContext)

    return (
        <div id="Settings" className={
            MemoryState.Settings
                ? "SettingsOpen"
                : "SettingClose"
        }
            onClick={() => {
                ModifyState({
                    action: "Settings",
                    value: false
                })
            }
        }>
            <main id="SettingsMain" onClick={(ev) => ev.stopPropagation()}>
                <ListSettings />
                <ViewSettings />
            </main>
        </div>
    )
}