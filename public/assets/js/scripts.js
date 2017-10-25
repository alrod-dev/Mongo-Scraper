var table = $("#articlesToAdd");

$(document).on("click", "#scrape-button", scrape);

function addArticles(data) {

    console.log(data.title);

    var newArticle = $("<div class=\"row\" data-id=\"" + data._id + "\">");

    newArticle.append("<ul class=\"collapsible\" data-collapsible=\"accordion\">\n" +
        "\n" +
        "                <li>\n" +
        "\n" +
        "                    <div class=\"collapsible-header waves-effect waves-purple\">\n" +
        "\n" +
        "                        <ul class=\"collection\">\n" +
        "\n" +
        "                            <li class=\"collection-item avatar\"><i\n" +
        "                                    class=\"material-icons circle\">find_in_page</i>\n" +
        "                                <span class=\"title\"><h5>" + data.title + "</h5></span>\n" +
        "                                <label>" + data.author + "<br></label>\n" +
        "\n" +
        "                            </li>\n" +
        "\n" +
        "                        </ul>\n" +
        "\n" +
        "                        <div class='addButton'> <a class=\"btn-floating btn-large waves-effect waves-red\"><i class=\"material-icons\">add</i></a> </div>\n" +
        "\n" +
        "                    </div>\n" +
        "\n" +
        "\n" +
        "                    <div class=\"collapsible-body\">\n" +
        "\n" +
        "                        <div class=\"col s12 m12\">\n" +
        "                            <h2 class=\"header\">" + data.title + "</h2>\n" +
        "                            <div class=\"card horizontal\">\n" +
        "                                <div class=\"card-image\">\n" +
        "                                    <img src=\"" + data.image + "\">\n" +
        "                                </div>\n" +
        "                                <div class=\"card-stacked\">\n" +
        "                                    <div class=\"card-content\">\n" +
        "                                        <p>" + data.text + "}</p>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"card-action\">\n" +
        "                                        <label>" + data.author + "</label>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "\n" +
        "\n" +
        "                    </div>\n" +
        "\n" +
        "                </li>\n" +
        "\n" +
        "            </ul>\n" +
        "\n" +
        "        </div>");

    return newArticle;


}

// A function for rendering the list of meds into the #myAdds div
function renderMeds(rows) {

    table.children().not(":last").remove();

    if(rows.length) {

        table.append(rows);

    }

    $('.collapsible').collapsible();
}


function scrape() {

    // Grab the articles as a json
    $.getJSON("api/scrape", function (data) {

        console.log("Scraped");
        console.log(data);

    });

    // Grab the articles as a json
    $.getJSON("api/articles", function (data) {
        // For each one
        var articles = [];

        // Loop through and display each of the medications
        for (var i = 0; i < data.length; i++) {

            articles.push((addArticles(data[i])));

        }

        console.log(articles);

        renderMeds(articles);

    });

}

