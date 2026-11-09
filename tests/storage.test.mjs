import {test} from 'node:test';import assert from 'node:assert/strict';
import {read,write,parseImport,KEY} from '../src/storage.mjs';
const p={id:'s1',title:'无线',subtitle:'测试',hours:'2 h',goal:'目标',hardware:'硬件',prereq:'前置',notes:'保留笔记',track:'STM32',status:'进行中',stage:1,difficulty:2,tasks:[{text:'验收',done:true}]};
test('save and reload preserves order, notes, task state',()=>{const m=new Map(),s={getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)};const data=[{...p,id:'s2'},p];write(s,data);assert.deepEqual(read(s,[]),data)});
test('accept original Site export and state API envelope',()=>{assert.deepEqual(parseImport(JSON.stringify([p])),[p]);assert.deepEqual(parseImport(JSON.stringify({data:[p],revision:3})),[p])});
test('reject malformed and duplicate records',()=>{assert.throws(()=>parseImport('[{}]'));assert.throws(()=>parseImport(JSON.stringify([p,p])))});
test('corrupted data remains untouched',()=>{let value='invalid';assert.throws(()=>read({getItem:()=>value},[]));assert.equal(value,'invalid')});
test('write failure is not silently swallowed',()=>{assert.throws(()=>write({setItem(){throw Error('quota')}},[p]))});
