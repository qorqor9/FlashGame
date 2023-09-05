'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBuilder,  Reason } from './game.js';

const CARROT_COUNT = 20;
const BUG_COUNT = 15;
const GAME_DURATION_SEC = 15;

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
.withGameDuration(10)
.withCarrotCount(5)
.withBugCount(10)
.build();

game.setGameStopListener((reason) => {
    console.log(reason);
    let message;
    switch(reason) {
        case Reason.cancel:
            message = 'Replay❓';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WON 🎉😊';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST ☠😝';
            sound.playBug();
            break;
            default:
                throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => {
    game.start();
})

