/** Copyright Luis Mayo 2020 read LICENSE file
 * This script serves as a playground to gather information and/or save an ID list of tweets you may want to remove
 */
import { FollowerEntity, FollowingEntity, User } from "./follow.bean.ts";
import { TweetEntity } from "./tweet.bean.ts";

// Load Data from JSON
const entities: TweetEntity[] = JSON.parse(await Deno.readTextFile('./tweet.json'));
const tweets = entities.map(entity => {
    const tweet = entity.tweet;
    tweet.isRT = tweet.full_text.startsWith('RT @')
    return tweet;
});
// const followers = (JSON.parse(await Deno.readTextFile('./follower.json')) as FollowerEntity[]).map(entity => entity.follower);
// const following= (JSON.parse(await Deno.readTextFile('./following.json')) as FollowingEntity[]).map(entity => entity.following);
// //

// Create different views for the dataset
const onlyRT = tweets.filter(tweet => tweet.isRT);
const onlyMine = tweets.filter(tweet => !tweet.isRT);
const onlyTweets = onlyMine.filter(tweet => tweet.in_reply_to_user_id_str == null);
const responses = onlyMine.filter(tweet => tweet.in_reply_to_user_id_str != null);
// const followersIDs = followers.map(user => user.accountId);
// const followingIDs = following.map(user => user.accountId);
const onlyClassified = tweets.filter(tweet => tweet.classification != null);

// Filter tweets
const oldRT = onlyRT.filter(tweet => new Date(tweet.created_at).getFullYear() <= 2019);
// const oldResponsesNofriends = oldResponses.filter(tweet => !followersIDs.includes(tweet.in_reply_to_user_id_str || '') && !followingIDs.includes(tweet.in_reply_to_user_id_str || ''));
// const baddie = onlyClassified.filter(tweet =>
//     tweet.classification?.identity_hate as number > 0.6 ||
//     tweet.classification?.insult as number > 0.6 ||
//     tweet.classification?.severe_toxic as number > 0.6 ||
//     tweet.classification?.threat as number > 0.6)

// Save JSON to delete
// Deno.writeTextFileSync('./output.json', JSON.stringify(onlyMine.map(tweet => {
//     return {tweet};
// })));

// Deno.writeTextFileSync('./baddie.json', JSON.stringify(baddie));
Deno.writeTextFileSync('./delete.json', JSON.stringify(oldRT.map(tweet => tweet.id_str)));
console.log('oldRT', oldRT.length);