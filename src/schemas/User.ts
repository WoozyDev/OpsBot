import { Inventory, MarketUserBuyRequest, MarketUserSellRequest, Region } from "../types";

export type User =
{
    _id: string;
    id: string;
    game_id: number;
    ign: string;
    region: Region;
    balance: {
        credits: number;
        tokens: number;
    };
    cooldowns: {
        beg: number;
        daily: number;
        weekly: number;
        monthly: number;
    };
    inventory: Inventory;
    market: {
        sell_requests: MarketUserSellRequest[];
        buy_requests: MarketUserBuyRequest[];
    };
}
