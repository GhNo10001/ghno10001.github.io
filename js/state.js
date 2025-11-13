import { Config } from './config.js';
export const State = {
  ...Config.time.start,
  hp:100,maxHp:100,mp:50,maxMp:50,exp:0,lv:0,atk:10,def:5,wux:10,qiy:50,
  root:'五行杂灵根',sect:'散修',bag:[],cd:0,
  entropy:{spirit:0,morality:0,order:0,life:0},
  flags:{}
};
