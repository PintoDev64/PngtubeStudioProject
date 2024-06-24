// Moduels
import { useContext } from 'react';

import { PropagtorStructureComponents, PropagtorStructureList } from "../types";

import { AvatarsContext, MemoryContext, SettingsContext } from "../../../context"
import Color from '../../../assets/components/Color';
import Select from '../../../assets/components/Select';
import Checkbox from '@renderer/assets/components/Checkbox';
import ListComponent from '@renderer/assets/components/List';
import { WallpapersAPI } from '@renderer/utils';
import useSaveSettings from '@renderer/modules/Settings/hooks/useSaveSettings';

export default function Contants() {

    const { Save } = useSaveSettings();

    const { Deleter } = WallpapersAPI();

    const { AvatarsState } = useContext(AvatarsContext);

    const { MemoryState, ModifyState: ModifyMemory } = useContext(MemoryContext);

    const { SettingsState, ModifyState: ModifySettings } = useContext(SettingsContext);

    //#region Appareance Functions
    function TypeBackground() {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                Custom: {
                    ...SettingsState.Config.Custom,
                    type: SettingsState.Config?.Custom?.type === "Color" ? "Image" : "Color"
                }
            }
        })
    }

    function CustomBackground(args) {
        if (args.name !== SettingsState.Config.Custom.wallpaper) {
            ModifySettings({
                action: 'Config',
                value: {
                    ...SettingsState.Config,
                    Custom: {
                        ...SettingsState.Config?.Custom,
                        wallpaper: args.name
                    }
                }
            })
        }
    }

    function RemoveBackground(value: number) {
        console.log(MemoryState.Wallpapers[0].Name);
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
        ModifyMemory({
            action: 'Wallpapers',
            value: Deleter(value)
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

    //#region Audio Functions

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

    //#region Advanced Functions

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

    //#region Integrations Functions

    function ChangeDiscordIntegrations() {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                Integrations: {
                    ...SettingsState.Config.Integrations,
                    Discord: !SettingsState.Config.Integrations?.Discord
                },
                Custom: {
                    ...SettingsState.Config.Custom
                }
            }
        })
    }

    //#region Avatars Functions

    function ChangeAvatarName(AvatarId: number, NewAvatarName: string) {
        const ElementToModify = AvatarsState.Data.findIndex(({ Id }) => Id === AvatarId)
        const response = [
            ...AvatarsState.Data
        ]

        response[ElementToModify] = {
            ...response[ElementToModify],
            Name: NewAvatarName
        }
        console.log(response[ElementToModify]);
        /* ModifyAvatars({
            action: 'Data',
            value: [
                ...response,

            ]
        }) */
    }

    // Miscelaneo

    const VoiceFftsizes: number[] = [32, 64, 128, 256, 512, 1024, 2048, 4096]

    // Config
    const SettingsRoutes: PropagtorStructureComponents[] = [
        {
            Id: 0,
            Component: Checkbox,
            Execute: ChangeAudioLevel,
            ChangeCondition: SettingsState.Config?.Custom?.audioLevel,
            Complement: {
                Text: "Nivel de audio",
                Definition: "Muestra el valor exacto del volumen del microfono",
            }
        },
        {
            Id: 1,
            Component: Checkbox,
            Execute: TypeBackground,
            ChangeCondition: SettingsState.Config?.Custom?.type === "Image",
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
                value: SettingsState.Config.Custom?.colorBackground
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
                value: "true",
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
                value: `${SettingsState.Config?.AudioFftsize}`
            },
            Execute: ChangeFftsize
        },
        {
            Id: 1,
            Component: Checkbox,
            Execute: ChangeNoiseSupression,
            ChangeCondition: SettingsState.Config?.NoiseSupression,
            Complement: {
                Text: "Supresion de Sonido",
                Definition: ""
            }
        },
        {
            Id: 2,
            Component: Checkbox,
            Execute: ChangeEchoCancellation,
            ChangeCondition: SettingsState.Config?.EchoCancellation,
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
            ChangeCondition: SettingsState.Config?.hardwareAcceleration,
            Complement: {
                RequireRestart: true,
                Text: "Aceleracion por Hardware",
                Definition: "Utiliza tu GPU para una experiencia más fluida (puede afectar al rendimiento)"
            }
        }
    ]

    const IntegrationsRoutes: PropagtorStructureComponents[] = [
        {
            Id: 0,
            Component: Checkbox,
            Execute: ChangeDiscordIntegrations,
            ChangeCondition: SettingsState.Config.Integrations?.Discord,
            Complement: {
                RequireRestart: true,
                Text: "Discord Activity",
                Definition: "Desactiva tu presencia de actividad en Discord cuando usas la app"
            }
        }
    ]

    const AvatarsRoutes: PropagtorStructureComponents[] = [
        {
            Id: 0,
            Component: ListComponent,
            Execute: {
                Main: (args) => {
                    ChangeAvatarName(args.id, args.name)
                },
                Secundary(args) {
                    console.log(args);
                },
            },
            Complement: {
                Accept: 'Drag',
                Actions: 'Select',
                Text: "Avatares",
                Definition: "Puedes cambiar los nombres de los modelos que poseas aqui",
                Elements: AvatarsState.Data.map(({ Name, Date: modelDate, Image, Id }) => {
                    return {
                        IdElement: Id,
                        ImageElement: Image,
                        TextElement: Name,
                        DefinitionElement: new Date(modelDate).toLocaleString()
                    }
                })
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
            Text: "👥 Avatares",
            ChangeCondition: MemoryState.SettingRouter === "Avatars",
            Execution: () => ModifyMemory({
                action: 'SettingRouter',
                value: 'Avatars'
            })
        },
        {
            Id: 4,
            Text: "🔨 Avanzado",
            ChangeCondition: MemoryState.SettingRouter === "Advanced",
            Execution: () => ModifyMemory({
                action: 'SettingRouter',
                value: "Advanced"
            })
        },
        
    ]

    return {
        SettingsListDetails,
        SettingsRoutes,
        VoiceRoutes,
        IntegrationsRoutes,
        AdvancedRoutes,
        AvatarsRoutes,
        consts: {
            VoiceFftsizes
        }
    }
}