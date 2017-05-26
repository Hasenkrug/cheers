(function() {
  //'use strict';

  var myNotificationID = null;
  var myNotificationCount = 0;

  function showNotification() {
    chrome.notifications.create('reminder', {
      type: 'basic',
      iconUrl: 'img/icon_128.png',
      title: 'Denk dran,',
      message: 'du musst auch mal was trinken! ٩(͡๏̯͡๏)۶'
    }, function(id) {
      myNotificationID = id;
    });
  }

  function playNotificationSound() {
    var sound = new Audio('sound/sound.mp3');
    sound.play();
  }

  /**
   *
   */
  chrome.notifications.onClicked.addListener(function(notificationId) {
    chrome.notifications.clear(notificationId, function() {});
    cancelBadge();
  });

  /**
   *
   */
  chrome.alarms.onAlarm.addListener(function(alarm) {
    showNotification();
    playNotificationSound();
    showBadge();
  });

  function showBadge() {
    myNotificationCount++;
    chrome.browserAction.setBadgeText({
      text: myNotificationCount + ''
    });
  }

  function cancelBadge() {
    myNotificationCount = 0;
    chrome.browserAction.setBadgeText({text:''});
  }
  
})();
