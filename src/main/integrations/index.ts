import { Client } from "@xhayper/discord-rpc";

export function DiscordActivity() {
    const client = new Client({
        clientId: "1231979569737760808"
    });

    client.on("ready", () => {
        client.user?.setActivity({
            details: 'Siendo un PNGtuber???',
            state: 'Desarrollo activo en itch.io',
            largeImageKey: "pngtubestudiologo",
            largeImageText: 'PngtubeStudio',
            buttons: [{
                label: "itch.io",
                url: "https://pintogamer64.itch.io/pngtubestudio"
            },{
                label: "GitHub",
                url: "https://github.com/PintoGamer64/PngtubeStudioProject"
            }],
            type: 0,
            smallImageKey: 'creatorlogo',
            startTimestamp: new Date(),
            smallImageText: 'PintoGamer',
            instance: false,
        });
    });
    
    client.login();
}