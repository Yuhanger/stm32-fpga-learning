export const KEY='yuhang-embedded-lab:v1';
export function validate(data){
 if(!Array.isArray(data)||data.length>200)throw new Error('项目数据格式错误（最多 200 个项目）');
 const ids=new Set();for(const p of data){
 if(!p||['id','title','subtitle','hours','goal','hardware','prereq','notes'].some(k=>typeof p[k]!=='string')||!['STM32','FPGA'].includes(p.track)||!['未开始','进行中','已完成'].includes(p.status)||![1,2,3,4].includes(p.stage)||![1,2,3,4,5].includes(p.difficulty)||!Array.isArray(p.tasks)||p.tasks.some(t=>!t||typeof t.text!=='string'||typeof t.done!=='boolean')||ids.has(p.id))throw new Error('文件包含无效项目或重复编号');ids.add(p.id);
 }return data;
}
export function parseImport(text){if(text.length>2000000)throw new Error('文件过大');const x=JSON.parse(text);return validate(Array.isArray(x)?x:x.data);}
export function read(storage,defaults){const text=storage.getItem(KEY);return text===null?defaults:parseImport(text);}
export function write(storage,data){storage.setItem(KEY,JSON.stringify(validate(data)));}
