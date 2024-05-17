import { TypeUpdateAvatarStyleClass } from '../types'

export default function UpdateAvatarStyleClass({
    Animate,
    AudioState,
    Volume,
    AvatarsState,
    setActualModel
}: TypeUpdateAvatarStyleClass
) {
    const State_1 = AvatarsState.Data[AvatarsState.Select - 1].Data.States[0][0]
    const State_2 = AvatarsState.Data[AvatarsState.Select - 1].Data.States[0][1]

    if (AudioState.State) {
        if ((Volume / AudioState.Amplifier) * 100 < (AudioState.Sensibility / 100) * 100) {
            Animate.classList.remove('AvatarActive');
            setActualModel(State_1)
        }
        if ((Volume / AudioState.Amplifier) * 100 > (AudioState.Sensibility / 100) * 100) {
            Animate.classList.add('AvatarActive');
            setActualModel(State_2)
        }
    } else {
        Animate.classList.remove('AvatarActive');
        setActualModel(State_1)
    }

}