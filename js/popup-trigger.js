/**
 *  notificates background that popup opened
 */
chrome.runtime.sendMessage({text: "popup-opened-trigger"});
