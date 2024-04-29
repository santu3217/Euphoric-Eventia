import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import registerRouter from './routes/index.js';
import models from './models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);

const _path = path.join(dirname(__filename), '../../', '/euphoric_eventia/src');
const folderPath = 'images/eventThumbnails/';
const fullFolderPath = path.join(_path, folderPath);

const initialize = (app) => {

    app.use(cors());
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    
    // // Example of manually setting CORS headers in Node.js/Express

    

    // Check if the folder already exists
if (!fs.existsSync(fullFolderPath)) {
    // Use the fs.mkdir() function to create the folder
    fs.mkdirSync(fullFolderPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating folder:', err);
      } else {
        console.log('Folder created successfully!');
      }
    });
  } else {
    console.log('Folder already exists.');
  }
  
    app.use(folderPath, express.static(fullFolderPath));

    //TODO MongoDB Connection
    mongoose.connect('mongodb+srv://santu:santu@eventmanagement.kl69rdn.mongodb.net/Events?retryWrites=true&w=majority');
    //TODO initialize routes
    registerRouter(app);

}

export default initialize;


