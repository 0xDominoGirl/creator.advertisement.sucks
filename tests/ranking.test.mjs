import assert from 'node:assert/strict';
import {rankCreators,rankTarget} from '../lib/ranking.ts';

const a={id:'a',category:'AI',votes:428,listed:'2026-01-01'},b={id:'b',category:'AI',votes:386,listed:'2026-01-02'};
assert.equal(rankTarget([]).targetVotes,1);
assert.equal(rankTarget([a,b]).targetVotes,429);
assert.equal(rankTarget([a,b],'b').votesNeeded,43);
assert.equal(rankTarget([a,b],'a').votesNeeded,0);
assert.equal(rankTarget([a,b],'a').isLeader,true);
assert.equal(rankTarget([a,{...b,votes:428}],'b').votesNeeded,1);
assert.equal(rankCreators([b,a,{...b,id:'c',votes:429}])[0].id,'c');
assert.equal(rankCreators([{...b,votes:428},a])[0].id,'a');
assert.equal(rankTarget([{...a,votes:0}]).targetVotes,1);
assert.equal(rankTarget([{...a,votes:1000000}]).targetVotes,1000001);
console.log('Ranking: empty board, thresholds, ties, leader and large totals passed.');
