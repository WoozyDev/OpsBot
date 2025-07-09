import { CommandContext, createIntegerOption, Declare, Options, SubCommand } from "seyfert";

const options = {
    amount: createIntegerOption({
        description: 'The amount to play with'
    })
}

@Declare({
    name: 'rockpaperscissors',
    description: 'Play rock, paper, scissors minigame'
})
@Options(options)
export default class RPSSubCmd extends SubCommand {
    async run(context: CommandContext<typeof options>) {

    }
}
