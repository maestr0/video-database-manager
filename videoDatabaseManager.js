var self = this;

console.log("Media Database Manager javasrcript ....")

var fnStartApp = function(){
	fnBind();
	fnLoadMediaFromLocalStorage();
}


var fnLoadMoviesFromLocalStorage = function(){

}

var fnBind = function(){

}

var fnAddMediaToUI = function(media){

}

var fnFindMediaInfo = function(title){
	// get list of files
	var url = 'http://www.imdbapi.com/?t='+title;
	// foreach

	fnCallAPI(url);
	// save
	fnAddVideoToUI(media)

	
}

var fnAddVideoToUI = function(url){
	$.getJSON(url, function(data){
		
    });
}

fnStartApp();