import { Font, FontFactory, loadImage } from "canvacord";

declare class CanvacordImage {
    data: Buffer;
    mime: string;
    constructor(data: Buffer, mime: string);
    toBase64(): string;
    toDataURL(): string;
}

type StaticData = {
    skinBackgroundImage: CanvacordImage;
}

export const Static_Data: StaticData = {
    skinBackgroundImage: null
}

export default {
    load_static: async () => {
        if(!FontFactory.size) {
            Font.fromFileSync(`./assets/aftika.ttf`, 'Aftika');
        }
        Static_Data.skinBackgroundImage = await loadImage('./assets/bg.png');
    }
}
