var gGalleryIndex = 0; // gallery currently being iterated
var gDirectories = [];     // used to process subdirectories
var gGalleryArray = []; // holds information about all top-level Galleries found
var gGalleryData = []; // hold computed information about each Gallery
var self = this;

var vidFormats = ['3gp', '3gpp', 'avi', 'flv', 'mov', 'mpeg', 'mpeg4', 'mp4', 'webm', 'wmv'];

console.log("Media Database Manager javascript ....");

var fnStartApp = function() {
		fnBind();
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
        $("#testButton").click(function() {            
            $("#console").append("Loading metadata from localStorage<br />");
            fnLoadDataFromStorage();            
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

                // if(gGalleryArray.length > 0) {
                    
                // }
            }
        });
        $("#selectFolders").click(function() {
            $("#console").append("getMediaFileSystems");
            chrome.mediaGalleries.getMediaFileSystems({
                interactive: 'yes'
            }, getGalleriesInfo);
        });
        $(".form-search").submit(function() {
            // search in chrome.storage
        });
    };

var fnAddMedia = function(media, media_id) {
        fnAddMediaToUI(media);
        fnSaveMediaToLocalStorage(media, media_id);
    };

var fnLoadDataFromStorage = function() {
	chrome.storage.local.get(null, function(results) {
		$.each(results,function(media_id,data){
			$("#console").append("Loaded " + media_id + "<br />");
			self.fnAddMediaToUI(data);	
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
                console.log("Something went wrong ;(. IMDB API error", data);
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

function fnSearch (parameter) {
    // body...
}


fnStartApp();
