/*

TODO:

(1): Compile all images on page and store in array.
(2): Load list of pepes (static/dynamic???)
    -- Use reddit api... like this: https://www.reddit.com/r/pepes/hot/.json?count=20
(3): Match each image with a Pepe of similar size
(4): Replace images

*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
        var imgs = document.getElementsByTagName("img");
        var imgSrcs = [];
        //loop through images, get dimensions
        //i don't care about super tiny images 
        for (var i = 0; i < imgs.length; i++) {
            
            var width = imgs[i].clientWidth;
            var height = imgs[i].clientHeight;
            //...and add the images if they meet requirements
            if (width > 30 && height > 30){
                imgSrcs.push(imgs[i].src);
                console.log("Width: " + width + ' Height: ' + height);
            }
        }
        //console.log(imgSrcs);
        
        //load twice as many reddit posts from the reddit api to be safe
        //i.e account for posts that don't include images...
        var redditUrl = 'https://www.reddit.com/r/pepes/hot.json?count=' + imgSrcs.length * 2;
        
        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.onreadystatechange = function() {
            if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200){
                JSON(xmlHTTP.responseText);
            }
        }
        xmlHTTP.open("GET", redditUrl, true); // true for asynchronous 
        xmlHTTP.send(null);
    }
  }
);