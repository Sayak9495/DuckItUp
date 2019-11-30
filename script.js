// Search Google Button

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
	var movie_section = document.getElementsByClassName("about-profiles__link module__link js-about-profile-link");
	for (var i=0;i<movie_section.length;i++){
		if (movie_section[i].title == "IMDb"){
			var arr = movie_section[i].href.split("/");
			imdb_title = arr[arr.length-1];
			get_details(imdb_title);
		}
	}
}

function get_details(title){
	console.log("get_details");
	var url = "https://www.omdbapi.com/?i="+title+"&apikey=33e029e2";
	
	var request = new XMLHttpRequest();

	request.open('GET', url);
	request.send();

	request.onload = function() {
		var data = JSON.parse(request.response);
		console.log(data);
		var imdb = data['imdbRating']+"/10";
		var rotten_tomatoes = data['Ratings'][1]['Value'];
		var metacritic = data['Metascore']+"/100";
		
		var genre = data['Genre'];
		var year = data['Year'];
		var runtime = data['Runtime'];
		insert_details(imdb,rotten_tomatoes,metacritic,genre,year,runtime);
	}
}

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
	div1.setAttribute("style", "float: left; width:76px;border-right: 1px solid;");
	div1.innerHTML = imdb+"<br>IMDb";

	var div2 = document.createElement("div");
	div2.setAttribute("style", "float: left; width:120px;border-right: 1px solid;");
	div2.innerHTML = rotten_tomatoes+"<br>Rotten Tomatoes";

	var div3 = document.createElement("div");
	div3.setAttribute("style", "float: left; width:76px;");
	div3.innerHTML = metacritic+"<br>Metacritic";


	var br = document.createElement("br")
	br.setAttribute("style", "clear: left");

	div.appendChild(div1);
	div.appendChild(div2);
	div.appendChild(div3);
	div.appendChild(br);
	movie_section[0].appendChild(movie_info);
	movie_section[0].appendChild(div);
}

console.log("DuckItUp Running...")
google();
movie();