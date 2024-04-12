import { AudioContext_Def, AvatarsContext } from "@renderer/context";
import UpdateAvatarStyleClass from "@renderer/helpers/UpdateAvatarStyleClass";
import useMicrophone from "@renderer/hooks/useMicrophone";
import { useContext, useEffect, useRef, useState } from "react";

export default function ModelViewer() {

    const { AudioState } = useContext(AudioContext_Def);
    const { AvatarsState } = useContext(AvatarsContext);

    const [ActualModel, setActualModel] = useState(AvatarsState.Data[AvatarsState.Select - 1].Data.States[0][0])

    const Animate = useRef<HTMLImageElement>(null!);
    const Volume = useMicrophone();

    useEffect(() => {
        UpdateAvatarStyleClass({
            Animate: Animate.current,
            AudioState,
            AvatarsState,
            setActualModel,
            Volume
        })
        return;
    }, [Volume])

    return <img id="ActualModel" ref={Animate} src={ActualModel} alt="ModelSpritesManager" width={400} height={400} />
}