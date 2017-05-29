(function() {
  'use strict';

  var alarmName = 'remindme';
  var periodInMinutes = '';

  /**
   *  check state and change label and icon
   */
  function checkAlarm(callback) {
    chrome.alarms.getAll(function(alarms) {

      var hasAlarm = alarms.some(function(a) {
        if (a.name == alarmName) {
          periodInMinutes = a.periodInMinutes;
          return true;
        }
        return false;
      });

      var newLabel;
      if (hasAlarm) {
        newLabel = 'Deaktiviere Erinnerungen';
        document.getElementById('delayInMinutes').value = periodInMinutes;
        chrome.browserAction.setIcon({
          path: 'img/icon_16-full.png'
        });
      } else {
        newLabel = 'Aktiviere Erinnerungen';
        chrome.browserAction.setIcon({
          path: 'img/icon_16-empty.png'
        });
      }

      document.getElementById('toggleAlarm').innerText = newLabel;

      if (callback) callback(hasAlarm);
    });
  }

  /**
   *  create the alarm and initial notification
   */
  function createAlarm() {

    // default delay of 60 seconds
    var userDelay = 60;

    if (userInput() != '') {
      userDelay = parseInt(userInput());
    }

    var alarmInfo = {
      delayInMinutes: userDelay,
      periodInMinutes: userDelay
    }

    chrome.alarms.create(alarmName, alarmInfo);
    chrome.notifications.create('reminder', {
      type: 'basic',
      iconUrl: 'img/icon_128.png',
      title: 'Info:',
      message: 'Die Erinnerungen sind jetzt aktiviert!'
    }, function(notificationId) {});
  }

  /**
   *  cancel the alarm and notificate user
   */
  function cancelAlarm() {
    chrome.alarms.clear(alarmName);
    chrome.browserAction.setBadgeText({
      text: ''
    });
    chrome.notifications.create('reminder', {
      type: 'basic',
      iconUrl: 'img/icon_128.png',
      title: 'Info:',
      message: 'Die Erinnerungen sind jetzt deaktiviert!'
    }, function(notificationId) {});

    document.getElementById('delayInMinutes').value = '';
  }

  /**
   *  toggle state
   */
  function doToggleAlarm() {
    checkAlarm(function(hasAlarm) {
      if (hasAlarm) {
        cancelAlarm();
      } else {
        createAlarm();
      }
      checkAlarm();
    });
  }

  $('#toggleAlarm').addEventListener('click', doToggleAlarm);

  /**
   *  returns the value from the delayInMinutes input field
   */
  function userInput() {
    return document.getElementById('delayInMinutes').value;
  }

  checkAlarm();

})();
