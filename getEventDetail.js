/**
 * Returns details about the event
 */
function getEventDetail() {
  // TODO: Implement
}

// Register the action with Chrome
chrome.runtime.sendMessage({
  action: "getEventDetail",
  source: getEventDetail()
});
