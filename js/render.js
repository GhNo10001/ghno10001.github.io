import { State } from './state.js';
import { Config } from './config.js';
import { Bag } from './bag.js';

export const Render = {
    // 初始化所有界面元素
    init() {
        this.roleCard();
        this.entropyCard();
        this.bagCard();
        this.logCard();
        this.update();
    },
    
    // 角色信息卡片
    roleCard() {
        const card = document.getElementById('roleCard');
        card.innerHTML = `
            <div class="card-title">角色信息</div>
            <div class="stat"><span>境界</span><span class="stat-val" id="level">凡人</span></div>
            <div class="stat"><span>生命</span><span class="stat-val" id="hp">100/100</span></div>
            <div class="bar"><div class="bar-inner" id="hpBar" style="width:100%"></div></div>
            <div class="stat"><span>灵力</span><span class="stat-val" id="mp">50/50</span></div>
            <div class="bar"><div class="bar-inner" id="mpBar" style="width:100%"></div></div>
            <div class="stat"><span>修为</span><span class="stat-val" id="exp">0</span></div>
            <div class="stat"><span>攻击</span><span class="stat-val" id="atk">10</span></div>
            <div class="stat"><span>防御</span><span class="stat-val" id="def">5</span></div>
            <div class="stat"><span>悟性</span><span class="stat-val" id="wux">10</span></div>
            <div class="stat"><span>气运</span><span class="stat-val" id="qiy">50</span></div>
            <div class="stat"><span>灵根</span><span class="stat-val" id="root">五行杂灵根</span></div>
            <div class="stat"><span>宗门</span><span class="stat-val" id="sect">散修</span></div>
        `;
    },
    
    // 熵变信息卡片
    entropyCard() {
        const card = document.getElementById('entropyCard');
        card.innerHTML = `
            <div class="card-title">世界熵变</div>
            <div class="stat"><span>灵脉</span><span class="stat-val" id="spirit">0</span></div>
            <div class="stat"><span>正邪</span><span class="stat-val" id="morality">0</span></div>
            <div class="stat"><span>秩序</span><span class="stat-val" id="order">0</span></div>
            <div class="stat"><span>生机</span><span class="stat-val" id="life">0</span></div>
        `;
    },
    
    // 背包卡片
    bagCard() {
        const card = document.getElementById('bagCard');
        card.innerHTML = `
            <div class="card-title">背包</div>
            <div id="bag">空</div>
        `;
    },
    
    // 日志卡片
    logCard() {
        const card = document.getElementById('logCard');
        card.innerHTML = `
            <div class="card-title">事件日志</div>
            <div class="log" id="log"><span>你穿越到了修仙世界...</span></div>
        `;
    },
    
    // 更新所有界面显示
    update() {
        // 更新角色信息
        this.ui('level', Config.realm[State.lv]);
        this.ui('hp', `${State.hp}/${State.maxHp}`);
        this.bar('hpBar', State.hp / State.maxHp);
        this.ui('mp', `${State.mp}/${State.maxMp}`);
        this.bar('mpBar', State.mp / State.maxMp);
        this.ui('exp', State.exp);
        this.ui('atk', State.atk);
        this.ui('def', State.def);
        this.ui('wux', State.wux);
        this.ui('qiy', State.qiy);
        this.ui('root', State.root);
        this.ui('sect', State.sect);
        
        // 更新熵变信息
        for (const k of Config.entropy.keys) {
            this.ui(k, State.entropy[k]);
        }
        
        // 更新背包
        this.renderBag();
    },
    
    // 更新进度条
    bar(id, percentage) {
        document.getElementById(id).style.width = `${(percentage * 100).toFixed(1)}%`;
    },
    
    // 渲染背包物品
    renderBag() {
        const bagEl = document.getElementById('bag');
        if (!State.bag.length) {
            bagEl.textContent = '空';
            return;
        }
        
        bagEl.innerHTML = '';
        State.bag.forEach((item, index) => {
            const span = document.createElement('span');
            span.textContent = item + ' ';
            
            const useBtn = document.createElement('span');
            useBtn.className = 'item-use';
            useBtn.textContent = '使用';
            useBtn.onclick = () => Bag.useItem(item, index);
            
            span.appendChild(useBtn);
            bagEl.appendChild(span);
        });
    },
    
    // 显示事件内容
    show(data) {
        document.getElementById('eventTitle').textContent = data.title;
        document.getElementById('story').textContent = data.text;
        
        const choicesEl = document.getElementById('choices');
        choicesEl.innerHTML = '';
        
        data.ch.forEach(choice => {
            const div = document.createElement('div');
            div.className = `choice ${this.checkReq(choice.req) ? '' : 'locked'}`;
            div.innerHTML = `
                <div>${choice.txt}</div>
                ${choice.req ? `<div class="req">需求: ${this.formatReq(choice.req)}</div>` : ''}
            `;
            
            if (this.checkReq(choice.req)) {
                div.onclick = () => import('./choice.js').then(m => m.Choice.handle(choice));
            }
            
            choicesEl.appendChild(div);
        });
    },
    
    // 检查需求是否满足
    checkReq(req) {
        if (!req) return true;
        for (const [key, val] of Object.entries(req)) {
            if (State[key] < val) return false;
        }
        return true;
    },
    
    // 格式化需求文本
    formatReq(req) {
        return Object.entries(req).map(([k, v]) => {
            const labels = { hp: '生命', mp: '灵力', qiy: '气运', wux: '悟性' };
            return `${labels[k] || k}: ${v}`;
        }).join('，');
    },
    
    // 输出日志
    log(text, className = '') {
        const logEl = document.getElementById('log');
        logEl.insertAdjacentHTML('beforeend', `<span class="${className}">${text}</span>`);
        logEl.scrollTop = logEl.scrollHeight;
    },
    
    // 更新UI元素文本
    ui(id, value) {
        document.getElementById(id).textContent = value;
    }
};
