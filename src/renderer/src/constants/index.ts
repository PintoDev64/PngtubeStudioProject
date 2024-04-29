// Moduels
import { useContext } from 'react';

import { PropagtorStructureComponents, PropagtorStructureList } from "../types/components";

/* import Checkbox from "../components/packages/Checkbox";

 */
/* export  */

import { MemoryContext, SettingsContext } from "../context"
/* import Checkbox from '../components/packages/Checkbox'; */
import Color from '../components/packages/Color';
import Select from '../components/packages/Select';
import Checkbox from '@renderer/components/packages/Checkbox';
import ListComponent from '@renderer/components/packages/List';
import { WallpapersAPI } from '@renderer/utils';
import useSaveSettings from '@renderer/hooks/useSaveSettings';

export default function Contants() {

    const { Save } = useSaveSettings()

    const { Deleter } = WallpapersAPI();

    const { MemoryState, ModifyState: ModifyMemory } = useContext(MemoryContext)

    const { SettingsState, ModifyState: ModifySettings } = useContext(SettingsContext);

    // Functions
    function TypeBackground() {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                Custom: {
                    ...SettingsState.Config.Custom,
                    type: SettingsState.Config.Custom.type === "Color" ? "Image" : "Color"
                }
            }
        })
    }

    function CustomBackground(name: string) {
        if (name !== SettingsState.Config.Custom.wallpaper) {
            ModifySettings({
                action: 'Config',
                value: {
                    ...SettingsState.Config,
                    Custom: {
                        ...SettingsState.Config.Custom,
                        wallpaper: name
                    }
                }
            })
            console.log("CustomBackground", name);
        }
    }

    function RemoveBackground(value: number) {
        ModifyMemory({
            action: 'Wallpapers',
            value: Deleter(value)
        })
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                Custom: {
                    ...SettingsState.Config.Custom,
                    wallpaper: MemoryState.Wallpapers[0].Name
                }
            }
        })
        Save()
    }

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
            Id: 0,
            Component: Checkbox,
            Execute: ChangeAudioLevel,
            ChangeCondition: !SettingsState.Config.Custom.audioLevel,
            Complement: {
                Text: "Nivel de audio",
                Definition: "Muestra el valor exacto del volumen del microfono",
            }
        },
        {
            Id: 1,
            Component: Checkbox,
            Execute: TypeBackground,
            ChangeCondition: SettingsState.Config.Custom.type === "Color",
            Complement: {
                Text: "Imagen de fondo",
                Definition: "Escoge entre un color solido o una imagen de fondo",
            }
        },
        {
            Id: 2,
            Component: Color,
            Execute: ColorSetter,
            Complement: {
                Text: "Color de Fondo",
                Definition: "",
                value: SettingsState.Config.Custom.colorBackground
            }
        },
        {
            Id: 3,
            Component: ListComponent,
            Execute: {
                Main: CustomBackground,
                Secundary: RemoveBackground
            },
            Complement: {
                Accept: 'Drag',
                Actions: 'Select',
                Text: "Fondos",
                Definition: "Se recomiendan imagenes de formato horizontal (16:9)",
                Elements: MemoryState.Wallpapers.map(({ Name, Source, Type }, index) => {
                    return {
                        IdElement: index,
                        ImageElement: Source,
                        TextElement: Name,
                        DefinitionElement: Type
                    }
                })
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
                Definition: "Utiliza tu GPU para una experiencia más fluida, esta caracteristica requiere un reinicio (puede afectar al rendimiento)"
            }
        }
    ]

    const IntegrationsRoutes: PropagtorStructureComponents[] = [
        {
            Id: 0,
            Component: Checkbox,
            Execute: () => {},
            ChangeCondition: false,
            Complement: {
                Text: "Discord Activity",
                Definition: "Desactiva tu presencia de actividad en Discord cuando usas la app"
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
            Text: "🔌 Integraciones",
            ChangeCondition: MemoryState.SettingRouter === "Integrations",
            Execution: () => ModifyMemory({
                action: 'SettingRouter',
                value: "Integrations"
            })
        },
        {
            Id: 3,
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
        IntegrationsRoutes,
        AdvancedRoutes,
        consts: {
            VoiceFftsizes
        }
    }
}