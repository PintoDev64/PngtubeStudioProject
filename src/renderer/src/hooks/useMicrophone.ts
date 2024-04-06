import { useState, useEffect, useContext } from 'react';
import { UpdateVolume } from '../helpers/UpdateVolume';
import { AudioContext_Def } from '../context';

export default function useMicrophone() {

    const { AudioState } = useContext(AudioContext_Def);

    const [Volume, setVolume] = useState(0);

    useEffect(() => {
        let intervalTime: NodeJS.Timeout;
        navigator.mediaDevices
            .getUserMedia({ audio: { autoGainControl: false } })
            .then((stream) => {
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                source.connect(analyser);
                analyser.fftSize = AudioState.FftSize;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const execution = () => UpdateVolume(analyser, dataArray, bufferLength, (value: number) => {
                    setVolume(value)
                })

                intervalTime = setInterval(execution, 8);
            })
            .catch((error) => {
                console.error("Error al obtener acceso al micrófono:", error);
            });
        return () => clearInterval(intervalTime);
    }, [AudioState.FftSize]);

    return {
        Volume
    };
}