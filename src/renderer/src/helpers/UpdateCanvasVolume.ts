// Types
import { TypeUpdateCanvasVolume } from "../types/helpers";

export default function UpdateCanvasVolume({
    canvasLevelRef,
    AudioState,
    ModifyState,
    Volume
}: TypeUpdateCanvasVolume
): void {
    if (AudioState.State) {
        if (Volume > AudioState.Amplifier) ModifyState(Math.floor(AudioState.Amplifier))
        else ModifyState(Math.floor(Volume))

        const canvasLevel = canvasLevelRef.current;
        const ctxLevel = canvasLevel.getContext("2d")!;

        if ((Volume / AudioState.Amplifier) * 100 < (AudioState.Sensibility / 100) * 100) {
            ctxLevel.fillStyle = "#41AF2E";
        }
        if ((Volume / AudioState.Amplifier) * 100 > (AudioState.Sensibility / 100) * 100) {
            ctxLevel.fillStyle = "#FF0000";
        }

        const rectWidth = (canvasLevel.width * Volume) / AudioState.Amplifier;

        ctxLevel.clearRect(0, 0, canvasLevel.width, canvasLevel.height);
        ctxLevel.fillRect(0, 0, rectWidth, canvasLevel.height);

    } else {

        ModifyState(0)

        const canvasLevel = canvasLevelRef.current;
        const ctxLevel = canvasLevel.getContext("2d");

        ctxLevel !== null && ctxLevel.clearRect(0, 0, canvasLevel.width, canvasLevel.height);
    }
}