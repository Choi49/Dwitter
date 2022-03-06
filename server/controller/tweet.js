import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res) {
  // query에서 username 을 받아옴
  // 만약 없다면 undefined로 뜸
  const username = req.query.username;
  // ? : 문을 이용하여 username 이 undefined면 tweets 전체 return
  // 아니면 filter를 이용하여 tweets 받아옴
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found.` });
  }
}

export async function createTweet(req, res, next) {
  const { text, username, name } = req.body;
  const tweet = await tweetRepository.create(text, name, username)
  if (tweet) {
    res.status(201).json(tweet);
  } else {
    res.status(404).json({message: "server error"});
  }
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: "Tweet id not found" });
  }
}

export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  await tweetRepository.remove(id);
  res.sendStatus(204);
}