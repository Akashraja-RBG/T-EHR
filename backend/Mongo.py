from fastapi import FastAPI
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

collection=client.Twitter
Tweets=collection.Tablet_tweets
Final_Tweets=collection.f_tweets

def tweets_details():
    twitter_tweets = Tweets.find({}, {"_id": 0})
    return list(twitter_tweets)

def tweets_details_final():
    twitter_tweets = Final_Tweets.find({}, {"_id": 0})
    return list(twitter_tweets)

# docker-compose up