import { getDb } from '../../../db';
import { workspace } from '../../../db/schema';
import { eq, sql } from 'drizzle-orm';
export async function GET(){const rows=await getDb().select().from(workspace).where(eq(workspace.id,'owner'));return Response.json(rows[0]?{data:JSON.parse(rows[0].data),revision:rows[0].revision}:{data:null,revision:0});}
export async function PUT(req:Request){
if(req.headers.get('origin') && new URL(req.url).origin!==req.headers.get('origin'))return new Response('Forbidden',{status:403});
const body=await req.json() as {data:unknown[],revision:number}; if(!Array.isArray(body.data)||body.data.length>200||JSON.stringify(body.data).length>1000000)return new Response('Invalid data',{status:400});
const db=getDb(); await db.insert(workspace).values({id:'owner',data:'[]',revision:0}).onConflictDoNothing();
const rows=await db.update(workspace).set({data:JSON.stringify(body.data),revision:sql`${workspace.revision}+1`}).where(sql`${workspace.id}='owner' AND ${workspace.revision}=${body.revision}`).returning();
return rows.length?Response.json({revision:rows[0].revision}):Response.json({error:'另一个窗口已更新，请刷新后重试。'},{status:409});}
