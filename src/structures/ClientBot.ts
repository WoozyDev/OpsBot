import { Collection, Db, MongoClient } from "mongodb";
import { Client } from "seyfert";
import { Market } from "../schemas/Market";
import MarketSystem from "../systems/MarketSystem";
import { GroupIds, Item } from "../types";
import { User } from "../schemas/User";

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
            ClientBot.db.collection('market').findOne().then((market: any) => {
                console.log(`Market: fetched`);
                ClientBot.market = new MarketSystem(market);
                ClientBot.market.init();
            });
        });
    }
}
