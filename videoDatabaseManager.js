var gGalleryIndex = 0; // gallery currently being iterated
var gDirectories = [];     // used to process subdirectories
var gGalleryArray = []; // holds information about all top-level Galleries found
var gGalleryData = []; // hold computed information about each Gallery
var self = this;
media_count = 0;

var vidFormats = ['3gp', '3gpp', 'avi', 'flv', 'mov', 'mpeg', 'mpeg4', 'mp4', 'webm', 'wmv'];

console.log("Media Database Manager javascript ....");

var fnStartApp = function() {
		fnBind();
		fnLoadDataFromStorage();
		//300 is the fixed poster width
		
		var media1 = {"Title":"V for Vendetta","Year":"2005","Rated":"R","Released":"17 Mar 2006","Runtime":"2 h 12 min","Genre":"Action, Fantasy, Thriller","Director":"James McTeigue","Writer":"Andy Wachowski, Lana Wachowski","Actors":"Hugo Weaving, Natalie Portman, Rupert Graves, Stephen Rea","Plot":"A shadowy freedom fighter known only as 'V' uses terrorist tactics to fight against his totalitarian society. Upon rescuing a girl from the secret police, he also finds his best chance at having an ally.","Poster":"http://ia.media-imdb.com/images/M/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg","imdbRating":"8.2","imdbVotes":"414,903","imdbID":"tt0434409","Response":"True"}
		var media2 = {"Title":"Cloud Atlas","Year":"2012","Rated":"R","Released":"26 Oct 2012","Runtime":"2 h 52 min","Genre":"Drama, Mystery, Sci-Fi","Director":"Tom Tykwer, Andy Wachowski","Writer":"David Mitchell, Lana Wachowski","Actors":"Tom Hanks, Halle Berry, Hugh Grant, Hugo Weaving","Plot":"An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution.","Poster":"http://ia.media-imdb.com/images/M/MV5BMTczMTgxMjc4NF5BMl5BanBnXkFtZTcwNjM5MTA2OA@@._V1_SX300.jpg","imdbRating":"8.2","imdbVotes":"32,923","imdbID":"tt1371111","Response":"True"}
		// var media3 = {"Title":"Fight Club","Year":"1999","Rated":"R","Released":"15 Oct 1999","Runtime":"2 h 19 min","Genre":"Drama","Director":"David Fincher","Writer":"Chuck Palahniuk, Jim Uhls","Actors":"Brad Pitt, Edward Norton, Helena Bonham Carter, Meat Loaf","Plot":"An insomniac office worker and a devil-may-care soap maker form an underground fight club that transforms into a violent revolution.","Poster":"http://ia.media-imdb.com/images/M/MV5BMjIwNTYzMzE1M15BMl5BanBnXkFtZTcwOTE5Mzg3OA@@._V1_SX300.jpg","imdbRating":"8.9","imdbVotes":"668,736","imdbID":"tt0137523","Response":"True"}
		// var media4 = {"Title":"Pulp Fiction","Year":"1994","Rated":"R","Released":"14 Oct 1994","Runtime":"2 h 48 min","Genre":"Crime, Thriller","Director":"Quentin Tarantino","Writer":"Quentin Tarantino, Roger Avary","Actors":"John Travolta, Uma Thurman, Samuel L. Jackson, Bruce Willis","Plot":"The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.","Poster":"http://ia.media-imdb.com/images/M/MV5BMjE0ODk2NjczOV5BMl5BanBnXkFtZTYwNDQ0NDg4._V1_SX300.jpg","imdbRating":"9.0","imdbVotes":"693,634","imdbID":"tt0110912","Response":"True"}
		// var media5 = {"Title":"Forrest Gump","Year":"1994","Rated":"PG-13","Released":"06 Jul 1994","Runtime":"2 h 22 min","Genre":"Drama, Romance","Director":"Robert Zemeckis","Writer":"Winston Groom, Eric Roth","Actors":"Tom Hanks, Robin Wright, Gary Sinise, Sally Field","Plot":"Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny, eludes him.","Poster":"http://ia.media-imdb.com/images/M/MV5BMTQwMTA5MzI1MF5BMl5BanBnXkFtZTcwMzY5Mzg3OA@@._V1_SX300.jpg","imdbRating":"8.7","imdbVotes":"574,138","imdbID":"tt0109830","Response":"True"}
		// var media6 = {"Title":"The Matrix","Year":"1999","Rated":"R","Released":"31 Mar 1999","Runtime":"2 h 16 min","Genre":"Action, Adventure, Sci-Fi","Director":"Andy Wachowski, Lana Wachowski","Writer":"Andy Wachowski, Lana Wachowski","Actors":"Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving","Plot":"A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.","Poster":"http://ia.media-imdb.com/images/M/MV5BMjEzNjg1NTg2NV5BMl5BanBnXkFtZTYwNjY3MzQ5._V1_SX300.jpg","imdbRating":"8.7","imdbVotes":"644,742","imdbID":"tt0133093","Response":"True"}
		// var media7 = {"Title":"Spirited Away","Year":"2001","Rated":"PG","Released":"20 Jul 2001","Runtime":"2 h 5 min","Genre":"Animation, Adventure, Family, Fantasy","Director":"Hayao Miyazaki","Writer":"Hayao Miyazaki","Actors":"Daveigh Chase, Suzanne Pleshette, Miyu Irino, Susan Egan","Plot":"In the middle of her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and monsters; where humans are changed into animals; and a bathhouse for these creatures.","Poster":"http://ia.media-imdb.com/images/M/MV5BMjYxMDcyMzIzNl5BMl5BanBnXkFtZTYwNDg2MDU3._V1_SX300.jpg","imdbRating":"8.6","imdbVotes":"199,620","imdbID":"tt0245429","Response":"True"}
		// var media8 = {"Title":"The Hobbit: An Unexpected Journey","Year":"2012","Rated":"PG-13","Released":"14 Dec 2012","Runtime":"2 h 49 min","Genre":"Adventure, Fantasy","Director":"Peter Jackson","Writer":"Fran Walsh, Philippa Boyens","Actors":"Martin Freeman, Ian McKellen, Richard Armitage, Andy Serkis","Plot":"A younger and more reluctant Hobbit, Bilbo Baggins, sets out on a 'unexpected journey' to the Lonely Mountain with a spirited group of Dwarves to reclaim a their stolen mountain home from a dragon named Smaug.","Poster":"http://ia.media-imdb.com/images/M/MV5BMTkzMTUwMDAyMl5BMl5BanBnXkFtZTcwMDIwMTQ1OA@@._V1_SX300.jpg","imdbRating":"8.4","imdbVotes":"152,302","imdbID":"tt0903624","Response":"True"}
		// var media9 = {"Title":"Spirited Away","Year":"2001","Rated":"PG","Released":"20 Jul 2001","Runtime":"2 h 5 min","Genre":"Animation, Adventure, Family, Fantasy","Director":"Hayao Miyazaki","Writer":"Hayao Miyazaki","Actors":"Daveigh Chase, Suzanne Pleshette, Miyu Irino, Susan Egan","Plot":"In the middle of her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and monsters; where humans are changed into animals; and a bathhouse for these creatures.","Poster":"http://ia.media-imdb.com/images/M/MV5BMjYxMDcyMzIzNl5BMl5BanBnXkFtZTYwNDg2MDU3._V1_SX300.jpg","imdbRating":"8.6","imdbVotes":"199,620","imdbID":"tt0245429","Response":"True"}
		
		// fnAddMediaToUI(media1);
		// fnAddMediaToUI(media2);
		// fnAddMediaToUI(media3);
		// fnAddMediaToUI(media4);
		// fnAddMediaToUI(media5);
		// fnAddMediaToUI(media6);
		// fnAddMediaToUI(media7);
		// fnAddMediaToUI(media8);
		// fnAddMediaToUI(media9);

		console.log("fnStartApp done");
	};

function GalleryData(id) {
    this._id = id;
    this.path = "";
    this.sizeBytes = 0;
    this.numFiles = 0;
    this.numDirs = 0;
}

function errorPrintFactory(custom) {
    return function(e) {
        var msg = '';

        switch(e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
        }

        console.log(custom + ': ' + msg);
    };
}

function getFileType(filename) {
    var ext = filename.substr(filename.lastIndexOf('.') + 1).toLowerCase();
    if(imgFormats.indexOf(ext) >= 0) return "image";
    else if(audFormats.indexOf(ext) >= 0) return "audio";
    else if(vidFormats.indexOf(ext) >= 0) return "video";
    else return null;
}

function getGalleriesInfo(results) {
    // clearContentDiv();
    if(results.length) {
        var str = 'Media files count: ' + results.length + ' ( ';
        results.forEach(function(item, indx, arr) {
            // the gallery name is a JSON string containing and id and a name
            var gallery = JSON.parse(item.name);
            str += gallery.name;
            if(indx < arr.length - 1) str += ",";
            str += " ";
        });
        str += ')';
        // document.getElementById("filename").innerText = str;
        console.log(str);
        gGalleryArray = results;
        // chrome.storage.set(results); // store the list of media directories
        // gGalleryIndex = 0;
        // document.getElementById("scan-button").disabled = "";
    } else {
        // document.getElementById("filename").innerText = 'No galleries found';
        // document.getElementById("scan-button").disabled = "disabled";
    }
}

function scanGallery(entries) {
    // when the size of the entries array is 0, we've processed all the directory contents
    if(entries.length === 0) {
        if(gDirectories.length > 0) {
            var dir_entry = gDirectories.shift();
            console.log('Doing subdir: ' + dir_entry.fullPath);
            gGalleryReader = dir_entry.createReader();
            gGalleryReader.readEntries(scanGallery, errorPrintFactory('readEntries'));
        } else {
            gGalleryIndex++;
            if(gGalleryIndex < gGalleryArray.length) {
                console.log('Doing next Gallery: ' + gGalleryArray[gGalleryIndex].name);
                scanGalleries(gGalleryArray[gGalleryIndex]);
            }
        }
        return;
    }
    for(var i = 0; i < entries.length; i++) {
        // console.log(entries[i].name);

        if(entries[i].isFile) {
            // TODO: get filesize
            fnFindMediaInfo({file: entries[i]});
            gGalleryData[gGalleryIndex].numFiles++;
            (function(galData) {
                entries[i].getMetadata(function(metadata) {
                    galData.sizeBytes += metadata.size;
                });
            }(gGalleryData[gGalleryIndex]));
        } else if(entries[i].isDirectory) {
            gDirectories.push(entries[i]);
        } else {
            console.log("Got something other than a file or directory.");
        }
    }
    // readEntries has to be called until it returns an empty array. According to the spec,
    // the function might not return all of the directory's contents during a given call.
    gGalleryReader.readEntries(scanGallery, errorPrintFactory('readMoreEntries'));
}

function addGallery(name, id) {
    var optGrp = document.createElement("optgroup");
    optGrp.setAttribute("label", name);
    optGrp.setAttribute("id", id);
    document.getElementById("GalleryList").appendChild(optGrp);
    return optGrp;
}

function scanGalleries(fs) {
    console.log('Reading gallery: ' + fs.name);
    var galInfo = JSON.parse(fs.name);
    gCurOptGrp = addGallery(galInfo.name, galInfo.galleryId);
    gGalleryData[gGalleryIndex] = new GalleryData(galInfo.galleryId);
    gGalleryReader = fs.root.createReader();
    gGalleryReader.readEntries(scanGallery, errorPrintFactory('readEntries'));
}

var fnBind = function() {
        var $container = $("#container");
        var $searchDescriptions = $("#searchDescriptions");
        var $searchcontainer = $("#searchcontainer");
        $searchcontainer.hide();

        $searchDescriptions.click(function() {
            $("#console").append("Loading metadata from localStorage<br />");
            fnLoadDataFromStorage();
        });

        // if there are nothing to search Disable the searchDescriptions Button
        chrome.storage.local.getBytesInUse(null, function(bytes){
            if (bytes === 0) {
                $searchDescriptions.toggleClass("disabled");
            }
        });
		$("#clearLocalStorage").click(function() {
			chrome.storage.local.get(null, function(results) {
				$.each(results,function(key,val){
					chrome.storage.local.remove(key);
				})
			});
		});

        $("#scanFolders").click(function() {
            $("#console").append("scanGalleries");
            // clearContentDiv();
            // clearList();
            if(gGalleryArray.length > 0) {
                scanGalleries(gGalleryArray[0]);
            }
            else {
                chrome.mediaGalleries.getMediaFileSystems({
                    interactive: 'if_needed'
                }, function (results) {
                    getGalleriesInfo(results);
                    scanGalleries(gGalleryArray[0]);
                });
            }
            $searchDescriptions.toggleClass("disabled");
        });
        $("#selectFolders").click(function() {
            $("#console").append("getMediaFileSystems");
            chrome.mediaGalleries.getMediaFileSystems({
                interactive: 'yes'
            }, getGalleriesInfo);
        });
        $("#search").submit(function(e) {
            // search in chrome.storage
            e.preventDefault();
            var searchParameter = $("#search :input").val();
            if ( searchParameter !== "" ) {
                // $container.hide();
                var results = fnSearch(searchParameter.toLowerCase());
                // $searchcontainer.show();
            }
            else {
                // $container.show();
                // $searchcontainer.hide();
                $("div[data-title]").show();
            }
        });
    };

function fnSearch (parameter) {
    var allStorage;
    chrome.storage.local.get(null, function(res) {
        allStorage = res;
    });
    // hide all the movies that do not match the title
    $("div[data-title]").not("div[data-title*='"+ parameter +"']").hide();
    //
}

var fnAddMedia = function(media, media_id) {
			fnAddMediaToUI(media);
			fnSaveMediaToLocalStorage(media, media_id);
	};

var fnLoadDataFromStorage = function() {
	chrome.storage.local.get(null, function(results) {
		$.each(results,function(media_id, data){
			$("#console").append("Loaded " + media_id + "<br />");
            var parsedData = JSON.parse(data);
            if (parsedData.Response) {
                try{
                    self.fnAddMediaToUI(parsedData);
                }catch(e){
                    console.log("Unable to parse video metadata",e);
                }
            }
		});
	});
};

var fnSaveMediaToLocalStorage = function(data, media_id) {
		console.log("Saving media to LocalStorage...", media_id, data);

		var key = 'MEDIA-'+media_id;
		var object = {};
		object[key]=JSON.stringify(data);
		chrome.storage.local.set(object, function() {
			// Notify that we saved.
			console.log('Media metadata saved ', media_id, data);
		});
	};

var fnAddMediaToUI = function(media) {
		console.log("Adding media to UI...", media);
		//media.title, media.year, media.tags,media.cover,media.rating
		// if (media_count%3 == 0) {
			// create new row and add
			// row = "";
			// $('#container').append(row);
			// console.log("Created new row...", media);
		// }
		
		
		var cover_url = media.Poster; //.replace('http://ia.media-imdb.com/images/M/','styles/img/covers/');
		var movie_view = "<div class='span4' data-title="+media.Title.toLowerCase()+"><div id='media_"+media_count+"' class='media mosaic-block bar3'><div class='poster mosaic-backdrop'></div><div class='mosaic-overlay'><div class='title_container'><h4 class='title'>"+media.Title+"<div class='runtime'>("+media.Runtime+")</div></h4></div><p class='mosaic_blurb' > "+media.Released+" <br> " +media.Genre+ " </p> "+media.imdbRating+"</div></div></div>";
		
		// jQuery(function($){
				
			
		    
		    // });
		
		$("#container div.row:last-child").append(movie_view);
        if (media_count%3>1)
            {
            var popover_delay = { show: 100, hide: 500 };
            $("#container #media_"+media_count).popover({'trigger':'click','title':media.Title,'content':'<div class="synopsis"><h4>Synopsis</h4>'+media.Plot+'</div><div class="actors"><strong>Actors </strong><i>'+media.Actors+'</i></div>','html':'true','placement':'left','delay':popover_delay});
        //$("#console").append("<webview src='"+ cover_url + "'></webview>");
            }
        else
            {
        var popover_delay = { show: 100, hide: 500 };
        $("#container #media_"+media_count).popover({'trigger':'click','title':media.Title,'content':'<div class="synopsis"><h4>Synopsis</h4>'+media.Plot+'</div><div class="actors"><strong>Actors </strong><i>'+media.Actors+'</i></div>','html':'true','placement':'right','delay':popover_delay});
        //$("#console").append("<webview src='"+ cover_url + "'></webview>");
            }
		var xhr = new XMLHttpRequest();
		xhr.open('GET', cover_url, true);
		xhr.responseType = 'blob';
		var imageLocation = "#container #media_"+media_count+ " div.poster";
		xhr.onload = function(e) {
		  var img = document.createElement('img');
		  img.src = window.webkitURL.createObjectURL(this.response);
		  // document.body.appendChild(img);
		  $(imageLocation).append(img);
		};

		xhr.send();




		media_count++;
		console.log("Media count in now:"+media_count, media);








			$('.circle').mosaic({
					opacity		:	0.8			//Opacity for overlay (0-1)
				});
				
				$('.fade').mosaic();
				
				$('.bar').mosaic({
					animation	:	'slide'		//fade or slide
				});
				
				$('.bar2').mosaic({
					animation	:	'slide'		//fade or slide
				});
				
				$('.bar3').mosaic({
					animation	:	'slide',	//fade or slide
					anchor_y	:	'top'		//Vertical anchor position
				});
				
				$('.cover').mosaic({
					animation	:	'slide',	//fade or slide
					hover_x		:	'400px'		//Horizontal position on hover
				});
				
				$('.cover2').mosaic({
					animation	:	'slide',	//fade or slide
					anchor_y	:	'top',		//Vertical anchor position
					hover_y		:	'80px'		//Vertical position on hover
				});
				
				$('.cover3').mosaic({
					animation	:	'slide',	//fade or slide
					hover_x		:	'400px',	//Horizontal position on hover
					hover_y		:	'300px'		//Vertical position on hover
				});
	};

var fnFindMediaInfo = function(mediaFile) {      
        var title = filenameToTitle(mediaFile.file.name);
        var year = filenameToYear(mediaFile.file.name);

        console.log("TITLE=" + title);

        var url = 'http://www.imdbapi.com/?t=' + title + "&y=" + year;
        fnCallAPI(url,mediaFile.file.fullPath);
    };

var fnCallAPI = function(url,media_id) {
        $.getJSON(url, function(data) {
            if(data.Response != "Parse Error") {
                fnAddMedia(data,media_id);
            } else {
                console.log("Something went wrong ;(. IMDB API error", media_id, url, data);
                // TODO: error handeling 
            }
        });
    };

var filenameToYear = function(filename) {
    year = filename.match(/\d{4}/);
    return year;
};

var filenameToTitle = function(filename) {
    filename = filename.replace(/(\[|\(|dvd|brrip|bdrip|tvrip|r5|avi|mpeg).*/i, '')
            .replace(/\d{4}/i,'').replace(/[\.\s]/g, '+');
    return filename;
};


fnStartApp();
