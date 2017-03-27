// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Starts the background runner to get the ticket.
 *
 * @param {function()=} callback - called once the runner has been
 *   started.
 */
function toggleBackgroudRunner() {
  var el = document.getElementById("irnat_button");
  chrome.storage.sync.get(null, function (data) {
    if (data.run) {
      // Disable
      // Unset the run flag in storage
      chrome.storage.sync.remove('run');

      // Change the button style
      el.innerHTML = "I really need a ticket.";
      el.className = "btn";
    } else {
      // Enable
      // Tell the background runner to run
      chrome.storage.sync.set({'run': true});

      // Reload the tab
      chrome.tabs.reload();

      // Change the button style
      el.innerHTML = "Stop";
      el.className += " btn-red";
    }
  });
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
  // Run only on an Eventbrite page
  runOnEventbriteEventPage(function(url) {
    // Change the display
    document.getElementById("non-eventbrite").style.display = "none";
    document.getElementById("eventbrite").style.display = "block";
    document.getElementById("irnat_button").addEventListener("click", toggleBackgroudRunner);

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
