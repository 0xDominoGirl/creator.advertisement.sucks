export type RankedEntry = {id:string; category:string; votes:number; listed:string};
/** Ties keep the earlier listing first; a challenger must exceed the leader. */
export function rankCreators<T extends RankedEntry>(entries:T[]) {
 return [...entries].sort((a,b)=>b.votes-a.votes || Date.parse(a.listed)-Date.parse(b.listed) || a.id.localeCompare(b.id));
}
export function rankTarget(entries:RankedEntry[], ownId?:string) {
 const ranked=rankCreators(entries), leader=ranked[0], own=ranked.find(c=>c.id===ownId);
 const targetVotes=(leader?.votes??0)+1;
 return {leaderId:leader?.id??null, leaderVotes:leader?.votes??0, targetVotes,
  votesNeeded:own?.id===leader?.id&&own?0:Math.max(1,targetVotes-(own?.votes??0)),
  isLeader:Boolean(own&&own.id===leader?.id)};
}
