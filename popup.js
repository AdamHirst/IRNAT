// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Starts the background runner to get the ticket.
 *
 * @param {function()=} callback - called once the runner has been
 *   started.
 */
function startBackgroudRunner() {
  chrome.storage.sync.set({'run': true});
  chrome.tabs.reload();
}

/*
 * Add a listener for responding to the getEventDetail scraper.
 */
chrome.runtime.onMessage.addListener(function(request, sender) {
  // Check the action of the message
  if (request.action == "getEventDetail") {
    // Set the title
    document.getElementsByClassName("card-title")[0].innerHTML
      = request.eventDetail.title;
    // Set the image
    document.getElementsByClassName("header-bg")[0].style.backgroundImage
      = "url('" + request.eventDetail.image + "')";
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Stop the background runner if its already running
  chrome.storage.sync.remove('run');

  // Run only on an Eventbrite page
  runOnEventbriteEventPage(function(url) {
    // Change the display
    document.getElementById("non-eventbrite").style.display = "none";
    document.getElementById("eventbrite").style.display = "block";
    document.getElementById("irnat_button").addEventListener("click", startBackgroudRunner);

    // Get the event details
    chrome.tabs.executeScript(null, {
      file: 'getEventDetail.js'
    }, function() {
      if (chrome.runtime.lastError) {
        // An error has occurred.
      }
    });
  });
});
