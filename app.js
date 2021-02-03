import express from 'express';
import { promises as fs} from 'fs';
import router from './src/videos.js';
import formatUploadDate from './src/dateFormat.js';
import formatVideoLength from './src/timeFormat.js';

const app = express();

const viewsPath = new URL('./views', import.meta.url).pathname;
const publicPath = new URL('./public', import.meta.url).pathname;

app.locals.formatUploadDate = formatUploadDate;
app.locals.formatVideoLength = formatVideoLength;

app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use(express.static('public'));

function notFoundHandler(req, res, next) { // eslint-disable-line
    const title = 'Síða fannst ekki';
    const message = 'Ansans vesen, efnið finnst ekki!';
    res.status(404).render('error', { title, message });
}

function errorHandler(err, req, res, next) { // eslint-disable-line
    const title = 'Villa kom upp';
    const message = 'Ansans vesen, það kom upp villa';
    res.status(500).render('error', { title, message });
}
  
app.use('/', router);
app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = '3000';

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
