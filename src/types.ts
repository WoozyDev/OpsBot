export enum Region
{
    EUROPE,
    ASIA,
    NORTH_AMERICA,
    SOUTH_AMERICA
};

export type Inventory =
{
    [groupId: string]: {
        [itemId: string]: number
    }
};

export type MarketUserSellRequest =
{
    id: number;
    item: {
        id: number;
        group_id: number;
        amount: number;
    };
    price: number;
};

export type MarketUserBuyRequest =
{
    id: number;
    item: {
        id: number;
        group_id: number;
        amount: number;
    };
    price: number;
};

export enum MarketState
{
    CLOSED,
    OPEN
}

export type MarketItemSellRequest =
{
    item: {
        id: number;
        group_id: number;
    };
    listings: {
        [listingId: string]: {
            price: number;
            amount: number;
            creator: {
                user_id: string;
                game_id: number;
                ign: string;
            }
            filled?: boolean;
            // user_id
            filled_by?: string;
        };
    }
}

export type MarketItemBuyRequest =
{
    item: {
        id: number;
        group_id: number;
    };
    listings: {
        [listingId: string]: {
            price: number;
            amount: number;
            creator: {
                user_id: string;
                game_id: number;
                ign: string;
            };
            filled?: boolean;
            // user_id
            filled_by?: string;
        };
    }
}

export enum GroupIds
{
    Currency = 1,
    WeaponSkin = 3,
    Emblem,
    WeaponAnimation,
    Case,
    GloveSkin = 8,
    Agent = 12,
    Key
}

export interface ItemDefinition
{
    id: number;
    name: string;
}

export class CurrencyDefinition implements ItemDefinition
{
    asset_id: number;
    display_name: string;
    id: number;
    idasset_reference: string;
    name: string;
}

export class WeaponSkinDefinition implements ItemDefinition
{
    blueprint_gid: number;
    display_header: string;
    display_name: string;
    faction_target: number;
    id: number;
    is_default: boolean;
    is_marketable: boolean;
    name: string;
    series_tag: string;
    tags: string[];
    tier: number;
    trade_tag: string;
    weapon_id: number;
}

export class EmblemDefinition implements ItemDefinition
{
    display_name: string;
    id: number;
    is_default: boolean;
    is_marketable: boolean;
    name: string;
    series_tag: string;
    tags: string[];
    tier: number;
    trade_tag: string;
}

export class WeaponAnimationDefinition implements ItemDefinition
{
    animation_clip_egid: number;
    animation_slot: number;
    audio_clip_egid: number;
    audio_def_id: number;
    display_header: string;
    display_name: string;
    faction_target: number;
    fpaoc_id: number;
    id: number;
    is_default: boolean;
    is_marketable: boolean;
    model_id: number;
    name: string;
    series_tag: string;
    tags: string[];
    tier: number;
    trade_tag: string;
    weapon_id: number;
}

export class CaseDefinition implements ItemDefinition
{
    asset_id: number;
    display_name: string;
    id: number;
    idasset_reference: string;
    is_marketable: boolean;
    localization_key: string;
    name: string;
    opens_with: string[];
    roll_data: {
        item_types: number[];
        drop_chances: number[];
        include_tags: string[];
        exclude_tags: string[];
        amounts: number[];
    }[];
    series_tag: string;
    tags: string[];
    tier: number;
    trade_tag: number;
}

export class GloveSkinDefinition implements ItemDefinition
{
    display_name: string;
    faction_target: number;
    glove_skin_egid: number;
    id: number;
    is_default: boolean;
    is_marketable: boolean;
    name: string;
    series_tag: string;
    tags: string[];
    tier: number;
    trade_tag: string;
}

export class AgentDefinition implements ItemDefinition
{
    agent_egid: number;
    audio_id: number;
    display_name: string;
    faction_target: number;
    id: number;
    is_default: boolean;
    is_marketable: boolean;
    model_id: number;
    name: string;
    preview_id: number;
    series_tag: string;
    skin_id: number;
    tags: string[];
    thumbnail_id: number;
    tier: number;
    trade_tag: string;
}

export class KeyDefinition implements ItemDefinition
{
    display_name: string;
    id: number;
    idasset_reference: string;
    is_marketable: boolean;
    localization_key: string;
    name: string;
    series_tag: string;
    tags: string[];
}

export type Item = ItemDefinition | CurrencyDefinition | WeaponSkinDefinition | EmblemDefinition | WeaponAnimationDefinition | CaseDefinition | GloveSkinDefinition | AgentDefinition | KeyDefinition;
