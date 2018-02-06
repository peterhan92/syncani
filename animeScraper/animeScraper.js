import rp from 'request-promise';
import cheerio from 'cheerio';

const options = {
	uri: 'http://www.animebam.net/series',
	transform: body => cheerio.load(body),
};

rp(options)
	.then(($) => {
		exports.titleUrl = (search) => {
			const animeTitleUrl = {};
			// selecting each anime list
			const animeList = $('.anm_det_pop');
			// iterating through each of the selected anime
			animeList.each(function(i, e) {
				if (e.children[0].data) {
					// get title and url for each anime and assign to anime object as name/value pairs
					animeTitleUrl[e.children[0].data.split('\n')[0]] = e.attribs.href;
				}
			});
			// turn anime name/url pair to array pairs
			const results = Object.entries(animeTitleUrl);
			const filteredResults = {};
			// iterate through each array and find matches from search string
			results.forEach(function(eachAnimeArr) {
				if (eachAnimeArr[0].toLowerCase().includes(search.toLowerCase())) {
					filteredResults[eachAnimeArr[0]] = eachAnimeArr[1];
				}
			});
			// return matches
			return filteredResults;
		};
	})
	.catch((err) => {
		console.log(err);
	});

