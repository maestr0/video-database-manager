var self = this;

console.log("Media Database Manager javasrcript ....");

var fnStartApp = function() {
		fnBind();
		fnInit();
		fnLoadMediaFromLocalStorage();
		
		//300 is the fixed poster width
		
		var media1 = {"Title":"V for Vendetta","Year":"2005","Rated":"R","Released":"17 Mar 2006","Runtime":"2 h 12 min","Genre":"Action, Fantasy, Thriller","Director":"James McTeigue","Writer":"Andy Wachowski, Lana Wachowski","Actors":"Hugo Weaving, Natalie Portman, Rupert Graves, Stephen Rea","Plot":"A shadowy freedom fighter known only as 'V' uses terrorist tactics to fight against his totalitarian society. Upon rescuing a girl from the secret police, he also finds his best chance at having an ally.","Poster":"styles/img/covers/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg","imdbRating":"8.2","imdbVotes":"414,903","imdbID":"tt0434409","Response":"True"}
		var media2 = {"Title":"V for Vendetta","Year":"2005","Rated":"R","Released":"17 Mar 2006","Runtime":"2 h 12 min","Genre":"Action, Fantasy, Thriller","Director":"James McTeigue","Writer":"Andy Wachowski, Lana Wachowski","Actors":"Hugo Weaving, Natalie Portman, Rupert Graves, Stephen Rea","Plot":"A shadowy freedom fighter known only as 'V' uses terrorist tactics to fight against his totalitarian society. Upon rescuing a girl from the secret police, he also finds his best chance at having an ally.","Poster":"styles/img/covers/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg","imdbRating":"8.2","imdbVotes":"414,903","imdbID":"tt0434409","Response":"True"}
		var media3 = {"Title":"V for Vendetta","Year":"2005","Rated":"R","Released":"17 Mar 2006","Runtime":"2 h 12 min","Genre":"Action, Fantasy, Thriller","Director":"James McTeigue","Writer":"Andy Wachowski, Lana Wachowski","Actors":"Hugo Weaving, Natalie Portman, Rupert Graves, Stephen Rea","Plot":"A shadowy freedom fighter known only as 'V' uses terrorist tactics to fight against his totalitarian society. Upon rescuing a girl from the secret police, he also finds his best chance at having an ally.","Poster":"styles/img/covers/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg","imdbRating":"8.2","imdbVotes":"414,903","imdbID":"tt0434409","Response":"True"}
		var media4 = {"Title":"V for Vendetta","Year":"2005","Rated":"R","Released":"17 Mar 2006","Runtime":"2 h 12 min","Genre":"Action, Fantasy, Thriller","Director":"James McTeigue","Writer":"Andy Wachowski, Lana Wachowski","Actors":"Hugo Weaving, Natalie Portman, Rupert Graves, Stephen Rea","Plot":"A shadowy freedom fighter known only as 'V' uses terrorist tactics to fight against his totalitarian society. Upon rescuing a girl from the secret police, he also finds his best chance at having an ally.","Poster":"styles/img/covers/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg","imdbRating":"8.2","imdbVotes":"414,903","imdbID":"tt0434409","Response":"True"}
		var media5 = {"Title":"V for Vendetta","Year":"2005","Rated":"R","Released":"17 Mar 2006","Runtime":"2 h 12 min","Genre":"Action, Fantasy, Thriller","Director":"James McTeigue","Writer":"Andy Wachowski, Lana Wachowski","Actors":"Hugo Weaving, Natalie Portman, Rupert Graves, Stephen Rea","Plot":"A shadowy freedom fighter known only as 'V' uses terrorist tactics to fight against his totalitarian society. Upon rescuing a girl from the secret police, he also finds his best chance at having an ally.","Poster":"styles/img/covers/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg","imdbRating":"8.2","imdbVotes":"414,903","imdbID":"tt0434409","Response":"True"}
		var media6 = {"Title":"V for Vendetta","Year":"2005","Rated":"R","Released":"17 Mar 2006","Runtime":"2 h 12 min","Genre":"Action, Fantasy, Thriller","Director":"James McTeigue","Writer":"Andy Wachowski, Lana Wachowski","Actors":"Hugo Weaving, Natalie Portman, Rupert Graves, Stephen Rea","Plot":"A shadowy freedom fighter known only as 'V' uses terrorist tactics to fight against his totalitarian society. Upon rescuing a girl from the secret police, he also finds his best chance at having an ally.","Poster":"styles/img/covers/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg","imdbRating":"8.2","imdbVotes":"414,903","imdbID":"tt0434409","Response":"True"}
		var media7 = {"Title":"V for Vendetta","Year":"2005","Rated":"R","Released":"17 Mar 2006","Runtime":"2 h 12 min","Genre":"Action, Fantasy, Thriller","Director":"James McTeigue","Writer":"Andy Wachowski, Lana Wachowski","Actors":"Hugo Weaving, Natalie Portman, Rupert Graves, Stephen Rea","Plot":"A shadowy freedom fighter known only as 'V' uses terrorist tactics to fight against his totalitarian society. Upon rescuing a girl from the secret police, he also finds his best chance at having an ally.","Poster":"styles/img/covers/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg","imdbRating":"8.2","imdbVotes":"414,903","imdbID":"tt0434409","Response":"True"}
		
		fnAddMediaToUI(media1);
		fnAddMediaToUI(media2);
		fnAddMediaToUI(media3);
		fnAddMediaToUI(media4);
		fnAddMediaToUI(media5);
		fnAddMediaToUI(media6);
	};


var fnInit = function () {
	media_count = 0;
}

var fnLoadMediaFromLocalStorage = function() {

	};

var fnBind = function() {
		$("#testButton").click(function() {
			$("#console").append("test click<br />");
			self.fnFindMediaInfo("Gladiator");
			console.log("test click ");
		});
	};

var fnAddMedia = function(media, media_id) {
		fnAddMediaToUI(media);
		fnSaveMediaToLocalStorage(media, media_id);
	};

var fnSaveMediaToLocalStorage = function(media_id, data) {
		console.log("Saving media to LocalStorage...", media_id, data);
		localStorage[media_id]=data;
	}
var fnAddMediaToUI = function(media) {
		console.log("Adding media to UI...", media);
		//media.title, media.year, media.tags,media.cover,media.rating
		if (media_count%3 == 0) {
			// create new row and add
			row = "<div class='row' ></div>";
			$('#container').append(row);
			console.log("Created new row...", media);
		}
		$("#container div.row:last-child").append("<div class='span4'><div class='media' id='media_"+media_count+"'><div class='poster'><p>"+media.imdbRating+"</p><img src='"+ media.Poster+ "'></img><p class='runtime'>"+media.Runtime+"</p></div><p class='title'>"+media.Title+"</p><p class='year'>"+media.Released+"</p><p class='year'>"+media.Genre+"</p></div></div>");
		media_count++;
		console.log("Media count in now:"+media_count, media);
	};

var fnFindMediaInfo = function(mediaFile) {
		// TODO: extract title and year from a file name
		var title = "Gladiator";
		var year = "";

		var url = 'http://www.imdbapi.com/?t=' + title + "&y=" + year;
		fnCallAPI(url);
	};

var fnCallAPI = function(url) {
		$.getJSON(url, function(data) {
			if(data.Response != "Parse Error") {
				fnAddMedia(data);
			} else {
				console.log("Something went wrong ;(. IMDB API error", data);
				// TODO: error handeling 
			}
		});
	};	

fnStartApp();
