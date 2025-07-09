import { Command, CommandContext, Declare } from "seyfert";
import CooldownSystem from "../systems/CooldownSystem";
import ClientBot from "../structures/ClientBot";
import utils from "../utils";

const CREDITS = 150;

@Declare({
    name: 'monthly',
    description: 'Get your monthly credits.'
})
export default class MonthlyCommand extends Command {
    async run(context: CommandContext) {
        let account = await ClientBot._users.findOne({ _id: context.author.id });
        if(!account) {
            await context.editOrReply({
                content: `You need to register to start using these commands! Use \`/register\` to get started.`
            });
            return;
        }

        if(!CooldownSystem.canUse('monthly', account.cooldowns.monthly)) {
            await context.editOrReply({
                content: `You cannot use this command right now! Come back in **${utils.transform_milliseconds_into_readable_format(
                    account.cooldowns.monthly - Date.now(), true
                )}**.`
            });
            return;
        }

        account.cooldowns.monthly = CooldownSystem.getNextTimeCanUse('monthly');

        account.balance.credits += CREDITS;

        await ClientBot._users.updateOne({
            _id: context.author.id
        }, {
            $set: {
                "cooldowns.monthly": account.cooldowns.monthly,
                "balance.credits": account.balance.credits
            }
        });

        await context.editOrReply({
            content: `You got your monthly **${CREDITS}** credits.`
        });
    }
}
