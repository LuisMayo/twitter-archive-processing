/** Copyright Luis Mayo 2020 read LICENSE file
 * This script process a JSON file of TweetEntities and checks them against IBM's MAX toxic classifier to check hate or toxicity, appending the info to said TweetEntity and re-saving the JSON file.
 * This information may be alter used by the filterer.ts
 */
import { TweetEntity } from "./tweet.bean.ts";

const workers = 128; // Number of threads to process the data
const file = './output.json';

let doneWorkers = 0;
const entities: TweetEntity[] = JSON.parse(await Deno.readTextFile(file));
const arrLength = Math.floor(entities.length /  workers);
const newEntities: TweetEntity[] = [];
for (let i = 0; i < workers; i++) {
    const worker = new Worker(new URL("classi-worker.ts", import.meta.url).href, {type: 'module'});
	///@ts-ignore
    worker.addEventListener('message', (arr: MessageEvent) => {
        newEntities.push(...arr.data);
        doneWorkers++;
        if (doneWorkers >= workers) {
            Deno.writeTextFileSync(file, JSON.stringify(newEntities));
            Deno.exit(0);
        }
    });
    worker.postMessage(entities.slice(i * arrLength, i < workers -1 ? (i+1) * arrLength : undefined));
}
