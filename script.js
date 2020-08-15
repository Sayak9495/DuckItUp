// Insert Search Google Button
function google(){
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
function movie(){
	console.log("Get Movie Ratings...")

	var movie_section = document.getElementsByClassName("about-profiles__link module__link js-about-profile-link");
	for (var i=0;i<movie_section.length;i++){
		if (movie_section[i].title == "IMDb"){	
			var arr = movie_section[i].href.split("/");
			imdb_title = arr[arr.length-1];
			get_details(imdb_title);
		}
	}
}

//Get Movie/Series details from api
function get_details(title){
	var url = "https://www.omdbapi.com/?i="+title+"&apikey=33e029e2";
	
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
		insert_details(imdb,rotten_tomatoes,metacritic,genre,year,runtime);
	}
}

//Insert Movie/Series detials into DOM
function insert_details(imdb,rotten_tomatoes,metacritic,genre,year,runtime){
	genre = genre.split(",");

	var movie_section = document.getElementsByClassName("module__title js-about-item-title");
	
	var movie_info = document.createElement("p");
	movie_info.setAttribute("style","font-size:13px;")
	movie_info.innerHTML = year+" . "+genre[0]+", "+genre[1]+" . "+runtime;


	var div = document.createElement("div");
	div.setAttribute("style", "width: 290px;font-size:14px;margin-top:10px;");
	div.setAttribute("align", "center");

	
	var div1 = document.createElement("div");
	if (imdb!=="NA"){
		if(rotten_tomatoes!=="NA"){
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
	movie_section[0].appendChild(movie_info);
	movie_section[0].appendChild(div);
}

// Sleep func for async wait.
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

google();

// Wait 2.5 Sec before loading DOM, then inject movie/series ratings.
// Else chrome waits for the script to get executed completely
// and then duckduckgo script executes. Even loading at document_end
// was not working. But this trick, seems to work.
(async () => {
	await sleep(2500);
	movie();
})();