import { EmbedColors } from "seyfert/lib/common";
import { Market } from "../schemas/Market";
import ClientBot from "../structures/ClientBot";
import utils from "../utils";
import { User } from "../schemas/User";

export default class MarketSystem {
    cache: Market;
    private interval: NodeJS.Timeout;
    constructor(_cache: Market) {
        this.cache = _cache;
    }

    doInterval() {
        this.cache.sell_requests.forEach(request => {
            for (let listingId of Object.keys(request.listings)) {
                let listing = request.listings[listingId];
                if (listing.filled) {
                    ClientBot._users.findOne({
                        id: listing.creator.user_id
                    }).then(userData => {
                        userData.balance.credits += listing.price;
                        ClientBot._users.updateOne({
                            id: listing.creator.user_id
                        }, {
                            $set: {
                                "balance.credits": userData.balance.credits
                            }
                        }).then((res) => console.log(`Balance modified`, res)).catch((err) => console.log(`Couldn't modify balance`, err));
                    }).catch((err) => console.log(`Couldn't find user data`, err));
                    ClientBot._users.findOne({
                        id: listing.filled_by
                    }).then(userData => {
                        if (!userData.inventory[request.item.group_id]) userData.inventory[request.item.group_id] = {};
                        userData.inventory[request.item.group_id][request.item.id] = (userData.inventory[request.item.group_id][request.item.id] ?? 0) + 1;

                        ClientBot._users.updateOne({
                            id: listing.creator.user_id
                        }, {
                            $set: {
                                "inventory": userData.inventory
                            }
                        }).then((res) => console.log(`Inventory modified`, res)).catch((err) => console.log(`Couldn't modify Inventory`, err));
                    }).catch((err) => console.log(`Couldn't find user data`, err));
                    // announce the creator through DMs
                    utils.get_discord_user(listing.creator.user_id).then(user => {
                        user.dm().then(channel => {
                            channel.messages.write({
                                embeds: [{
                                    title: `Your request has been filled`,
                                    description: `Your request for **${utils.get_item_name(request.item.group_id, request.item.id)}${listing.amount == 1 ? '' : ` x${listing.amount}`}** has been filled.\nYou have received **${listing.price}** credits.`,
                                    color: EmbedColors.Green
                                }]
                            }).catch(() => console.log(`Couldn't DM the user.`));
                            listing = null;
                        }).catch(() => console.log(`Couldn't get hold of the DM Channel.`));
                    }).catch(() => console.log(`Couldn't fetch the user.`));

                    delete request.listings[listingId];
                    listing = null;
                    console.log('Deleted listing');
                }
            }
            if (Object.keys(request.listings).length == 0) {
                this.cache.sell_requests.splice(
                    this.cache.sell_requests.indexOf(this.cache.sell_requests.find(a => a.item.id == request.item.id)),
                    1
                );
                console.log(`Remove request from memory`);
                request = null;
            }
        })
        this.cache.buy_requests.forEach(request => {
            for (let listingId of Object.keys(request.listings)) {
                let listing = request.listings[listingId];
                if (listing.filled) {
                    ClientBot._users.findOne({
                        id: listing.creator.user_id
                    }).then(userData => {
                        if (!userData.inventory[request.item.group_id]) userData.inventory[request.item.group_id] = {};
                        userData.inventory[request.item.group_id][request.item.id] = (userData.inventory[request.item.group_id][request.item.id] ?? 0) + 1;
                        ClientBot._users.updateOne({
                            id: listing.creator.user_id
                        }, {
                            $set: {
                                "inventory": userData.inventory
                            }
                        }).then((res) => console.log(`Inventory modified`, res)).catch((err) => console.log(`Couldn't modify Inventory`, err));
                    }).catch((err) => console.log(`Couldn't find user data`, err));

                    // announce the creator through DMs
                    utils.get_discord_user(listing.creator.user_id).then(user => {
                        user.dm().then(channel => {
                            channel.messages.write({
                                embeds: [{
                                    title: `Your buy request has been filled`,
                                    description: `Your buy request for **${utils.get_item_name(request.item.group_id, request.item.id)}${listing.amount == 1 ? '' : ` x${listing.amount}`}** has been filled.\nYou have received the specified skin.`,
                                    color: EmbedColors.Green
                                }]
                            }).catch(() => console.log(`Couldn't DM the user.`));
                            listing = null;
                        }).catch(() => console.log(`Couldn't get hold of the DM Channel.`));
                    }).catch(() => console.log(`Couldn't fetch the user.`));

                    delete request.listings[listingId];
                    listing = null;
                    console.log('Deleted listing');
                }
            }
            if (Object.keys(request.listings).length == 0) {
                this.cache.sell_requests.splice(
                    this.cache.sell_requests.indexOf(this.cache.sell_requests.find(a => a.item.id == request.item.id)),
                    1
                );
                console.log(`Remove request from memory`);
                request = null;
            }
        })
    }

    init() {
        this.interval = setInterval(() => this.doInterval(), 5 * 60 * 1000); // 5 mins
        console.log(`MarketSystem initialized`);
    }

    restartInterval() {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.doInterval(), 5 * 60 * 1000); // 5 mins
        console.log(`Market: Interval restarted`);
    }
}
