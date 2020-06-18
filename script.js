  
function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/search/v2/articlesearch.json?";

  
  // Set the API key
  var queryParams = { "api-key": "Hk1fTBS0iEWStFXp5SoI9HvADA1MGzIM" };

  // text user typed into the search input
  queryParams.q = $("#search-term")
    .val()
    .trim();

  // If the user provides a startYear
  var startYear = $("#start-year")
    .val()
    .trim();

  if (parseInt(startYear)) {
    queryParams.begin_date = startYear + "0101";
  }

  // If the user provides an endYear
  var endYear = $("#end-year")
    .val()
    .trim();

  if (parseInt(endYear)) {
    queryParams.end_date = endYear + "0101";
  }

  // Logging the URL in Case!!!
  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}


function updatePage(NYTData) {
  // Get from the form the number of results to display
  
  var numArticles = $("#num-records").val();

  
  console.log(NYTData);
  console.log("------------------------------------");

  // Loop through and build elements for the defined number of articles
  for (var i = 0; i < numArticles; i++) {
    
    var article = NYTData.response.docs[i];

    // Increase the articleCount 
    var articleCount = i + 1;

    // Create the  list group to contain the articles and add the article content for each
    var $articleList = $("<ul>");
    $articleList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#result").append($articleList);

    // If the article has a headline, log and append to $articleList
    var headline = article.headline;
    var $articleListItem = $("<li class='list-group-item articleHeadline'>");

    if (headline && headline.main) {
      console.log(headline.main);
      $articleListItem.append(
        "<span class='label label-primary'>" +
          articleCount +
          "</span>" +
          "<strong> " +
          headline.main +
          "</strong>"
      );
    }

    // If the article has a byline, log and append to $articleList
    var byline = article.byline;

    if (byline && byline.original) {
      console.log(byline.original);
      $articleListItem.append("<h5>" + byline.original + "</h5>");
    }

    // Log section, and append to document if exists
    var section = article.section_name;
    console.log(article.section_name);
    if (section) {
      $articleListItem.append("<h5>Section: " + section + "</h5>");
    }

    // Log published date, and append to document if exists
    var pubDate = article.pub_date;
    console.log(article.pub_date);
    if (pubDate) {
      $articleListItem.append("<h5>" + article.pub_date + "</h5>");
    }

    // Append and log url
    $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
    console.log(article.web_url);

    // Append the article
    $articleList.append($articleListItem);
  }
}

// Function to empty out the articles
function clear() {
  $("#result").empty();
}



// .on("click") function associated with the Search Button
$("#search").on("click", function(event) {

  event.preventDefault();

  // Empty the region associated with the articles
  clear();

  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();


  $.ajax({
    url: queryURL,
    method: "GET",
    processData: true,
    data: {},
    dataType: 'json',
  }).then(updatePage);
});

//  .on("click") function associated with the clear button
$("#clear").on("click", clear);