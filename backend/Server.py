from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import Mongo

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/tweets")
async def fetch_tweets_from_DB():
    Tweets = Mongo.tweets_details()
    return {"Tweets": Tweets}
    
@app.get("/final_tweets")
async def fetch_tweets_from_DB():
    Tweets = Mongo.tweets_details_final()
    return {"Tweets_final": Tweets}