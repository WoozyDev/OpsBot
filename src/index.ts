import { config } from "dotenv";
config();
import { ParseClient } from "seyfert";
import ClientBot from "./structures/ClientBot";

let client = new ClientBot();

client.start().then(() => client.uploadCommands());

declare module 'seyfert' {
    interface UsingClient extends ParseClient<ClientBot> {}
}
