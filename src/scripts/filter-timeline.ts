import type * as Misskey from 'misskey-js';
const TIME2000 = 946684800000;
const XTIME = (new Date('Nov 4, 2022 00:00:00 GMT+00:00')).getTime() - TIME2000;

function aidToNum(aid: string) {
  return parseInt(aid.slice(0,8), 36);
}

export function shouldShowNote(note: Misskey.entities.Note) {
    return aidToNum(note.userId) < XTIME
}

export function filterNote(note: Misskey.entities.Note): Misskey.entities.Note | null {
  return shouldShowNote(note) ? note : null;
}
