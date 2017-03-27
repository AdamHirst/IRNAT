/**
 * Returns details about the event
 */
function getEventDetail() {
  // Scrape the attributes from the page
  var title = document.getElementsByClassName("listing-hero-title")[0]
                .innerHTML;
  var image = document.getElementsByClassName("listing-hero-image")[0]
                .parentNode.getAttribute("content");

  // Wrap it in a single object
  var eventDetail = {
    title: title,
    image: image
  }

  // Return the details
  return eventDetail;
}

// Register the action with Chrome
chrome.runtime.sendMessage({
  action: "getEventDetail",
  eventDetail: getEventDetail()
});
