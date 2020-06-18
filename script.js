
function buildQueryURL() {
    // the url  to query the API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=ysEbcONgA7qdtUQh5dnSX6q7hTXurip0";
  
    
    // Set the API key
    //var queryParams = { "api-key": "ysEbcONgA7qdtUQh5dnSX6q7hTXurip0" };
  
    // text typed by the user into the search input, add to the queryParams object
    queryParams.q = $("#search-term")
      .val()
      .trim();
  
    //startYear
    var startYear = $("#start-year")
      .val()
      .trim();
  
    if (parseInt(startYear)) {
      queryParams.begin_date = startYear + "0101";
    }
  
    //  endYear
    var endYear = $("#end-year")
      .val()
      .trim();
  
    if (parseInt(endYear)) {
      queryParams.end_date = endYear + "0101";
    }
  
    // Logging the URL IN CASE!!!!
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
  }
  
  //data => element
  function updatePage(NYTData) {
    // the number of results 

    var numArticles = $("#num-records").val();
  
    // Log the NYTData to console, where it will show up as an object
    console.log(NYTData);
    console.log("------------------------------------");
  
    // Loop through and build elements for the defined number of articles
    for (var i = 0; i < numArticles; i++) {
        var article = NYTData.response.docs[i];
  
      // Increase the articleCount (track article # - starting at 1)
      var articleCount = i + 1;
  
      // Create the  list group to contain the articles and add the article content for each
      var $articleList = $("<ul>");
      $articleList.addClass("list-group");
  
      // Add the newly created element to the DOM
      $("#result").append($articleList);
  
      // log and append to $articleList when article has a headline
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
  
      // log and append to $articleList if the article has a byline
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
  

  
  // .on("click") function for Search Button
  $("#run-search").on("click", function(event) {
    event.preventDefault();
    clear();
  
    // query URL for the NYT ajax request
    var queryURL = buildQueryURL();
  

    $.ajax({
      url: queryURL,
      method: "GET",
      processData: true,
      data: {},
      dataType: 'json',
    }).then(updatePage);
  });
  
  //  .on("click") function for clear button
  $("#clear-all").on("click", clear);