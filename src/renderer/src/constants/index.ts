// Moduels
import { useContext } from 'react';

import { PropagtorStructureComponents, PropagtorStructureList } from "../types/components";

/* import Checkbox from "../components/packages/Checkbox";

 */
/* export  */

import { AudioContext_Def, MemoryContext, SettingsContext } from "../context"
/* import Checkbox from '../components/packages/Checkbox'; */
import Color from '../components/packages/Color';
import Select from '../components/packages/Select';
import Checkbox from '@renderer/components/packages/Checkbox';

export default function Contants() {
    const { MemoryState, ModifyState: ModifyMemory } = useContext(MemoryContext)

    const { SettingsState, ModifyState: ModifySettings } = useContext(SettingsContext);

    const { AudioState, ModifyState: ModifyAudio } = useContext(AudioContext_Def);

    // Functions
    /* function CustomBackground() {
        if (SettingsState.Config.Custom.type === "Color") {
            ModifySettings({
                action: 'Config',
                value: {
                    ...SettingsState.Config,
                    Custom: {
                        ...SettingsState.Config.Custom,
                        type: 'Image'
                    }
                }
            })
        } else {
            ModifySettings({
                action: 'Config',
                value: {
                    ...SettingsState.Config,
                    Custom: {
                        ...SettingsState.Config.Custom,
                        type: 'Color'
                    }
                }
            })
        }
    } */

    function ColorSetter(color: string) {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                Custom: {
                    ...SettingsState.Config.Custom,
                    colorBackground: color
                }
            }
        });
    }

    function ChangeAudioLevel() {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                Custom: {
                    ...SettingsState.Config.Custom,
                    audioLevel: !SettingsState.Config.Custom.audioLevel
                }
            }
        })
    }

    function ChangeFftsize(value: string) {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                AudioFftsize: parseInt(value),
                Custom: {
                    ...SettingsState.Config.Custom
                }
            }
        });
        ModifyAudio({
            action: 'FftSize',
            value: parseInt(value)
        })
    }

    function ChangeNoiseSupression() {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                NoiseSupression: !SettingsState.Config.NoiseSupression,
                Custom: {
                    ...SettingsState.Config.Custom
                }
            }
        });
        ModifyAudio({
            action: 'NoiseSupression',
            value: !SettingsState.Config.NoiseSupression
        })
    }

    function ChangeEchoCancellation() {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                EchoCancellation: !SettingsState.Config.EchoCancellation,
                Custom: {
                    ...SettingsState.Config.Custom
                }
            }
        });
        ModifyAudio({
            action: 'EchoCancellation',
            value: !SettingsState.Config.EchoCancellation
        })
    }

    function ChangeHardwareAcceleration() {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                hardwareAcceleration: !SettingsState.Config.hardwareAcceleration,
                Custom: {
                    ...SettingsState.Config.Custom
                }
            }
        })
    }

    // Miscelaneo

    const VoiceFftsizes: number[] = [32, 64, 128, 256, 512, 1024, 2048, 4096]

    // Config
    const SettingsRoutes: PropagtorStructureComponents[] = [
        {
            Id: 1,
            Component: Checkbox,
            Execute: ChangeAudioLevel,
            ChangeCondition: !SettingsState.Config.Custom.audioLevel,
            Complement: {
                Text: "Nivel de audio",
                Definition: "Muestra el valor exacto del volumen del microfono",
            }
        },
        {
            Id: 0,
            Component: Color,
            Execute: ColorSetter,
            Complement: {
                Text: "Color de Fondo",
                Definition: "",
                value: SettingsState.Config.Custom.colorBackground
            }
        }
    ]

    const VoiceRoutes: PropagtorStructureComponents[] = [
        {
            Id: 0,
            Component: Select,
            Complement: {
                Text: "Tamaño de Buffer",
                Definition: "Calidad de captura de audio (puede afectar al rendimiento)",
                value: `${SettingsState.Config.AudioFftsize}`
            },
            Execute: ChangeFftsize
        },
        {
            Id: 1,
            Component: Checkbox,
            Execute: ChangeNoiseSupression,
            ChangeCondition: SettingsState.Config.NoiseSupression === false,
            Complement: {
                Text: "Supresion de Sonido",
                Definition: ""
            }
        },
        {
            Id: 2,
            Component: Checkbox,
            Execute: ChangeEchoCancellation,
            ChangeCondition: SettingsState.Config.EchoCancellation === false,
            Complement: {
                Text: "Cancelacion de Eco",
                Definition: ""
            }
        }
    ]

    const AdvancedRoutes: PropagtorStructureComponents[] = [
        {
            Id: 0,
            Component: Checkbox,
            Execute: ChangeHardwareAcceleration,
            ChangeCondition: SettingsState.Config.hardwareAcceleration === false,
            Complement: {
                Text: "Aceleracion por Hardware",
                Definition: "Utiliza tu GPU para una experiencia más fluida (puede afectar al rendimiento)"
            }
        }
    ]

    const SettingsListDetails: PropagtorStructureList = [
        {
            Id: 0,
            Text: "🎨 Apariencia",
            ChangeCondition: MemoryState.SettingRouter === "Appareance",
            Execution: () => ModifyMemory({
                action: 'SettingRouter',
                value: "Appareance"
            })
        },
        {
            Id: 1,
            Text: "🎤 Microfono",
            ChangeCondition: MemoryState.SettingRouter === "Audio",
            Execution: () => ModifyMemory({
                action: 'SettingRouter',
                value: "Audio"
            })
        },
        {
            Id: 2,
            Text: "🔨 Avanzado",
            ChangeCondition: MemoryState.SettingRouter === "Advanced",
            Execution: () => ModifyMemory({
                action: 'SettingRouter',
                value: "Advanced"
            })
        }
    ]

    return {
        SettingsListDetails,
        SettingsRoutes,
        VoiceRoutes,
        AdvancedRoutes,
        consts: {
            VoiceFftsizes
        }
    }
}