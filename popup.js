// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Starts the background runner to get the ticket.
 *
 * @param {function()=} callback - called once the runner has been
 *   started.
 */
function startBackgroudRunner(callback) {
  chrome.storage.sync.set({'run': true}, callback);
}

/*
 * Add a listener for responding to the getEventDetail scraper.
 */
chrome.runtime.onMessage.addListener(function(request, sender) {
  // Check the action of the message
  console.log("Message!");
  if (request.action == "getEventDetail") {
    // Set the title
    $('div.card-title').innerHTML = request.eventDetail.title;
    // Set the image
    $('div.header-bg').css('background-image', "url('" +
      request.eventDetail.image + "')");
  }
})

document.addEventListener('DOMContentLoaded', function() {
  // Run only on an Eventbrite page
  isEventbriteEventPage(function(url) {
    console.log("This is eventbrite");
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
