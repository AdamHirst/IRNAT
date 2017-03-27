// secureTicket.js - A script that will try to secure a ticket.

function secureTicket() {
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
