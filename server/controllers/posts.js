import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    const { page } = req.query;
    const {userid}= req.headers;
    
    try {
        // const LIMIT = 8;
        // const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        // const total = await PostMessage.countDocuments({});
        // const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        //res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});

        const posts = await PostMessage.find({creator:userid}).sort({ _id: -1 })
        res.json({ data: posts});
        
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
   // const { title, message, creator, selectedFile, tags } = req.body;
  //  const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = req.body;

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}



export default router;