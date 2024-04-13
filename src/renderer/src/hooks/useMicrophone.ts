import { AudioContext_Def } from '@renderer/context';
import { useEffect, useRef, useState, useContext } from 'react';

export default function useMicrophone() {

  const { AudioState } = useContext(AudioContext_Def);

  const audioContextRef = useRef<AudioContext>(null!);
  const analyserRef = useRef<AnalyserNode>(null!);
  const dataArrRef = useRef<Uint8Array>(null!);

  const [Volume, setVolume] = useState(0);

  useEffect(() => {
    audioContextRef.current = new window.AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = AudioState.FftSize;
    dataArrRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    navigator.mediaDevices.getUserMedia({ audio: { autoGainControl: false, noiseSuppression: AudioState.NoiseSupression, echoCancellation: AudioState.EchoCancellation } })
      .then(stream => {
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
      });
  }, [AudioState.FftSize, AudioState.NoiseSupression, AudioState.EchoCancellation]);

  useEffect(() => {
    const interval = setInterval(() => {
      analyserRef.current.getByteFrequencyData(dataArrRef.current);
      let values = 0;
      const length = dataArrRef.current.length;
      for (let i = 0; i < length; i++) {
        values += (dataArrRef.current[i]);
      }
      setVolume(values / length);
    }, 8);
    return () => clearInterval(interval);
  }, [AudioState.FftSize, AudioState.NoiseSupression, AudioState.EchoCancellation]);

  return Volume;
};