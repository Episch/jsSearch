// search

/**
 *
 * @param json conf
 * @constructor
 */
var SearchPlugin = function(conf) {

    // parse config json
    try {
        this.conf = JSON.parse(conf);
        console.log("configuration converted to Json");
    } catch(e) {
        this.conf = (conf);
        console.log("configuration is already Json");
    }
    this.index = parseInt(0);
    this.searchInSelector = ".btn-content";
    this.inputSelector = "#search";
    this.indexSelector = "#index";
    this.debug = false;
    this.highlighting = "class='highlighted'";
    this.query = '';

    if (typeof this.conf['settings'] != 'undefined') {

        if(typeof this.conf['settings']['searchInSelector'] != 'undefined'){
            this.searchInSelector = this.conf['settings']['searchInSelector'];
        }

        if (typeof this.conf['settings']['inputSelector'] != 'undefined') {
            this.inputSelector = this.conf['settings']['inputSelector'];
        }

        if (typeof this.conf['settings']['indexSelector'] != 'undefined') {
            this.indexSelector = this.conf['settings']['indexSelector'];
        }

        if (typeof this.conf['settings']['debug'] != 'undefined') {
            this.debug = this.conf['settings']['debug'];
        }

        if (typeof this.conf['settings']['highlighting'] != 'undefined') {
            this.highlighting = this.conf['settings']['highlighting'];
        }

        if (typeof this.conf['callback'] != 'undefined') {
            this.callback = this.conf['callback'];
        }
    }

    // debug start information
    if(this.debug == true){
        console.log("------------------------------------");
        console.log("search startet with: ");
        console.log("configuration:");
        console.log(this.conf);
        console.log("debug Mode: " + this.debug);
        console.log("------------------------------------");
        console.log("start initialize search");
    }

    // start init function
    this.init();
};
SearchPlugin.prototype =  {

    /**
     * Initiation function
     */
    init: function() {
        // debug selector
        if(this.debug == true){
            console.log("read out config");
            console.log("selectors:");
            console.log(this.inputSelector);
            console.log(this.searchInSelector);
            console.log("------------------------------------");
        }

        // update count
        this.index = $(this.searchInSelector).length;
        $(this.indexSelector).html(this.index);

        // debug selector
        if(this.debug == true){
            console.log("index updated");
            console.log("keyboard ist started");
            console.log("------------------------------------");
        }

        // prepare this scope for callback function
        that = this;
        $(this.inputSelector).keyup(function(event){

            // keyboard request input string
            var query = $(this).val();
            that.query = query;
            if(that.debug == true){
                console.log("Query: ");
                console.log(that.query);
                console.log("------------------------------------");
            }

            // search callback function call
            var selector = that.searchInSelector;
            $(selector).each(that.callback);
        });
    },
    callback: function(index){
        // refresh item index after search
        that.index = index;

        // compare query string with item titles
        if($(this).text().toLowerCase().indexOf(that.query.toLowerCase()) < 0){
            // item title dont match, fade out parent container
            $(this).parent().parent().parent().parent().parent().fadeOut();
        } else {
            // item title match, fade in parent container
            $(this).parent().parent().parent().parent().parent().fadeIn();

            // item title match make text highlighting
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

                console.log(that.query.trim().length);
            }

            console.log(2);
        }
    }
};
