export function WindowAPI() {
    const { Close, MinMax, Minimize, ZoomPlus, ZoomMinus } = window.api.Window;
    return {
        CloseWindow: Close,
        MinMaxWindow: MinMax,
        MinimizeWindow: Minimize,
        ZoomPlus,
        ZoomMinus
    }
}
export function SettingsAPI() {
    const { Receive, Send } = window.api.Settings;
    return {
        ReceiveSettings: Receive,
        SendSettings: Send
    }
}
export function AvatarsAPI() {
    const { Receiver } = window.api.Models;
    return {
        Receiver
    }
}
export function WallpapersAPI() {
    const { Receiver, Send, Deleter } = window.api.Wallpapers;
    return {
        Receiver,
        Send,
        Deleter
    }
}
export function AppAPI() {
    const { AppDetails } = window.api.App;
    return {
        AppDetails
    }
}

export const ResolveRouteLeft = (stringParam: string) => {
    let newData = "";
    const newVariable = stringParam.split("/");

    for (let i = 0; i < newVariable.length; i++) {
        newData += `${newVariable[i]}\\`
    }

    return newData.slice(0, -1);
}

export const ResolveRouteRight = (stringParam: string) => {
    let newData = "";
    const newVariable = stringParam.split("\\");

    for (let i = 0; i < newVariable.length; i++) {
        newData += `${newVariable[i]}/`
    }

    return newData.slice(0, -1);
}