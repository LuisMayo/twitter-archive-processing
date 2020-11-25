# Twitter archive proccessing scripts

This project serves as a collection of Deno scripts to better work with the Twitter archive/file that can be downloaded from Twitter settings page.
This project **is not intended for end users** and instead may serve as a convenient half-written scripts that a developer can fiddle with and adapt to their own needs.

## Getting Started - Development

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

 - [Deno](https://deno.land/#installation): Typescript runtime
 - A Twitter File/Archive with all your Twitter information. You can ask Twitter for it on your settings page
 - In case you want to check your tweets for toxicity or hate speech you'll need a server/kubernetes/whatever executing [IBM's MAX-Toxic-Comment-Classifier](https://github.com/IBM/MAX-Toxic-Comment-Classifier)
 - In case you want to delete or un-fav tweets you'll need OAuth twitter credentials gathered at the [Twitter developer portal](https://developer.twitter.com/en/portal/projects-and-apps)

### Preparing the Twitter File
 Twitter file is a zip file containing various JS files. In order for this scripts to work you'll have to convert them to JSON files. This is as easy as openning them and removing the first part of the file which look like this `window.YTD.account.part0 = `. Saving the resulting file as a JSON should work.
 In case a resource is split in multiple files you shall manually merge all the JSON arrays.

### Script enumeration
  1. classifier.ts: This script process a JSON file of TweetEntities and checks them against IBM's MAX toxic classifier to check hate or toxicity, appending the info to said TweetEntity and re-saving the JSON file. It needs a JSON file derived from `tweets.js`
  2. filterer.ts: This script serves as a playground to gather information and/or save an IDs list of tweets you may want to remove. It needs a JSON file derived from `tweets.js`
  3. like-to-id.ts: This script will get JSON file derived from `likes.js` and output it as an string array with the IDs of the liked tweets.
  4. remover.ts: This script removes all the tweets found in a remove.json file which contains an array of strings containing the IDs. It can also un-fav them.



## Contributing
Since this is a tiny project we don't have strict rules about contributions. Just open a Pull Request to fix any of the project issues or any improvement you have percieved on your own. Any contributions which improve or fix the project will be accepted as long as they don't deviate too much from the project objectives. If you have doubts about whether the PR would be accepted or not you can open an issue before coding to ask for my opinion
