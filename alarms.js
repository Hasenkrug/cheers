(function() {
    'use strict';

    var alarmName = 'remindme';

    function checkAlarm(callback) {
        chrome.alarms.getAll(function(alarms) {
            var hasAlarm = alarms.some(function(a) {
                return a.name == alarmName;
            });

            var newLabel;
            if (hasAlarm) {
                newLabel = 'Deaktiviere Erinnerungen';
            } else {
                newLabel = 'Aktiviere Erinnerungen';
            }
            document.getElementById('toggleAlarm').innerText = newLabel;

            if (callback) callback(hasAlarm);
        });
    }

    function createAlarm() {
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

    function cancelAlarm() {
        chrome.alarms.clear(alarmName);
        chrome.notifications.create('reminder', {
            type: 'basic',
            iconUrl: 'icon_128.png',
            title: 'Kurze Info:',
            message: 'Der Reminder ist jetzt inaktiv!'
        }, function(notificationId) {});
    }

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

    function userInput() {
        return document.getElementById('delayInMinutes').value;
    }

    $$('#toggleAlarm').addEventListener('click', doToggleAlarm);

    checkAlarm();
})();
