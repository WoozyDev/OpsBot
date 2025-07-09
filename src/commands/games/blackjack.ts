import { CommandContext, createIntegerOption, Declare, Options, SubCommand } from "seyfert";

const options = {
    amount: createIntegerOption({
        description: 'The amount to play with'
    })
}

@Declare({
    name: 'blackjack',
    description: 'Play blackjack minigame'
})
@Options(options)
export default class BJSubCmd extends SubCommand {
    async run(context: CommandContext<typeof options>) {

    }
}
