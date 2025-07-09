import { Command, CommandContext, Declare } from "seyfert";
import ClientBot from "../structures/ClientBot";
import CooldownSystem from "../systems/CooldownSystem";
import utils from "../utils";

const CREDITS = 100;

@Declare({
    name: 'weekly',
    description: 'Get your weekly credits.'
})
export default class WeeklyCommand extends Command {
    async run(context: CommandContext) {
        let account = await ClientBot._users.findOne({ _id: context.author.id });
        if(!account) {
            await context.editOrReply({
                content: `You need to register to start using these commands! Use \`/register\` to get started.`
            });
            return;
        }

        if(!CooldownSystem.canUse('weekly', account.cooldowns.weekly)) {
            await context.editOrReply({
                content: `You cannot use this command right now! Come back in **${utils.transform_milliseconds_into_readable_format(
                    account.cooldowns.weekly - Date.now(), true
                )}**.`
            });
            return;
        }

        account.cooldowns.weekly = CooldownSystem.getNextTimeCanUse('weekly');

        account.balance.credits += CREDITS;

        await ClientBot._users.updateOne({
            _id: context.author.id
        }, {
            $set: {
                "cooldowns.weekly": account.cooldowns.weekly,
                "balance.credits": account.balance.credits
            }
        });

        await context.editOrReply({
            content: `You got your weekly **${CREDITS}** credits.`
        });
    }
}
