(function() {
    'use strict';

    var alarmName = 'remindme';

    /**
     *  check state and change label and icon
     */
    function checkAlarm(callback) {
        chrome.alarms.getAll(function(alarms) {
            var hasAlarm = alarms.some(function(a) {
                return a.name == alarmName;
            });

            var newLabel;
            if (hasAlarm) {
                newLabel = 'Deaktiviere Erinnerungen';
                chrome.browserAction.setIcon({path: "icon_16-full.png"});
            } else {
                newLabel = 'Aktiviere Erinnerungen';
                chrome.browserAction.setIcon({path: "icon_16-empty.png"});
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

        if (userInput() != "") {
            userDelay = parseInt(userInput());
        }

        var alarmInfo = {
            delayInMinutes: userDelay,
            periodInMinutes: userDelay
        }
        chrome.alarms.create(alarmName, alarmInfo);
        chrome.notifications.create('reminder', {
            type: 'basic',
            iconUrl: 'icon_128.png',
            title: 'Kurze Info:',
            message: 'Der Reminder ist jetzt aktiv!'
        }, function(notificationId) {});
    }

    /**
     *  cancel the alarm and notificate user
     */
    function cancelAlarm() {
        chrome.alarms.clear(alarmName);
        chrome.notifications.create('reminder', {
            type: 'basic',
            iconUrl: 'icon_128.png',
            title: 'Kurze Info:',
            message: 'Der Reminder ist jetzt inaktiv!'
        }, function(notificationId) {});
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

    /**
     *  get the input value
     */
    function userInput() {
        return document.getElementById('delayInMinutes').value;
    }

    $$('#toggleAlarm').addEventListener('click', doToggleAlarm);

    checkAlarm();
})();
