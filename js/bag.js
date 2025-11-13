import { State } from './state.js';
import { Config } from './config.js';
import { Render } from './render.js';

export const Bag = {
  applyEff(e){
    for(let k in e){
      if(k==='bag'){State.bag.push(e[k]);Render.log(`获得 ${e[k]}`);}
      if(k==='exp'){State.exp+=e[k];Render.log(`修为 +${e[k]}`,'special');}
      if(k==='hp'){State.hp=Math.min(State.maxHp,State.hp+e[k]);}
      if(k==='mp'){State.mp=Math.min(State.maxMp,State.mp+e[k]);}
      if(k==='qiy'){State.qiy=Math.max(0,Math.min(100,State.qiy+e[k]));}
      if(Config.entropy.keys.includes(k))State.entropy[k]+=e[k];
    }Render.update();
  }
};
