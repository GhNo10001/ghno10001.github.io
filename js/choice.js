import { State } from './state.js';
import { Config } from './config.js';
import { Render } from './render.js';
import { Event } from './event.js';
import { Bag } from './bag.js';

export const Choice = {
    // 日常选择项
    dailyChoices() {
        return [
            { 
                txt: '闭关修炼', 
                req: { mp: 10 }, 
                eff: { exp: Math.floor(Math.random() * 11) + 15, mp: -10 } 
            },
            { 
                txt: '四周探索', 
                eff: {}, 
                act: 'explore' 
            },
            { 
                txt: '寻找妖兽', 
                eff: {}, 
                act: 'hunt' 
            },
            { 
                txt: '前往坊市', 
                eff: {}, 
                act: 'market' 
            },
            { 
                txt: '占卜吉凶', 
                req: { mp: 5 }, 
                eff: { qiy: Math.floor(Math.random() * 16) - 5, mp: -5 } 
            }
        ];
    },
    
    // 处理选择
    handle(choice) {
        // 处理行动
        if (choice.act === 'explore') {
            Render.log('你探索到一处灵气点，获得少量修为');
            State.exp += Math.floor(Math.random() * 11) + 5;
            Bag.checkLevelUp();
        }
        
        if (choice.act === 'hunt') {
            const tier = Math.floor(Math.random() * 3) + 1;
            import('./combat.js').then(m => m.Combat.fight(tier));
        }
        
        if (choice.act === 'market') {
            const items = ['疗伤丹', '突破丹', '淬体丹', '毒丹'];
            const randItem = items[Math.floor(Math.random() * items.length)];
            State.bag.push(randItem);
            State.exp += Math.floor(Math.random() * 6) + 5;
            Render.log(`在坊市获得${randItem}和少量修为`, 'safe');
            Bag.checkLevelUp();
        }
        
        if (choice.act === 'protectPet') {
            const tier = Math.floor(Math.random() * 3) + 3;
            import('./combat.js').then(m => 
                m.Combat.fight(tier, () => {
                    State.bag.push('祥瑞灵宠');
                    Render.log('成功保护灵宠，获得认主', 'special');
                })
            );
        }
        
        // 应用效果
        if (choice.eff) {
            Bag.applyEff(choice.eff);
        }
        
        // 事件冷却
        State.cd = Config.eventCD;
        setTimeout(() => Event.create(), 1000 * Config.eventCD);
    }
};
