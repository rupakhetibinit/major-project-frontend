import { NextApiRequest, NextApiResponse } from "next";
import { SentimentResponse } from "../dashboard";

async function sentiment(i) {
  let response = await fetch("http://127.0.0.1:5000/test", {
    body: i,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  response = await response.json();
  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { search } = req.query;
    console.log(search);
    try {
      let totalTweets: SentimentResponse[] = [];
      let response = await fetch(
        "https://api.twitter.com/2/tweets/search/recent?max_results=10&query=" +
          search +
          " -is:retweet -has:links -has:mentions lang:en",
        {
          headers: {
            Authorization: process.env.TWITTER_AUTHORIZATION as string,
            Cookie: process.env.COOKIE as string,
          },
        }
      );
      response = await response.json();
      console.log(JSON.stringify(response));

      await Promise.all(
        response.data.map(async (d) => {
          const contents = await sentiment(JSON.stringify(d));
          totalTweets.push(contents);
        })
      );
      return res.json(totalTweets);
    } catch (error) {
      console.log(error);
    } finally {
      console.timeEnd("new");
    }
  }
}
