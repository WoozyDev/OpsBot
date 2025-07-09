import { ActionRow, AttachmentBuilder, Button, Command, CommandContext, createStringOption, Declare, Embed, Options } from "seyfert";
import ClientBot from "../structures/ClientBot";
import { GroupIds, Item, ItemDefinition, WeaponSkinDefinition } from "../types";
import utils from "../utils";
import { readFileSync } from "fs";
import { ButtonStyle } from "seyfert/lib/types";
import SkinInventoryBuilder from "../builders/SkinInventoryBuilder";

const options = {
    item: createStringOption({
        description: 'View an item by it\'s name (can include weapon name)'
    })
}



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

            for (let weaponName of Object.keys(utils.known_common_weapon_names)) {
                for(let commonWeaponName of utils.known_common_weapon_names[weaponName]) {
                    if (item.toLowerCase().startsWith(commonWeaponName)) {
                        _item = ClientBot.items.find(a => a.id == 3).items.find((a: WeaponSkinDefinition) =>
                            a.display_header.toLowerCase() == weaponName && a.name.toLowerCase().includes(item.slice(commonWeaponName.length + 1, item.length).toLowerCase())
                        );
                        if (_item) {
                            groupId = 3;
                            break;
                        }
                    }
                }
            }

            if(!_item) {
                for (let group of ClientBot.items) {
                    if(item.toLowerCase().startsWith('gloves') ? group.name == 'GloveSkin' : item.toLowerCase().startsWith(group.name.toLowerCase())) {
                        _item = group.items.find(a => a.name.toLowerCase().includes(item.slice((item.toLowerCase().startsWith('gloves') ? 'gloves ' : group.name).length + 1, item.length).toLowerCase()));
                        if(_item) {
                            groupId = group.id;
                            break;
                        }
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

            // // item found
            // if (!userData.inventory[groupId.toString()] || !userData.inventory[groupId.toString()][_item.id.toString()]) {
            //     await context.editOrReply({ content: 'You don\'t have such item in your inventory!' });
            //     return;
            // }

            let i = await (new SkinInventoryBuilder(groupId, _item)).build({format:'png'});

            let att = new AttachmentBuilder({filename:'skin-view.png', resolvable: i, type:'buffer' });

            await context.editOrReply({ files: [att] });
            return;
        }

        let items = [] as [Item, number][];

        for(let _groupId of Object.keys(userData.inventory)) {
            let group_id = parseInt(_groupId) as GroupIds;

            for(let _itemId of Object.keys(userData.inventory[_groupId])) {
                let item_id = parseInt(_itemId);

                let item = ClientBot.items.find(a => a.id == group_id).items.find(a => a.id == item_id);
                if(!item) continue;

                items.push(
                    [ item, group_id ]
                );
            }
        }

        if(items.length == 0) {
            await context.editOrReply({ content: 'You don\'t seem to have any items in your inventory. ' });
            return;
        }

        let pagination = async (pageIndex: number) => {
            let [item, groupId] = items[pageIndex];
            if(!item) return;

            let att = new AttachmentBuilder({ type: 'buffer', filename: 'image.png', resolvable: readFileSync(`./skin_images/${utils.get_folder_id(groupId) == true ? (item as WeaponSkinDefinition).weapon_id : utils.get_folder_id(groupId)}/${item.id}.png`) });

            let embed = new Embed()
                .setTitle(utils.get_item_name(groupId, item.id))
                .setColor("Green")
                .setTimestamp()
                .setFields([
                    { name: `Category`, value: utils.get_category_name(groupId), inline: true },
                    ...(utils.get_inventory_fields(groupId, item) as any[])
                ])
                .setImage(att ? `attachment://image.png` : undefined);

            let components = [
                new ActionRow<Button>()
                    .setComponents([
                        new Button()
                            .setLabel('First')
                            .setCustomId('first')
                            .setDisabled(pageIndex == 0)
                            .setStyle(ButtonStyle.Secondary),
                        new Button()
                            .setLabel('Previous')
                            .setCustomId('prev')
                            .setDisabled(pageIndex == 0)
                            .setStyle(ButtonStyle.Secondary),
                        new Button()
                            .setLabel('Stop')
                            .setCustomId('stop')
                            .setStyle(ButtonStyle.Danger),
                        new Button()
                            .setLabel('Next')
                            .setCustomId('next')
                            .setDisabled(pageIndex == items.length-1)
                            .setStyle(ButtonStyle.Danger),
                        new Button()
                            .setLabel('Last')
                            .setCustomId('last')
                            .setDisabled(pageIndex == items.length-1)
                            .setStyle(ButtonStyle.Danger)
                    ])
            ]

            return await context.editOrReply({ embeds: [embed], files: [att], components }, true);
        }

        let pageIndex = 0;
        let msg = await pagination(pageIndex);
        msg.createComponentCollector({
                filter: (i) => i.user.id == context.author.id,
                timeout: 5 * 60 * 1000, // 5 mins
                onStop: (reason, refresh) => {
                    if(reason == 'timeout') {
                        msg.edit({components:[]});
                    }
                }
            }).run(['first', 'prev', 'next', 'last'], (i, stop, refresh) => {
                switch(i.customId) {
                    case 'first':
                        pagination(0);
                        break;
                    case 'prev':
                        pagination(pageIndex--);
                        break;
                    case 'stop':
                        stop('stop', refresh);
                        msg.edit({components:[]});
                        break;
                    case 'next':
                        pagination(pageIndex++);
                        break;
                    case 'last':
                        pagination(items.length-1);
                        break;
                }
            })
    }
}
