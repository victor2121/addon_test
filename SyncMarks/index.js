var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
	createBookmark("Test", "http://google.de");
	getsAllBookmarks();
}

function getsAllBookmarks(){
	let { search } = require("sdk/places/bookmarks");
	search(
	  { query: "" }
	).on("end", function (results) {
	  for(let i = 0; i < results.length; ++i) {
		console.log("title : " + results[i].title);
		console.log("group : " + results[i].group.title);
	  }
	});

}

function createBookmark(aTitle, aUrl){
	let { Bookmark, save } = require("sdk/places/bookmarks");

	// Create a new bookmark instance, unsaved
	let bookmark = Bookmark({ title: aTitle, url: aUrl });
	
	// Attempt to save the bookmark instance to the Bookmarks database
	// and store the emitter
	let emitter = save(bookmark);
	
	// Listen for events
	emitter.on("data", function (saved, inputItem) {
	  // on a "data" event, an item has been updated, passing in the
	  // latest snapshot from the server as `saved` (with properties
	  // such as `updated` and `id`), as well as the initial input
	  // item as `inputItem`
	  console.log(saved.title === inputItem.title); // true
	  console.log(saved !== inputItem); // true
	  console.log(inputItem === bookmark); // true
	}).on("end", function (savedItems, inputItems) {
	  // Similar to "data" events, except "end" is an aggregate of
	  // all progress events, with ordered arrays as `savedItems`
	  // and `inputItems`
	});
	
}


