import mongoose, { CallbackWithoutResult } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NodeNextRequest } from "next/dist/server/base-http/node";
import NewsModel from "../../model/NewsModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.query.id == undefined || req.query.title == undefined || req.query.description == undefined || req.query.passcode == undefined) {
        res.status(500).send({ title: null, description: null, date: new Date() });
        return;
    }

    if(req.query.id == undefined || req.query.title.length == 0 || req.query.description.length == 0 || req.query.passcode.length == 0 || req.query.passcode != process.env.NEXT_PUBLIC_PASSWORD) {
        res.status(500).send({ title: null, description: null, date: new Date() });
        return;
    }

    connect(async () => {
        res.status(200).send(await NewsModel.findOneAndUpdate({
            id: req.query.id
        }, {
            title: req.query.title,
            description: req.query.description
        }));
    });
}

const connect = (callback: CallbackWithoutResult) => {
    mongoose.connect(process.env.MONGO_URI!, callback);
}
