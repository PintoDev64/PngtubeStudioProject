// Types
import { ColorType } from "@renderer/types/components";

export default function Color({ Complement, Execute }: ColorType) {

    function hexToHue(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        s = s * 100;
        s = Math.round(s);
        l = l * 100;
        l = Math.round(l);
        h = Math.round(360 * h);

        return h;
    }

    function hueToHex(hue) {
        // Elegir valores para la saturación y la luminosidad
        const saturation = 1;
        const lightness = 0.5;

        // Convertir HSL a RGB
        const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
        const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
        const m = lightness - c / 2;
        let r = 0;
        let g = 0;
        let b = 0;

        if (0 <= hue && hue < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= hue && hue < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= hue && hue < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= hue && hue < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= hue && hue < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= hue && hue < 360) {
            r = c; g = 0; b = x;
        }

        // Convertir RGB a hexadecimal
        const red = Math.round((r + m) * 255).toString(16).padStart(2, '0');
        const green = Math.round((g + m) * 255).toString(16).padStart(2, '0');
        const blue = Math.round((b + m) * 255).toString(16).padStart(2, '0');

        return `#${red}${green}${blue}`;
    }

    return (
        <div className="OptionsElement">
            <div className="OptionsElement-Data">
                <h2>{Complement.Text}</h2>
                <p> {Complement.Definition} </p>
            </div>
            <div className="OptionsElement-Execution-ColorSchema" style={{
                background: Complement.value
            }} />
            <div className="OptionsElement-Execution" onClick={(e) => e.stopPropagation()}>
                <input className="OptionsElement-Execution-InputColor" type="range"
                    min="0"
                    max="360"
                    value={hexToHue(Complement.value)}
                    onChange={(ev) => {
                        Execute(hueToHex(ev.target.value))
                    }} />
            </div>
        </div>
    )
}