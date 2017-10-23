

// require packages needed for scraping data
var cheerio = require('cheerio');

module.exports = function(request)  {
    // Make a request for the news section of mlb.com
    request("https://www.wsj.com/news/business", function (error, response, html) {
        var genre = 'business';
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);

        // initiate an empty entry object
        var data = [];
        // For each article element with a "buckets-bottom" class
        $("div.buckets-bottom article").each(function (i, element) {



            // add the title , url, content and image to the object
            var headline = $(element).children('header.hedgroup').children('h2').children('a').text();
            var content =$(element).children('div.text-wrapper').children('p').text();
            var link =  $(element).children('header.hedgroup').children('h2').children('a').attr('href');
            var image = $(element).children('.media-wrapper').children('.image-wrapper').children('a').children('img').attr('src');


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
