import { Command, CommandContext, createStringOption, Declare, Embed, Options } from "seyfert";
import ClientBot from "../structures/ClientBot";
import { ItemDefinition, WeaponSkinDefinition } from "../types";
import utils from "../utils";

const options = {
    item: createStringOption({
        description: 'View an item by it\'s name (can include weapon name)'
    })
}

const known_common_weapon_names = [
    'gsr', 'rev', 'mr', 'mr96', 'revolver', 'gsr1911', 'gsr 1911', 'p250', 'duallies', 'mtx', 'dual mtx',
    'deagle', 'desert eagle', 'xd', 'xd.45', 'xd .45',
    'mp5', 'mp7', 'mpx', 'vector', 'p90',
    'fp6', 'super90', 'super 90', 'ksg', 'm1887', 'winchester',
    'sa58', 'dsa58', 'ar15', 'ar-15', 'm4', 'ak47', 'ak-47', 'hk417', 'hk', 'scar-h', 'scarh', 'scar', 'aug', 'sg 551', 'sg', 'sg551',
    'trg', 'trg22', 'm14', 'svd', 'sniper', 'uratio',
    'knife', 'bali', 'balisong', 'tanto', 'remix', 'karambit', 'short sword', 'sword',
    'dragonmourn', 'dragon', 'dragon sword'
];

@Declare({
    name: 'inventory',
    description: 'View inventory and sell items.'
})
@Options(options)
export default class InventoryCommand extends Command {
    async run(context: CommandContext<typeof options>) {
        await context.deferReply();

        let item = context.options.item as string;

        let userData = await ClientBot._users.findOne({ id: context.author.id });
        if (!userData) {
            await context.editOrReply({ content: 'You\'re not registered! Use \`/register\` command to be able to view your inventory.' });
            return;
        }

        if (item) {
            let groupId = 0;
            let _item = null as ItemDefinition;

            for (let commonWeaponName of known_common_weapon_names) {
                if (item.toLowerCase().startsWith(commonWeaponName)) {
                    console.log(commonWeaponName, item.slice(commonWeaponName.length + 1, item.length));
                    _item = ClientBot.items.find(a => a.id == 3).items.find((a: WeaponSkinDefinition) =>
                        a.display_header.toLowerCase().includes(commonWeaponName) && a.name.toLowerCase().includes(item.slice(commonWeaponName.length + 1, item.length).toLowerCase())
                    );
                    if (!_item) {
                        groupId = 3;
                        break;
                    }
                }
            }

            if (!_item) {
                for (let group of ClientBot.items) {
                    _item = group.items.find(a => a.name.toLowerCase().includes(item.toLowerCase()));
                    if (_item) {
                        groupId = group.id;
                        break;
                    }
                }
            }

            if (!_item) {
                await context.editOrReply({ content: `No item found matching '${item}'. Please check the name and try again.` });
                return;
            }

            // item found
            if (!userData.inventory[groupId.toString()] || !userData.inventory[groupId.toString()][_item.id.toString()]) {
                await context.editOrReply({ content: 'You don\'t have such item in your inventory!' });
                return;
            }

            let embed = new Embed()
                .setTitle(utils.get_item_name(groupId, _item.id))
                .setColor("Green")
                .setTimestamp()
                .setFields([
                    { name: `Category`, value: utils.get_category_name(groupId) }
                ])
                .setFooter({ text: `` });

            await context.editOrReply({ embeds: [embed] });
            return;
        }

    }
}
