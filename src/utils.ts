import { User } from "seyfert";
import ClientBot from "./structures/ClientBot"
import { AgentDefinition, CaseDefinition, CurrencyDefinition, EmblemDefinition, GloveSkinDefinition, GroupIds, KeyDefinition, WeaponAnimationDefinition, WeaponSkinDefinition } from "./types";

export default {
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
    }
}
