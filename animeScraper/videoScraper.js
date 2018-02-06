import rp from 'request-promise';
import cheerio from 'cheerio';

exports.video = async (episode) => {
	const options = {
		uri: `http://www.animebam.net/${episode}`,
		transform: body => cheerio.load(body),
	};

	return rp(options)
		.then(($) => {
			const video = $('iframe').attr('src');
			return video;
		})
		.catch((err) => {
			console.log(err);
		});
};

