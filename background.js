// background.js - Background runner

function update() {
  isEventbriteEventPage(function(e) {
    if (e) {
      // Set the icon to inform the user the plugin may be used.
      chrome.browserAction.setIcon({
        path: { "16": "/images/icon/16/icon.png",
                "19": "/images/icon/19/icon.png",
                "32": "/images/icon/32/icon.png",
                "38": "/images/icon/38/icon.png" }
              });

      // Check if the runner is already active
    } else {
      chrome.browserAction.setIcon({
        path: { "16": "/images/icon/16/icon_bw.png",
                "19": "/images/icon/19/icon_bw.png",
                "32": "/images/icon/32/icon_bw.png",
                "38": "/images/icon/38/icon_bw.png" }
              });
    }
  });

  console.log("update");
}

chrome.tabs.onActivated.addListener(update);
chrome.tabs.onUpdated.addListener(update);
