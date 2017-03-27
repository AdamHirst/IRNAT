// background.js - Background runner

/*
 * Add a listener for responding to the secureTicket script.
 */
chrome.runtime.onMessage.addListener(function(request, sender) {
  // Check the action of the message
  if (request.action == "registerAttempt") {
    // Reload and try again if unsuccessful
    console.log("Registration was unsuccessful");
    if (!request.success) chrome.tabs.reload();
  }
});

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
      chrome.storage.sync.get(null, function(response) {
        console.log(response);

        if (response.run) {
          // Set the icon
          chrome.browserAction.setIcon({
            path: { "16": "/images/icon/16/icon_active.png",
                    "19": "/images/icon/19/icon_active.png",
                    "32": "/images/icon/32/icon_active.png",
                    "38": "/images/icon/38/icon_active.png" }
                  });

          // Try to secure the ticket
          console.log("Attempting ticket registration");

          chrome.tabs.executeScript(null, {
            file: 'secureTicket.js'
          }, function() {
            if (chrome.runtime.lastError) {
              // An error has occurred.
              console.warn("Error encountered:");
              console.warn(chrome.runtime.lastError);
            }
          });
        }
      })
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
