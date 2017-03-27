// util.js - Common utilities

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    if (tabs.length > 0) {
      // Get the current tab
      var tab = tabs[0];

      // A tab is a plain object that provides information about the tab.
      // See https://developer.chrome.com/extensions/tabs#type-Tab
      var url = tab.url;

      // tab.url is only available if the "activeTab" permission is declared.
      // If you want to see the URL of other tabs (e.g. after removing active:true
      // from |queryInfo|), then the "tabs" permission is required to see their
      // "url" properties.
      console.assert(typeof url == 'string', 'tab.url should be a string');

      callback(url);
    } else {
      callback(null);
    }
  });
}

/**
 * Determine if the page is an Eventbrite event page
 *
 * @param {function(boolean)} callback - called after the URL is tested.
 */
function isEventbriteEventPage(callback) {
  // Get the URL of the current tab.
  getCurrentTabUrl(function(url) {
    // The pattern of the search.
    var pattern = "^(https?:\/\/(.+?\.)?eventbrite\.com\/e\/";

    // Test the pattern against the url.
    callback(new RegExp(pattern).test(url));
  })
}
