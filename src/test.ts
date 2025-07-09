import { readFileSync, writeFileSync } from "fs";
import Static from "./builders/Static";
import SkinInventoryBuilder from "./builders/SkinInventoryBuilder";
import { GroupIds } from "./types";

Static.load_static().then(() => {

    let item = JSON.parse(readFileSync(`./item_definitions.json`, 'utf8')).item_types.find(a => a.id == 3).items.find(a => a.id == 9910);

    (new SkinInventoryBuilder(GroupIds.WeaponSkin, item)).build({format:'png'}).then((buf) => writeFileSync(`./img.png`, buf));

})
