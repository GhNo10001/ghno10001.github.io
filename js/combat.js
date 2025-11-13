import { State } from './state.js';
import { Config } from './config.js';
import { Render } from './render.js';

export const Combat = {
  fight(tier,callback=null){
    const bat=Config.beastAtk(tier),bdef=Config.beastDef(tier),bexp=Config.beastExp(tier);
    const pdmg=Math.max(1,State.atk-bdef),bdmg=Math.max(1,bat-State.def);
    let pHp=State.hp,bHp=bat*3;
    while(pHp>0&&bHp>0){bHp-=pdmg;if(bHp<=0)break;pHp-=bdmg;}
    if(pHp<=0){State.hp=0;Render.log('你被妖兽击杀...','danger');Render.update();return;}
    State.hp=pHp;State.exp+=bexp;Render.log(`击败 ${tier} 阶妖兽，获得修为 ${bexp}`,'special');
    if(callback)callback();
  }
};
