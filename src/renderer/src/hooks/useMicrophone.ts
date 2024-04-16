import { SettingsContext } from '@renderer/context';
import { useEffect, useRef, useState, useContext } from 'react';

export default function useMicrophone() {

  const { SettingsState } = useContext(SettingsContext);

  const audioContextRef = useRef<AudioContext>(null!);
  const analyserRef = useRef<AnalyserNode>(null!);
  const dataArrRef = useRef<Uint8Array>(null!);

  const [Volume, setVolume] = useState(0);

  useEffect(() => {
    audioContextRef.current = new window.AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = SettingsState.Config.AudioFftsize;
    dataArrRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    navigator.mediaDevices.getUserMedia({ audio: { autoGainControl: false, noiseSuppression: SettingsState.Config.NoiseSupression, echoCancellation: SettingsState.Config.EchoCancellation } })
      .then(stream => {
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
      });
  }, [SettingsState.Config.AudioFftsize, SettingsState.Config.NoiseSupression, SettingsState.Config.EchoCancellation]);

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
  }, [SettingsState.Config.AudioFftsize, SettingsState.Config.NoiseSupression, SettingsState.Config.EchoCancellation]);

  return Volume;
};