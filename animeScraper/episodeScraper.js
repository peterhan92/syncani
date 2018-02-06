import rp from 'request-promise';
import cheerio from 'cheerio';

exports.episodes = async (search) => {
	const options = {
		uri: `http://www.animebam.net/series/${search}`,
		transform: body => cheerio.load(body),
	};

	return rp(options)
		.then(($) => {
			const episodes = {};
			const episodeList = $('.anm_det_pop');
			episodeList.each(function(i, e) {
				episodes[$(this).text()] = e.attribs.href;
			});
			return episodes;
		})
		.catch((err) => {
			console.log(err);
		});
};

