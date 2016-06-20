# Simple JS Search Readme
------
This is a simple search js plugin. But take a look ;)

## How to configure it:
```javascript  
/**
 * Example Config
 *
 */
var conf = {
	"settings": {
		"debug": true,
		"highlighting": "class='highlighted'",
		"inputSelector": "#search",
		"searchInSelector": ".btn-content",
		"indexSelector": "#index"
	},
	"callback": function(index){
	
		/**   
		 *	 This is an callback function for the
		 *   seach, that code part define
		 *   the event of the result request   
		 */
		 
		that.index = index;
		if($(this).text().toLowerCase().indexOf(that.query.toLowerCase()) < 0){
			$(this).parent().parent().parent().parent().parent().fadeOut();
		} else {
			$(this).parent().parent().parent().parent().parent().fadeIn();

			if(that.query.trim().length >= 0){
				// text of current element
				var title = $(this).text().trim();
				// calculate the start of highlighting
				var highlightStart = title.trim().toLowerCase().indexOf(that.query.trim().toLowerCase());
				// define the highlighting span
				var textSpan = '<span ' + that.highlighting + '>'+title.substr(highlightStart, that.query.length)+'</span>';
				// define output render string
				var highlightedTitle = title.substr(0, highlightStart)
					+ textSpan
					+ title.substr(highlightStart + that.query.length);
				// overwrite title
				$(this).html(highlightedTitle);
			}
		}
	}
};
```


## How to use it:
* Incule search.js file (after jQuery)
* Add your config after your include of search.js 

#### Example setup:
```javascript
/**
 *  Initialize search 
 */
$().ready(function () {
	// here setup your config
	var conf = {};
	// start plugin
	new SearchPlugin(conf);

	// set input focus on search input
	$('#search').focus();
});
```