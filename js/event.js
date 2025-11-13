import { State } from './state.js';
import { Config } from './config.js';
import { Render } from './render.js';
import { Choice } from './choice.js';

export const Event = {
    // 初始事件
    firstScreen() {
        const choices = Choice.dailyChoices();
        Render.show({
            title: '初入修仙界',
            text: '你站在山脚下，天地灵气扑面而来，四周云雾缭绕。远处隐约有妖兽嘶吼，近处似乎有凡人村落。下一步打算做什么？',
            ch: choices
        });
    },
    
    // 日常事件
    daily() {
        this.firstScreen();
    },
    
    // 创建事件
    create() {
        // 检查灵脉沸腾任务链
        const spirit = State.entropy.spirit;
        if (spirit >= 60 && !State.flags.boil1) {
            State.flags.boil1 = 1;
            return this.boilChain1();
        }
        if (spirit >= 80 && State.flags.boil1 === 1) {
            State.flags.boil1 = 2;
            return this.boilChain2();
        }
        
        // 随机日常事件
        Render.show({
            title: '日常历练',
            text: '你在修仙界中继续前行，周围的环境随时间变化。你决定：',
            ch: Choice.dailyChoices()
        });
    },
    
    // 灵脉沸腾任务链1
    boilChain1() {
        const text = '大地突然震动，远处山脉喷薄出浓郁灵气，灵脉喷涌形成璀璨灵池，天地间灵力暴动！';
        const choices = [
            { 
                txt: '潜入池底夺核心', 
                req: { hp: 50 }, 
                eff: { hp: -30, exp: 40, spirit: 15 } 
            },
            { 
                txt: '布阵安抚灵脉', 
                req: { mp: 30, wux: 20 }, 
                eff: { mp: -20, spirit: 10, order: 5 } 
            },
            { 
                txt: '通知附近宗门', 
                eff: { reputation: 20, spirit: -5, morality: 10 } 
            },
            { 
                txt: '就地打坐吸灵气', 
                eff: { exp: 20, spirit: 5, life: 5 } 
            },
            { 
                txt: '录制灵脉异象出售', 
                eff: { bag: '灵脉影像', spirit: -10, qiy: -5 } 
            }
        ];
        Render.show({ title: '灵脉沸腾·初现', text, ch: choices });
    },
    
    // 灵脉沸腾任务链2
    boilChain2() {
        const text = '灵脉核心孕育出「祥瑞灵宠」幼体，其散发的气息引来了众多修士，一场争夺即将爆发！';
        const choices = [
            { 
                txt: '滴血认主', 
                req: { qiy: 60 }, 
                eff: { bag: '祥瑞灵宠', spirit: 10, life: 10 } 
            },
            { 
                txt: '护它周全（战）', 
                eff: {}, 
                act: 'protectPet' 
            },
            { 
                txt: '坐山观虎斗', 
                eff: { spirit: -10, order: -5, reputation: -10 } 
            },
            { 
                txt: '与宗门合作', 
                req: { sect: '天元宗' }, 
                eff: { spirit: 5, morality: 10, bag: '宗门谢礼' } 
            },
            { 
                txt: '拍照跑路', 
                eff: { bag: '灵宠影像', qiy: -10, spirit: -5 } 
            }
        ];
        Render.show({ title: '灵脉沸腾·祥瑞', text, ch: choices });
    }
};
