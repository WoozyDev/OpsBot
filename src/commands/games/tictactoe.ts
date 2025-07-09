import { CommandContext, createIntegerOption, Declare, Options, SubCommand } from "seyfert";

const options = {
    amount: createIntegerOption({
        description: 'The amount to play with'
    })
}

@Declare({
    name: 'tictactoe',
    description: 'Play TicTacToe minigame'
})
@Options(options)
export default class TTTSubCmd extends SubCommand {
    async run(context: CommandContext<typeof options>) {

    }
}
