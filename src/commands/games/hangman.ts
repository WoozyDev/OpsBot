import { CommandContext, createIntegerOption, Declare, Options, SubCommand } from "seyfert";

const options = {
    amount: createIntegerOption({
        description: 'The amount to play with'
    })
}

@Declare({
    name: 'hangman',
    description: 'Play hangman minigame'
})
@Options(options)
export default class HangmanSubCmd extends SubCommand {
    async run(context: CommandContext<typeof options>) {

    }
}
