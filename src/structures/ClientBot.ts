import { Client } from "seyfert";

export default class ClientBot extends Client<true> {
    static instance: ClientBot;
    constructor() {
        super();
        ClientBot.instance = this;
    }
}
