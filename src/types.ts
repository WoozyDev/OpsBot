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
        }[];
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
            }
        }[];
    }
}
