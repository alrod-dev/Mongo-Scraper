// Author: Alfredo Rodriguez
// File: JS - html-routing.js
// Date: 10/20/2017

module.exports = function getSites(app) {

    // Basic route that sends the user first to the AJAX Page
    //Main Page Route
    app.get('/', function (req, res) {



        res.render('index',

            {
                title: 'Mongo Scrapper | Home',
                css: ['https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
                    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
                    '/assets/css/scraper_style.css'],

                icon: "http://res.cloudinary.com/alrod909/image/upload/v1508485964/mongo-scrapper/icon.png",
                github: "https://github.com/alrod909",
                linkedin: "https://www.linkedin.com/in/alfredo-wiesner",
                stackoverflow: "https://stackoverflow.com/users/7982074/alfredo-rodriguez",
                js: ["https://code.jquery.com/jquery-2.1.1.min.js",
                    "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js",
                    "/assets/js/scripts.js"]

            });
    });

    app.get('/scrape', function (req, res) {

        res.render('scrape-articles', {
            title: 'Mongo Scrapper | Scrape',
            css: ['https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
                '/assets/css/scraper_style.css'],
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1508714412/mongo-scrapper/scraper.png",
            github: "https://github.com/alrod909",
            linkedin: "https://www.linkedin.com/in/alfredo-wiesner",
            stackoverflow: "https://stackoverflow.com/users/7982074/alfredo-rodriguez",
            js: ["https://code.jquery.com/jquery-2.1.1.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js",
                "/assets/js/scripts.js"]
        });
    });

    app.get('/articles-saved', function (req, res) {
        res.render('articles-saved', {
            title: 'Mongo Scrapper | Articles Saved',
            css: ['https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
                '/assets/css/scraper_style.css'],
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1508485964/mongo-scrapper/icon2.png",
            github: "https://github.com/alrod909",
            linkedin: "https://www.linkedin.com/in/alfredo-wiesner",
            stackoverflow: "https://stackoverflow.com/users/7982074/alfredo-rodriguez",
            js: ["https://code.jquery.com/jquery-2.1.1.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js",
                "/assets/js/scripts.js"]
        });
    });


};

