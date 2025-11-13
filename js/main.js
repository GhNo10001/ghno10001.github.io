import { Render } from './render.js';
import { Event }   from './event.js';
import { Choice }  from './choice.js';
import { State }   from './state.js';
import { Config }  from './config.js';

window.Main = {
  startGame(){
    document.getElementById('startScreen').style.display='none';
    document.getElementById('game').style.display='flex';
    Render.init();
    Event.firstScreen();
  },
  ending(reason){
    document.getElementById('endReason').textContent=reason;
    document.getElementById('endScreen').style.display='flex';
  }
};
