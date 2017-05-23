function showNotification() {
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'icon_128.png',
        title: 'Denk dran,',
        message: 'du musst auch mal was trinken. ^^'
    }, function(notificationId) {});
}

chrome.notifications.onClicked.addListener(function(notificationId) {
    chrome.notifications.clear(notificationId, function() {});
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    showNotification();
});
