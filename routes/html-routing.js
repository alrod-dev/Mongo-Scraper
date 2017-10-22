// Author: Alfredo Rodriguez
// File: JS - html-routing.js
// Date: 10/20/2017


module.exports = function getSites(app) {

    // Basic route that sends the user first to the AJAX Page
    //Main Page Route
    app.get('/', function (req, res) {
        res.render('index',

            {
                title: 'Mongo Scrapper || Home', css: '/assets/css/scraper_style.css',
                icon: "http://res.cloudinary.com/alrod909/image/upload/v1508485964/mongo-scrapper/icon.png",

            });
    });

    app.get('/articles-saved', function (req, res) {
        res.render('articles-saved', {
            title: 'Mongo Scrapper || Articles Saved', css: '/assets/css/scraper_style.css',
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1508485964/mongo-scrapper/icon2.png"
        });
    });


};

