import mongoose, { CallbackWithoutResult } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import NewsModel from "../../model/NewsModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connect(async () => {
    res.status(200).send(await NewsModel.find({}).sort({createdAt: -1}));
  });
}

const connect = (callback: CallbackWithoutResult) => {
  mongoose.connect(process.env.MONGO_URI!, callback);
}
