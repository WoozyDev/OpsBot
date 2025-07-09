import { User } from "seyfert";
import ClientBot from "./structures/ClientBot"
import { AgentDefinition, CaseDefinition, CurrencyDefinition, EmblemDefinition, GloveSkinDefinition, GroupIds, Item, KeyDefinition, WeaponAnimationDefinition, WeaponSkinDefinition } from "./types";
import imageSize from "image-size";
import { ISizeCalculationResult } from "image-size/dist/types/interface";

const known_common_weapon_names = {
    'gsr 1911': ['gsr', 'gsr 1911', 'gsr1911'],
    'mr 96': ['rev', 'revolver', 'mr96', 'mr 96'],
    'p250': ['p250', 'p2'],
    'dual mtx': ['duallies', 'mtx', 'dual mtx', 'dualmtx'],
    'deagle': ['desert eagle', 'deagle'],
    'xd .45': ['xd', 'xd45', 'xd 45', 'xd.45', 'xd .45'],
    'mp5': ['mp5'],
    'mp7': ['mp7'],
    'mpx': ['mpx'],
    'vector': ['vector'],
    'p90': ['p90'],
    'fp6': ['fp6'],
    'super 90': ['super90', 'super 90'],
    'ksg': ['ksg'],
    'm1887': ['winchester', 'm1887'],
    'sa58': ['dsa58', 'sa58'],
    'ar-15': ['ar15', 'ar-15'],
    'm4': ['m4'],
    'ak-47': ['ak47', 'ak', 'ak-47'],
    'hk417': ['hk', 'hk 417', 'hk417'],
    'scar-h': ['scar', 'scarh', 'scar-h'],
    'aug': ['aug'],
    'sg 551': ['sg', 'sg551', 'sg 551'],
    'trg22': ['trg', 'trg22'],
    'm14': ['m14'],
    'svd': ['svd'],
    'uratio': ['sniper', 'uratio'],
    'knife': ['knife'],
    'balisong': ['bali', 'balisong'],
    'tanto': ['tanto'],
    'kukri': ['kukri'],
    'pipe wrench': ['pipe', 'pipewrench', 'pipe wrench'],
    'push daggers': ['pushdaggers', 'daggers', 'push daggers'],
    'tactical axe': ['axe', 'tacticalaxe', 'tactical axe'],
    'tomahawk': ['tomahawk'],
    'meat cleaver': ['meatcleaver', 'meat', 'meat cleaver'],
    'tac-tool': ['tactool', 'kabar', 'tac-tool'],
    'karambit': ['karambit'],
    'remix': ['remix'],
    'trench knife': ['trench', 'trenchknife', 'trench knife'],
    'short sword': ['sword', 'shortsword', 'short sword'],
    'dragonmourn': ['dragon', 'dragon sword', 'dragon mourn', 'dragonmourn'],
    'smoke grenade': ['smoke', 'smokegrenade', 'smoke grenade'],
    'incendiary grenade': ['incendiary', 'molly', 'incendiarygrenade', 'incendiary grenade'],
    'flashbang grenade': ['flash', 'flashbang', 'flashbanggrenade', 'flashbang grenade'],
    'frag grenade': ['hegrenade', 'he grenade', 'frag', 'frag grenade']
}

export default {
    known_common_weapon_names,
    get_discord_user: (userId: string): Promise<User> => {
        return new Promise((resolve, reject) => {
            let cachedUser = ClientBot.instance.cache.users.get(userId);
            if(cachedUser) {
                resolve(cachedUser);
                return;
            }
            ClientBot.instance.users.fetch(userId).then((user) => {
                resolve(user);
            }).catch(reject);
        })
    },
    get_item_name: (group_id: GroupIds, item_id: number) => {
        if(group_id == GroupIds.WeaponSkin) {
            let item = ClientBot.items.find(a => a.id == group_id).items.find(a => a.id == item_id) as WeaponSkinDefinition;
            if(!item) return null;
            return `${(item.display_header.includes('-') ? item.display_header : (item.display_header.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' ')))} ${(item.display_name.includes('-') ? item.display_name : (item.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' ')))}`;
        }
        if(group_id == GroupIds.GloveSkin) {
            let item = ClientBot.items.find(a => a.id == group_id).items.find(a => a.id == item_id) as GloveSkinDefinition;
            if(!item) return null;
            return item.display_name.includes('-') ? item.display_name : (item.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '));
        }
        if(group_id == GroupIds.Agent) {
            let item = ClientBot.items.find(a => a.id == group_id).items.find(a => a.id == item_id) as AgentDefinition;
            if(!item) return null;
            return item.display_name.includes('-') ? item.display_name : (item.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '));
        }
        if(group_id == GroupIds.Emblem) {
            let item = ClientBot.items.find(a => a.id == group_id).items.find(a => a.id == item_id) as EmblemDefinition;
            if(!item) return null;
            return item.display_name.includes('-') ? item.display_name : (item.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '));
        }
        if(group_id == GroupIds.WeaponAnimation) {
            let item = ClientBot.items.find(a => a.id == group_id).items.find(a => a.id == item_id) as WeaponAnimationDefinition;
            if(!item) return null;
            return item.display_name.includes('-') ? item.display_name : (item.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '));
        }
        if(group_id == GroupIds.Case) {
            let item = ClientBot.items.find(a => a.id == group_id).items.find(a => a.id == item_id) as CaseDefinition;
            if(!item) return null;
            return item.display_name.includes('-') ? item.display_name : (item.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '));
        }
        if(group_id == GroupIds.Key) {
            let item = ClientBot.items.find(a => a.id == group_id).items.find(a => a.id == item_id) as KeyDefinition;
            if(!item) return null;
            return item.display_name.includes('-') ? item.display_name : (item.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '));
        }
        if(group_id == GroupIds.Currency) {
            let item = ClientBot.items.find(a => a.id == group_id).items.find(a => a.id == item_id) as CurrencyDefinition;
            if(!item) return null;
            return item.display_name.includes('-') ? item.display_name : (item.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '));
        }

        return null;
    },
    get_category_name: (group_id: GroupIds) => {
        switch(group_id) {
            case GroupIds.Currency:
                return 'Currencies';
            case GroupIds.WeaponSkin:
                return 'Weapons';
            case GroupIds.Emblem:
                return 'Emblems';
            case GroupIds.WeaponAnimation:
                return 'Animations';
            case GroupIds.Case:
                return 'Cases';
            case GroupIds.GloveSkin:
                return 'Gloves';
            case GroupIds.Agent:
                return 'Agent';
            case GroupIds.Key:
                return 'Keys';
            default:
                return 'Unknown'
        }
    },
    get_inventory_fields: (group_id: GroupIds, item: Item) => {
        switch(group_id) {
            case GroupIds.Currency:
                var _currency = item as CurrencyDefinition;
                return [
                    { name: 'Name', value: _currency.name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '), inline: true }
                ];
            case GroupIds.WeaponSkin:
                var _weaponSkin = item as WeaponSkinDefinition;
                return [
                    { name: 'Weapon', value: _weaponSkin.display_header.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '), inline: true },
                    { name: 'Name', value: _weaponSkin.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '), inline: true },
                    { name: 'For Teams', value: _weaponSkin.faction_target == 1 ? 'CTs' : _weaponSkin.faction_target == 2 ? 'Ts' : _weaponSkin.faction_target == 3 ? 'All Teams' : 'Unknown', inline: true },
                    { name: 'Tier', value: _weaponSkin.tier, inline: true },
                    { name: 'Marketplace', value: _weaponSkin.is_marketable ? `✅` : `❌`, inline: true },
                ]
            case GroupIds.Emblem:
                var _emblem = item as EmblemDefinition;
                return [
                    { name: 'Name', value: _emblem.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '), inline: true },
                    { name: 'Marketplace', value: _emblem.is_marketable ? `✅` : `❌`, inline: true },
                ];
            case GroupIds.WeaponAnimation:
                var _animation = item as WeaponAnimationDefinition;
                return [
                    { name: 'Weapon', value: _animation.display_header.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '), inline: true },
                    { name: 'Name', value: _animation.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '), inline: true },
                    { name: 'Type', value: _animation.animation_slot == 5 ? 'Reload' : _animation.animation_slot == 4 ? 'Inspect' : 'Unknown', inline: true },
                    { name: 'For Teams', value: _animation.faction_target == 1 ? 'CTs' : _animation.faction_target == 2 ? 'Ts' : _animation.faction_target == 3 ? 'All Teams' : 'Unknown', inline: true },
                    { name: 'Marketplace', value: _animation.is_marketable ? `✅` : `❌`, inline: true }
                ];
            case GroupIds.Case:
                var _case = item as CaseDefinition;
                return [
                    { name: 'Name', value: _case.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '), inline: true },
                    { name: 'Included Tiers', value: _case.roll_data[0].drop_chances.map((a,i) => ([a, `${i+1}`])).filter(a => a[0] != 0 ).map(a => a[1]).join(', '), inline: true },
                    { name: 'Drop Chances', value: _case.roll_data[0].drop_chances.map((a,i) => `> **Tier ${i+1}:** ${(a/100).toFixed(2)}%`).join('\n'), inline: true },
                    { name: 'Marketplace', value: _case.is_marketable ? `✅` : `❌`, inline: true },
                ]
            case GroupIds.GloveSkin:
                var _gloveSkin = item as GloveSkinDefinition;
                return [
                    { name: 'Name', value: _gloveSkin.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '), inline: true },
                    { name: 'For Teams', value: _gloveSkin.faction_target == 1 ? 'CTs' : _gloveSkin.faction_target == 2 ? 'Ts' : _gloveSkin.faction_target == 3 ? 'All Teams' : 'Unknown', inline: true },
                    { name: 'Tier', value: _gloveSkin.tier, inline: true },
                    { name: 'Marketplace', value: _gloveSkin.is_marketable ? `✅` : `❌`, inline: true },
                ]
            case GroupIds.Agent:
                var _agent = item as AgentDefinition;
                return [
                    { name: 'Name', value: _agent.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '), inline: true },
                    { name: 'For Teams', value: _agent.faction_target == 1 ? 'CTs' : _agent.faction_target == 2 ? 'Ts' : _agent.faction_target == 3 ? 'All Teams' : 'Unknown', inline: true },
                    { name: 'Tier', value: _agent.tier, inline: true },
                    { name: 'Marketplace', value: _agent.is_marketable ? `✅` : `❌`, inline: true },
                ]
            case GroupIds.Key:
                var _key = item as KeyDefinition;
                return [
                    { name: 'Name', value: _key.display_name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '), inline: true },
                    { name: 'Marketplace', value: _key.is_marketable ? `✅` : `❌`, inline: true },
                ]
            default:
                return [];
        }
    },
    get_folder_id: (group_id: GroupIds) => {
        if(group_id == GroupIds.WeaponSkin) {
            return true;
        }
        switch(group_id) {
            case GroupIds.Agent:
                return 'agents';
            case GroupIds.Case:
                return 'cases';
            case GroupIds.Currency:
                return 'currencies';
            case GroupIds.GloveSkin:
                return 'gloves';
            default:
                return 'null';
        }
    },
    get_simple_name: (group_id: GroupIds, uppercaseFirstLetter: boolean = false) => {
        if(group_id == GroupIds.WeaponSkin) {
            return uppercaseFirstLetter ? 'Weapon' : 'weapon';
        }
        switch(group_id) {
            case GroupIds.WeaponAnimation:
                return uppercaseFirstLetter ? 'Animation' : 'animation';
            case GroupIds.Emblem:
                return uppercaseFirstLetter ? 'Emblem' : 'emblem';
            case GroupIds.Agent:
                return uppercaseFirstLetter ? 'Agent' : 'agent';
            case GroupIds.Case:
                return uppercaseFirstLetter ? 'Case' : 'case';
            case GroupIds.Currency:
                return uppercaseFirstLetter ? 'Currency' : 'currency';
            case GroupIds.GloveSkin:
                return uppercaseFirstLetter ? 'Gloves' : 'gloves';
            default:
                return 'null';
        }
    },
    get_image_size_buffer: (buf: Buffer): ISizeCalculationResult => {
        return imageSize(buf);
    }
}
