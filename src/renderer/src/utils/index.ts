export function PngtubeStudioAPI() {
    const { Close, MinMax, Minimize } = window.api.Window;
    return {
        CloseWindow: Close,
        MinMaxWindow: MinMax,
        MinimizeWindow: Minimize
    }
}