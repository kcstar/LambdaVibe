import { DB } from '../Database';
import { MessageHandler } from '../MessageHandler';

async function onMessage(): Promise<any> {
  const songs = await DB.runQuery('get_songs');

  console.log('songs message');

  return { songs };


}

const schema = {};

export const GetSongsHandler = new MessageHandler(
  'get_songs',
  schema,
  onMessage,
);

export const AddSongHandler = new MessageHandler('add_song', schema, async (obj) => {
  // console.log(`obj = ${JSON.stringify(obj)}`);
  const { songTitle, notes} = obj;
  // console.log('args: ')
  // console.log(`songTitle: ${songTitle}, notes: ${JSON.stringify(notes)}`);

  const data = [songTitle, notes];
  // console.log(`data = ${JSON.stringify(data)}`);
 
  try {
    const result = await DB.runQuery('add_song', ...data);
    // console.log(result);
    return { result };
  } catch (err) {
    return console.error(err);
  }
  
})