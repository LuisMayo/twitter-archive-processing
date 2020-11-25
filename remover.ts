/** Copyright Luis Mayo 2020 read LICENSE file
 * This script removes all the tweets found in a remove.json file which contains an array of strings containing the IDs
 */
import Ask from 'https://deno.land/x/ask@1.0.5/mod.ts';
import { TwitterApi } from 'https://raw.githubusercontent.com/LuisMayo/deno_twitter_api/patchtowork/mod.ts';

export interface Credentials {
    consumerApiKey: string,
    consumerApiSecret: string,
    accessToken: string,
    accessTokenSecret: string
}
let keys: Credentials;

try {
    keys = JSON.parse(await Deno.readTextFile('./keys.json'));
} catch (e) {
    const ask = new Ask();
    keys = await ask.prompt([
        {
            name: 'consumerApiKey',
            type: 'input',
            message: 'consumerApiKey:'
        },
        {
            name: 'consumerApiSecret',
            type: 'input',
            message: 'consumerApiSecret:'
        },
        {
            name: 'accessToken',
            type: 'input',
            message: 'accessToken:'
        },
        {
            name: 'accessTokenSecret',
            type: 'input',
            message: 'accessTokenSecret:'
        }
    ]) as Credentials;
    Deno.writeTextFileSync('./keys.json', JSON.stringify(keys));
}


// See correct format for keys in twitterApi.ts
const file = './remove.json';
let twitterApi = new TwitterApi(keys);
const toDelete: string[] = JSON.parse(await Deno.readTextFile(file));
let pendingRemoval: (string | null)[] = [...toDelete];
let i = 0 ;
try {
    for (const id of toDelete) {
        const response = await twitterApi.request('POST' ,"statuses/destroy/" + id + ".json", {});
        // const response = await twitterApi.request('POST' ,"favorites/destroy", {id: id});
        if (response.status !== 200 && response.status !== 404 && response.status !== 403) {
            console.log(response);
            throw new Error(response.status.toString());
        } else {
            pendingRemoval[i] = null;
        }
        i++;
    }
} catch (e){
    console.log(e);
} finally {
    Deno.writeTextFileSync(file, JSON.stringify(pendingRemoval.filter(item => item != null)));
}


