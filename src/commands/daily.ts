import { Command, CommandContext, Declare } from "seyfert";
import CooldownSystem from "../systems/CooldownSystem";
import ClientBot from "../structures/ClientBot";
import utils from "../utils";

const CREDITS = 35;

@Declare({
    name: 'daily',
    description: 'Get your daily credits.'
})
export default class DailyCommand extends Command {
    async run(context: CommandContext) {
        let account = await ClientBot._users.findOne({ _id: context.author.id });
        if(!account) {
            await context.editOrReply({
                content: `You need to register to start using these commands! Use \`/register\` to get started.`
            });
            return;
        }

        if(!CooldownSystem.canUse('daily', account.cooldowns.daily)) {
            await context.editOrReply({
                content: `You cannot use this command right now! Come back in **${utils.transform_milliseconds_into_readable_format(
                    account.cooldowns.daily - Date.now(), true
                )}**.`
            });
            return;
        }

        account.cooldowns.daily = CooldownSystem.getNextTimeCanUse('daily');

        account.balance.credits += CREDITS;

        await ClientBot._users.updateOne({
            _id: context.author.id
        }, {
            $set: {
                "cooldowns.daily": account.cooldowns.daily,
                "balance.credits": account.balance.credits
            }
        });

        await context.editOrReply({
            content: `You got your daily **${CREDITS}** credits.`
        });
    }
}
