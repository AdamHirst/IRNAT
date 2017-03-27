/**
 * Returns details about the event
 */
function getEventDetail() {
  // Scrap the attributes from the page
  var title = $("h1.listing-hero-title")[0].innerHTML;
  var image = $("img.listing-hero-image").parent()[0].getAttribute("content");

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
