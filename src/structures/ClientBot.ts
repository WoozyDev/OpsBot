import { Collection, Db, MongoClient } from "mongodb";
import { Client } from "seyfert";
import { Market } from "../schemas/Market";
import MarketSystem from "../systems/MarketSystem";
import { GroupIds, Item, MarketState } from "../types";
import { User } from "../schemas/User";
import { readFileSync } from "fs";

export default class ClientBot extends Client<true> {
    static instance: ClientBot;
    static items: {
        id: GroupIds;
        name: string;
        items: Item[];
    }[];
    static db: Db;
    static _users: Collection<User>;
    static market: MarketSystem;
    constructor() {
        super();
        ClientBot.instance = this;
        ClientBot.items = JSON.parse(readFileSync(`./item_definitions.json`, 'utf8'))['item_types'];
        console.log(`Items: Loaded`);

        (new MongoClient(process.env.MONGO_URL, {
            serverApi: {
                strict: false,
                version: "1",
                deprecationErrors: false
            }
        })).connect().then((client) => {
            console.log(`Database: connected`);
            ClientBot.db = client.db('opsbot');
            ClientBot._users = ClientBot.db.collection('users');
            ClientBot.db.collection<Market>('market').findOne().then(async market => {
                if(!market) {
                    market = {
                        _id: "MARKET_DATA",
                        state: MarketState.OPEN,
                        buy_requests: [],
                        sell_requests: []
                    };
                    await ClientBot.db.collection<Market>("market").insertOne(market);
                }
                console.log(`Market: fetched`);
                ClientBot.market = new MarketSystem(market);
                ClientBot.market.init();
                console.log(`Market: Loaded`);
            });
        });
    }
}
