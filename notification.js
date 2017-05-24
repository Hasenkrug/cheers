function showNotification() {
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'icon_128.png',
        title: 'Denk dran,',
        message: 'du musst auch mal was trinken! ٩(͡๏̯͡๏)۶'
    }, function(notificationId) {});
}

function playNotification() {
    var sound = new Audio('sound.mp3');
    sound.play();
}

chrome.notifications.onClicked.addListener(function(notificationId) {
    chrome.notifications.clear(notificationId, function() {});
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    showNotification();
    playNotification();
});
