import { Command, Declare, Options } from "seyfert";
import BJSubCmd from "./blackjack";
import HangmanSubCmd from "./hangman";
import RPSSubCmd from "./rockpaperscissors";
import TTTSubCmd from "./tictactoe";

@Declare({
    name: 'games',
    description: 'Games-related commands'
})
@Options([BJSubCmd, HangmanSubCmd, RPSSubCmd, TTTSubCmd])
export default class GamesCommand extends Command {}
