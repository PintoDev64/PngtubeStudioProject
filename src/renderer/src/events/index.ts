// Modules
import { useContext, useEffect } from 'react';
// Contexts
import { MemoryContext } from '@renderer/context';

export default function useEventsDefinitios() {

    const { MemoryState } = useContext(MemoryContext);
    const { Fullscreen } = MemoryState;

    useEffect(() => {
        console.log(MemoryState.Fullscreen);
        if (Fullscreen && !document.fullscreenElement) {
            document.getElementById('Main')!.requestFullscreen()
        } else if (!Fullscreen && document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen();
        }
    }, [Fullscreen])
}