import { MarketItemBuyRequest, MarketItemSellRequest, MarketState } from "../types";

export type Market =
{
    _id: string;
    state: MarketState;
    sell_requests: MarketItemSellRequest[];
    buy_requests: MarketItemBuyRequest[];
}
