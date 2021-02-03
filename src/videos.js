import express from 'express';
import { promises as fs } from 'fs';

export const router = express.Router();

function catchErrors(fn) {
    return (req, res, next) => fn(req, res, next).catch(next);
}

async function read() {
    try {
        const file = await fs.readFile('./videos.json');

        const json = JSON.parse(file);
        //console.log(json)
        return json;
    } catch(e){
        throw new Error(e); 
    }
  }

async function videoList(req, res) {
    const { videos , categories } = await read();
    const mapCategory = (category) => {
        const mappedVideos = (category.videos || [])
        .map((id) => (videos || []).find((v) => v.id === id))
        .filter(Boolean);
  
        return {
            title: category.title,
            videos: mappedVideos,
        };
    }
    const mappedCategories = categories.map(mapCategory);
    res.render('videos', { title: 'Forsíða', categories : mappedCategories });
  }

async function findVideo(req, res) {
    const { videos } = await read();
    const id = req.params.data;
    const video = videos.find(video => video.id == id)
    res.render('video', { title : video.title , video } );
}

router.get('/video/:data', catchErrors(findVideo))
router.get('/', catchErrors(videoList));
