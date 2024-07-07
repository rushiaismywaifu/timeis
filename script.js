let countdown;
let timerInterval;
let alarmTime;
let alarmInterval;

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('time').textContent = `目前時間為${hours}時${minutes}分${seconds}秒`;

    checkAlarm(now);
}

function startTimer() {
    const hours = parseInt(document.getElementById('inputHours').value) || 0;
    const minutes = parseInt(document.getElementById('inputMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('inputSeconds').value) || 0;
    countdown = hours * 3600 + minutes * 60 + seconds;

    if (isNaN(countdown) || countdown <= 0) {
        alert("請輸入有效的時間！");
        return;
    }

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (countdown > 0) {
        countdown--;
        const hours = Math.floor(countdown / 3600);
        const minutes = Math.floor((countdown % 3600) / 60);
        const seconds = countdown % 60;
        document.getElementById('timer').textContent = `剩餘時間：${String(hours).padStart(2, '0')}時${String(minutes).padStart(2, '0')}分${String(seconds).padStart(2, '0')}秒`;
    } else {
        clearInterval(timerInterval);
        document.getElementById('timer').textContent = '時間到！';
        document.getElementById('alarm').play();
    }
}

function setAlarm() {
    const hours = parseInt(document.getElementById('alarmHours').value);
    const minutes = parseInt(document.getElementById('alarmMinutes').value);

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        alert("請輸入有效的時間！");
        return;
    }

    const now = new Date();
    alarmTime = new Date();
    alarmTime.setHours(hours, minutes, 0, 0);

    if (alarmTime <= now) {
        alarmTime.setDate(alarmTime.getDate() + 1);  // If the time is already past, set for the next day
    }

    document.getElementById('alarmStatus').textContent = `鬧鐘設定於 ${String(alarmTime.getHours()).padStart(2, '0')}:${String(alarmTime.getMinutes()).padStart(2, '0')}`;
}

function checkAlarm(currentTime) {
    if (alarmTime && currentTime >= alarmTime) {
        clearInterval(alarmInterval);
        document.getElementById('alarmStatus').textContent = '鬧鐘響了！';
        document.getElementById('alarm').play();
        alarmTime = null;  // Reset alarmTime
    }
}

setInterval(updateTime, 1000); // 每秒更新一次時間
