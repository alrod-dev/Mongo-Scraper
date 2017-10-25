$(document).on("click", "#scrape-button", scrape);

var articles = [];

function addArticles(data) {

    var articleData = [];

    for (var i = 0; i < data.length; i++) {

        // console.log(data[i]);

        articleData = {

            title: data[i].title,
            author: data[i].author,
            text: data[i].text,
            image: data[i].image,
            link: data[i].link,
            _id: data[i]._id,
            genre: data[i].genre

        }

    }

    console.log(articleData.title);

    var template = Handlebars.compile(document.getElementById('article-template').innerHTML);

    var article = template({

        articles: [
            {
                title: articleData.title,
                author: articleData.author,
                text: articleData.text,
                image: articleData.image,
                link: articleData.link,
                _id: articleData._id,
                genre: articleData.genre

            },

            {
                title: articleData.title,
                author: articleData.author,
                text: articleData.text,
                image: articleData.image,
                link: articleData.link,
                _id: articleData._id,
                genre: articleData.genre

            },

            {
                title: articleData.title,
                author: articleData.author,
                text: articleData.text,
                image: articleData.image,
                link: articleData.link,
                _id: articleData._id,
                genre: articleData.genre

            }
        ]

    });

    console.log(article);


    document.getElementById('articlesToAdd').innerHTML += template(article);

}

function scrape() {

    // Grab the articles as a json
    $.getJSON("api/articles", function (data) {
        // For each one
        articles = data;

        console.log(articles);

        addArticles(articles);
    });

}

