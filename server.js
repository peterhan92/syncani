import express from 'express';
import bodyParser from 'body-parser';
import animeScraper from './animeScraper/animeScraper';
import episodeScraper from './animeScraper/episodeScraper';
import videoScraper from './animeScraper/videoScraper';

const app = express();
const staticAssets = __dirname + '/public';

app
	.set('port', (process.env.PORT || 3000))
	.set('view engine', 'pug')
	.use(express.static(staticAssets))
	.use(bodyParser.urlencoded({ extended: true }))

	// Routes
	.get('/', (req, res) => {
		res.render('search');
	})
	.post('/search', (req, res) => {
		res.redirect(`/results/${req.body.title}`);
	})
	.get('/results/:search', (req, res) => {
		const animeResults = animeScraper.titleUrl(req.params.search);
		animeResults.then((results) => {
			res.render('results', { search: req.params.search, results });
		})
	})
	.get('/series/:search/episodes', (req, res) => {
		const episodeList = episodeScraper.episodes(req.params.search);
		episodeList.then((list) => {
			res.render('episodes', { list });
		});
	})
	.get('/video/:episode', (req, res) => {
		const video = videoScraper.video(req.params.episode);
		video.then((vidSrc) => {
			res.render('video', { vidSrc });
		})
	})
	// end routes

	.listen(app.get('port'), () => {
		console.log('Server is Listening...');
	});