import { IBMResponse } from "./ibm-response.bean.ts";
import { TweetEntity } from "./tweet.bean.ts";

const server = 'DUMMY'; // Server where IBM's classifier is located
const path = '/model/predict';
const headers = new Headers();
headers.set('Content-Type', 'application/json');

///@ts-ignore
self.addEventListener('message', async function (data: MessageEvent<TweetEntity[]>) {
    console.log('Worker: Message received from main script');
    // console.log(data.data[0])
    for (const entity of data.data) {
        const netResult: IBMResponse = await (await fetch(server + path, { method: 'POST', headers: headers, body: JSON.stringify({ text: [entity.tweet.full_text] }) })).json();
        entity.tweet.classification = netResult.results[0].predictions;
    }
    ///@ts-ignore
    self.postMessage(data.data);
    self.close();
});