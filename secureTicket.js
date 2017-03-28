// secureTicket.js - A script that will try to secure a ticket.

/**
 * Attempts to register a ticket for the active event.
 */
function secureTicket() {
  // TODO: As per #2 and #6, this needs to be updated.
  var el = document.getElementsByClassName("js-register-button")[0];
  if (el.disabled) {
    return false;
  }
  document.getElementsByClassName("js-register-button")[0].click();
  return true;
}

chrome.runtime.sendMessage({
  action: "registerAttempt",
  success: secureTicket()
});
