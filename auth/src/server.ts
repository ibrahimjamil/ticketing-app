require('custom-env').env(true);
require('dotenv').config();
require('express-async-errors');
import express from 'express';
import mongoose from 'mongoose';
import app from './app';

const start = async (app: express.Application) => {
    try {
        await  mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log("connected to mongoDB")
    } catch (error: any) {
        console.error(error.message)
    }
    app.listen(app.get('port'), () => {
        console.log(`Server is listening on ${app.get('port')} port.`);
    });
}
start(app.getApp());