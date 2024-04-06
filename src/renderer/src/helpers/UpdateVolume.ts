export function UpdateVolume(
    analyser: AnalyserNode,
    dataArray: Uint8Array,
    bufferLength: number,
    callback: (value: number) => void
): void {
    analyser.getByteFrequencyData(dataArray);
    const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
    callback(average)
}