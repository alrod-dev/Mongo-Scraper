

// require packages needed for scraping data
var cheerio = require('cheerio');

module.exports = function(request)  {
    // Make a request for the news section of mlb.com
    request("https://www.nytimes.com/section/sports", function (error, response, html) {
        var genre = 'business';
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);

        // initiate an empty entry object
        var data = [];
        // For each article element with a "buckets-bottom" class
        $("div.stream article").each(function (i, element) {



            // add the title , url, content and image to the object
            var headline = $(element).children('div.story-body').children('a').children('div.story-meta').children('h2').text().trim();
            var content = $(element).children('div.story-body').children('a').children('div.story-meta').children('p').text().trim();
            var link =  $(element).children('div.story-body').children('a').attr("href");
            var image = $(element).children('div.story-body').children('a').children('div.wide-thumb').children('img').attr('src');

            data.push({

                title: headline,
                text: content,
                link: link,
                img: image

            });



        });

        console.log(data)

    });


};
