import { createStringOption } from "seyfert";
import { Command, CommandContext, Declare, Options } from "seyfert";
import { Region } from "../types";
import { MessageFlags } from "seyfert/lib/types";
import ClientBot from "../structures/ClientBot";
import { User } from "../schemas/User";
import GameAPI, { ResponseCode } from "../structures/GameAPI";

const options = {
    ign: createStringOption({
        description: 'The IGN which you\'ll be using with the bot.',
        required: true
    }),
    region: createStringOption({
        description: 'The region which you\'ll be using with the bot.',
        required: true,
        choices: Object.values(Region).filter(a => typeof a == 'string').map(a => ({
            name: (a.includes('_') ? a.split('_').join(' ') : a).split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' '),
            value: (a.includes('_') ? a.split('_').join(' ') : a).split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(' ')
        }))
    })
}

@Declare({
    name: 'register',
    description: 'Register to start using the bot.'
})
@Options(options)
export default class RegisterCommand extends Command {
    async run(context: CommandContext<typeof options>) {
        let ign = context.options.ign as string;
        let regionStr = context.options.region as string;
        let regionInt = Region[regionStr.toUpperCase().split(' ').join('_')] as number;
        console.log(regionStr, regionInt);

        if(regionInt == undefined) {
            await context.editOrReply({
                content: `You have specified a invalid region!`,
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        await context.deferReply();

        let existingAccount = await ClientBot._users.findOne({
            _id: context.author.id
        });

        if(existingAccount) {
            await context.editOrReply({
                content: `You have already registered!`
            });
            return;
        }

        let [response, code] = await GameAPI.search([ign]);
        if(code != ResponseCode.OK) {
            await context.editOrReply({
                content: `There's no such account with that ign!`
            });
            return;
        }


        let existingUser = await ClientBot._users.findOne({
            game_id: response[0].basicInfo.userID
        });

        if(existingUser) {
            await context.editOrReply({
                content: `There's already someone registered with that ign!`,
            });
            return;
        }

        let user = {
            _id: context.author.id,
            id: context.author.id,
            game_id: response[0].basicInfo.userID,
            ign: response[0].basicInfo.name,
            balance: {
                credits: 200,
                tokens: 0
            },
            cooldowns: {
                beg: 0,
                daily: 0,
                monthly: 0,
                weekly: 0
            },
            inventory: {},
            market: {},
            region: regionInt
        } as User;

        await ClientBot._users.insertOne(user);

        await context.editOrReply({
            content: `You have successfully registered! You can start buying cases or start playing Ranked, TDM, Defuse.`
        });
    }
}
