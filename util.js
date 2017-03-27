// util.js - Common application utilities

/**
 * Get the active tab as a Tab object.
 * See https://developer.chrome.com/extensions/tabs#type-Tab
 *
 * @param {function(Tab)} callback - called when the active tab object is
 *   retrieved.
 */
function getActiveTab(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // Get the active tab. Due to the queryInfo, we can safely assume that tabs
    // is a non-null array of tabs with at least one window active.
    var tab = tabs[0];

    callback(tab);
  });
}

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Get the active tab
  getActiveTab(function(tab) {
    // Get the URL of the active tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
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
    var pattern = "^(https?:\/\/(.+?\.)?eventbrite\.com\/e\/)";

    // Test the pattern against the url.
    callback(new RegExp(pattern).test(url));
  })
}

/**
 * Run the callback only if the page is an eventbrite page
 *
 * @param {function()} callback - called if and only if the active tab is an
 *   eventbrite event page.
 */
function runOnEventbriteEventPage(callback) {
  isEventbriteEventPage(function(e) {
    if (e) callback();
  })
}
