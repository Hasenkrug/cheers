(function() {
  'use strict';

  var myNotificationID = null;
  var myNotificationCount = 0;
  var cheersers = ['٩(͡o.๏)۶', '٩(-̮̮̃•̃)۶', '٩(̾●̮̮̃̾•̃̾)۶', '٩(-̮̮̃-̃)۶', '٩(×̯×)۶', '(ñ_ñ)', 'o(≧o≦)o', '(~￣▽￣)~', '\n(─‿‿─) ...now i know...', 'ಥ_ಥ', ' (︶ω︶)', '(ಠ(ಠ(ಠ_ಠ)ಠ)ಠ)', '(¬‿¬)', '◔_◔'];

  /**
   *  popup opened handler
   */
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.text == 'popup-opened-trigger') {
      cancelBadge();
    }
  });

  /**
   *  notification click handler
   */
  chrome.notifications.onClicked.addListener(function(notificationId) {
    chrome.notifications.clear(notificationId, function() {});
    cancelBadge();
  });

  /**
   *  on alarm handler
   */
  chrome.alarms.onAlarm.addListener(function(alarm) {
    showNotification();
    playNotificationSound();
    showBadge();
  });

  /**
   *  shows the notification
   */
  function showNotification() {
    chrome.notifications.create('reminder', {
      type: 'basic',
      iconUrl: 'img/icon_128.png',
      title: 'Denk dran,',
      message: 'du musst auch mal was trinken! ' + getCheerser()
    }, function(id) {
      myNotificationID = id;
    });
  }

  /**
   *  returns a random cheerser
   */
  function getCheerser() {
    return cheersers[Math.floor(Math.random() * cheersers.length)];
  }

  /**
   *  plays the notification sound
   */
  function playNotificationSound() {
    var sound = new Audio('sound/sound.mp3');
    sound.play();
  }

  /**
   *  shows a badge on icon and increase counter
   */
  function showBadge() {
    myNotificationCount++;
    chrome.browserAction.setBadgeText({
      text: myNotificationCount.toString()
    });
  }

  /**
   *  hides a badge on icon and resets counter
   */
  function cancelBadge() {
    myNotificationCount = 0;
    chrome.browserAction.setBadgeText({
      text: ''
    });
  }

})();
