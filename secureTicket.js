// secureTicket.js - A script that will try to secure a ticket.

function secureTicket() {
  var el = document.getElementsByClassName("js-register-button")[0];
  if (el.disabled) {
    console.log("el is disabled");
    return false;
  }
  console.log("el not disabled");
  document.getElementsByClassName("js-register-button")[0].click();
  console.log("Returning true");
  return true;
}

chrome.runtime.sendMessage({
  action: "registerAttempt",
  success: secureTicket()
});
