/** Copyright Luis Mayo 2020 read LICENSE file
 * This script will get likes.json and output it as an string array with the IDs of the liked tweets
 */
const entities: {like: {tweetId: string}}[] = JSON.parse(await Deno.readTextFile('./like.json'));
await Deno.writeTextFile('./likeid.json', JSON.stringify(entities.map(entity => entity.like.tweetId)));