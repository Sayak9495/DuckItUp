// Insert Search Google Button
function insertGoogleButtonToDOM(){
	var search = document.getElementsByClassName("search__input--adv js-search-input")[0].value;
	var node = document.createElement("div");
	node.className = "dropdown";
	var a = document.createElement('a');
	var linkText = document.createTextNode("Search Google");
	a.appendChild(linkText);
	a.title = "Search Google";
	a.href = "http://google.com/search?q="+search;
	node.appendChild(a);
	var x = document.getElementsByClassName("js-search-filters search-filters");
	x[0].appendChild(node);
}

// Movie Rating System
function insertMovieInfoToDOM(){
	console.log("Get Movie Ratings...")

	var movie_section = document.getElementsByClassName("about-profiles__link module__link js-about-profile-link");
	if (movie_section.length==0){
		console.log("About section not detected");
		var searchString = document.getElementsByName("q")[0].defaultValue;
		var searchStringArray = searchString.split(" ");
		var prefix = (searchStringArray.pop()).toLowerCase();
		if (prefix == "movie" || prefix == "series") {
			var resourceName = searchStringArray.join(" ");
			get_details(resourceName, "title");
		}
	}
	for (var i=0;i<movie_section.length;i++){
		if (movie_section[i].title == "IMDb"){	
			var arr = movie_section[i].href.split("/");
			imdb_title = arr[arr.length-1];
			get_details(imdb_title, "id");
		}
	}
}

//Get Movie/Series details from api
function get_details(title, action){
	if (action=="id"){
		var url = "https://www.omdbapi.com/?i="+title+"&apikey=33e029e2";
	} else if (action=="title"){
		var url = "https://www.omdbapi.com/?t="+title+"&plot=full&apikey=33e029e2";
	}
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.send();

	request.onload = function() {
		var data = JSON.parse(request.response);
		var imdb = "NA";
		var rotten_tomatoes = "NA";
		var metacritic = "NA";
		var genre = "NA";
		var year = "NA";
		var runtime = "NA";
		var title = "";
		var imdbID = "#";
		var posterSrc = "#";

		if (data['Response'] == "False") {
			return 1;
		}

		try {title = data['Title'];}
		catch (err){console.log("title Error");}
		try {posterSrc = data['Poster'];}
		catch (err){console.log("poster Error");}
		try {plot = data['Plot'];}
		catch (err){console.log("plot Error");}
		try {imdbID = data['imdbID'];}
		catch (err){console.log("imdbID Error");}		
		try {imdb = data['imdbRating']+"/10";}
		catch (err){console.log("imdb Error");}
		try {rotten_tomatoes = data['Ratings'][1]['Value'];}
		catch (err){console.log("rotten_tomatoes Error");}
		try {metacritic = (data['Metascore']=="N/A") ? "NA" : data['Metascore']+"/100" ;}
		catch (err){console.log("metacritic Error");}
		
		try {genre = data['Genre'];}
		catch (err){console.log("Genre Error");}
		try {year = (typeof data['Year'][6] == 'undefined' && data['Year'][4]=='-') ? data['Year']+"Present" : data['Year'];}
		catch (err){console.log("Year Error");}
		try {runtime = data['Runtime'];}
		catch (err){console.log("Runtime Error");}
		insert_details(imdb,rotten_tomatoes,metacritic,genre,year,runtime,title,imdbID,posterSrc,plot,action);
	}
}

//Insert Movie/Series detials into DOM
function insert_details(imdb,rotten_tomatoes,metacritic,genre,year,runtime,title,imdbID,posterSrc,plot,action){
	genre = genre.split(",");

	var movie_section = document.getElementsByClassName("module__title js-about-item-title");
	
	var movie_info = document.createElement("p");
	movie_info.setAttribute("style","font-size:13px;")
	movie_info.innerHTML = year+" . "+genre[0]+", "+genre[1]+" . "+runtime;


	var div = document.createElement("div");
	div.setAttribute("style", "width: 290px;font-size:14px;margin-top:10px;");
	div.setAttribute("align", "center");

	
	var div1 = document.createElement("div");
	if (imdb!=="NA" || imdb!=="N/A"){
		if(rotten_tomatoes!=="NA" || rotten_tomatoes!=="N/A"){
			div1.setAttribute("style", "float: left; width:76px;border-right: 1px solid;");
		}
		else{
			div1.setAttribute("style", "float: left; width:76px;");
		}
		div1.innerHTML = imdb+"<br>IMDb";
	}


	var div2 = document.createElement("div");
	if (rotten_tomatoes!=="NA"){
		if (metacritic!=="NA"){
			div2.setAttribute("style", "float: left; width:120px;border-right: 1px solid;");
		}
		else{
			div2.setAttribute("style", "float: left; width:120px;");
		}
		div2.innerHTML = rotten_tomatoes+"<br>Rotten Tomatoes";
	}

	var div3 = document.createElement("div");
	if (metacritic!=="NA"){
		div3.setAttribute("style", "float: left; width:76px;");
		div3.innerHTML = metacritic+"<br>Metacritic";
	}

	var br = document.createElement("br")
	br.setAttribute("style", "clear: left");

	div.appendChild(div1);
	div.appendChild(div2);
	div.appendChild(div3);
	div.appendChild(br);

	if (movie_section.length !== 0){
		movie_section[0].appendChild(movie_info);
		movie_section[0].appendChild(div);
	} else {
		// Comes here, if searched with movie or series in the suffix

		// creates the sideBar and its respective DOM elements.
		var sideBarSection = document.getElementsByClassName("js-sidebar-ads");
		
		var sideDiv1 = document.createElement("div");
		sideDiv1.className = "module-slot";
		sideDiv1.id = "m0-0";

		var sideDiv2 = document.createElement("div");
		sideDiv2.className = "module module--about module--zci-wikipedia_fathead js-module--wikipedia_fathead js-about-module has-content-height";

		var sideDiv3 = document.createElement("div");
		sideDiv3.className = "module__content js-about-module-content";

		var sideDiv4 = document.createElement("div");
		sideDiv4.className = "module__body js-about-item";

		var sideDiv5 = document.createElement("div");
		sideDiv5.className = "module__title js-about-item-title";

		// creates poster's DOM element
		var posterDiv = document.createElement("a");
		posterDiv.className = "module--about__img";
		posterDiv.href = posterSrc;

		var posterImage = document.createElement("img");
		posterImage.src = posterSrc;
		posterImage.className = "module__image";
		posterImage.setAttribute("style", "align: right; width: 90px;");
		
		posterDiv.appendChild(posterImage);
		sideDiv4.appendChild(posterDiv);

		// creates the plot/summary DOM element
		var plotDiv = document.createElement("div");
		plotDiv.className = "module__text";

		var plotText = document.createElement("span");
		plotText.className = "js-about-item-abstr";
		plotText.innerHTML = plot;

		var plotSrc = document.createElement("a");
		plotSrc.className = "module__more-at js-about-item-more-at-inline tx--bold";
		plotSrc.href = "http://omdbapi.com/";
		plotSrc.innerHTML = "OMDbAPI"+"<br>";

		plotDiv.appendChild(plotText);
		plotDiv.appendChild(plotSrc);

		// creates about-profile to insert the imdb source
		var aboutDOM = document.createElement("ul");
		aboutDOM.className = "about-profiles";

		var imdbProfile = document.createElement("li");
		imdbProfile.className = "about-profiles__item";

		var imdbLink = document.createElement("a");
		imdbLink.className = "about-profiles__link module__link js-about-profile-link";
		imdbLink.href = "https://www.imdb.com/title/"+imdbID;
		imdbLink.title = "IMDb";
		imdbLink.innerHTML = "<img class='about-profiles__img' src='/assets/icons/thirdparty/imdb.svg'>IMDb"

		// imdbLink.appendChild(imdbImg);
		imdbProfile.appendChild(imdbLink);
		aboutDOM.appendChild(imdbProfile);

		// Appends everything together in heirarchy for sidebar.
		sideDiv4.appendChild(sideDiv5);
		sideDiv4.appendChild(plotDiv);
		sideDiv4.appendChild(aboutDOM);
		sideDiv3.appendChild(sideDiv4);
		sideDiv2.appendChild(sideDiv3);
		sideDiv1.appendChild(sideDiv2);
		sideBarSection[0].appendChild(sideDiv1);

		// creates Movie/Series Title's DOM element
		var sideDivTitle = document.createElement("span");
		sideDivTitle.className = "module__title__link";
		sideDivTitle.innerHTML = title;

		// Appends everything together in heirarchy for the about section in the side DOM.
		var movie_section = document.getElementsByClassName("module__title js-about-item-title");
		movie_section[0].appendChild(sideDivTitle);
		movie_section[0].appendChild(movie_info);
		movie_section[0].appendChild(div);
	}
}

window.onload = function() {
	insertGoogleButtonToDOM();
	insertMovieInfoToDOM();
}
