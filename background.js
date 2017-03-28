// background.js - Background runner

/*
 * Add a listener for responding to the secureTicket script.
 */
chrome.runtime.onMessage.addListener(function(request, sender) {
  // Check the action of the message
  if (request.action == "registerAttempt") {
    // Reload and try again if unsuccessful
    if (!request.success) chrome.tabs.reload();
  }
});

/**
 * Sets the icon of the extension.
 *
 * @param {string} iconName - the name of the icon to set. Can be icon, icon_bw
 *   or icon_active.
 */
function setIcon(iconName) {
  // If iconName is not set, set it to the default black and white icon.
  if (typeof iconName === 'undefined') { iconName = "icon_bw"; }

  // Set the icon
  chrome.browserAction.setIcon({
    path: {
      "16": "/images/icon/16/" + iconName + ".png",
      "19": "/images/icon/19/" + iconName + ".png",
      "32": "/images/icon/32/" + iconName + ".png",
      "38": "/images/icon/38/" + iconName + ".png"
    }
  });
}

/**
 *
 *
 * @param {boolean} isEventbrite - is the page an eventbrite page
 */
function setPopup(isEventbrite, callback) {
  if (isEventbrite) {
    // Set the popup to the Eventbrite popup
    chrome.browserAction.setPopup({ popup: 'eventbrite_popup.html' });
  } else {
    // Set the popup to the default popup
    chrome.browserAction.setPopup({ popup: 'default_popup.html' });
  }
}

/**
 * Updates the state of the plugin.
 */
function update() {
  isEventbriteEventPage(function(e) {
    // Set the popup depending on whether this is an Eventbrite event page.
    setPopup(e);

    if (e) {
      // Set the icon to inform the user the plugin may be used.
      setIcon("icon");

      // Check if the runner is already active
      chrome.storage.sync.get(null, function(response) {
        if (response.run) {
          // Set the icon
          setIcon("icon_active");

          // Try to secure the ticket
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
      setIcon("icon_bw");
    }
  });
}

chrome.tabs.onActivated.addListener(update);
chrome.tabs.onUpdated.addListener(update);
