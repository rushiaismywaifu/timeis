let countdown;
let timerInterval;
let alarmTime;
let currentHour = new Date().getHours();
let darkMode = false;
let is24HourFormat = true; // 默認使用24小時格式

function updateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const day = now.getDay();
    const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
    const dayOfYear = Math.floor((now - new Date(year, 0, 0)) / 1000 / 60 / 60 / 24);
    const weekOfYear = Math.ceil((dayOfYear + new Date(year, 0, 1).getDay() + 1) / 7);
    const dayOfWeek = daysOfWeek[day];

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    let period = '';
    if (!is24HourFormat) {
        period = hours >= 12 ? '下午' : '上午';
        hours = hours % 12 || 12;
    }
    hours = String(hours).padStart(2, '0');

    document.getElementById('date').textContent = `今天是 ${year} 年 ${month} 月 ${date} 日 星期${dayOfWeek}`;
    document.getElementById('dayOfYear').textContent = `是今年的第 ${dayOfYear} 天，今年的第 ${weekOfYear} 周第 ${day + 1} 天`;
    document.getElementById('time').textContent = `目前時間為 ${period} ${hours} 時 ${minutes} 分 ${seconds} 秒`;

    checkAlarm(now);
    if (!darkMode) {
        checkHourlyChange(now);
    }
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
        alarmTime.setDate(alarmTime.getDate() + 1);
    }

    document.getElementById('alarmStatus').textContent = `鬧鐘設定於 ${String(alarmTime.getHours()).padStart(2, '0')}:${String(alarmTime.getMinutes()).padStart(2, '0')}`;
}

function checkAlarm(currentTime) {
    if (alarmTime && currentTime >= alarmTime) {
        document.getElementById('alarmStatus').textContent = '鬧鐘響了！';
        document.getElementById('alarm').play();
        alarmTime = null;
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomBackground() {
    if (!darkMode) {
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
    }
}

function checkHourlyChange(currentTime) {
    const newHour = currentTime.getHours();
    if (newHour !== currentHour) {
        currentHour = newHour;
        setRandomBackground();
    }
}

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    if (darkMode) {
        document.body.style.background = 'black';
    } else {
        setRandomBackground();
    }
    const icon = darkMode ? 'image/moon-icon.png' : 'image/sun-icon.png';
    document.getElementById('darkModeIcon').src = icon;
}

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    const icon = is24HourFormat ? 'image/24-hour-icon.png' : 'image/12-hour-icon.png';
    document.getElementById('timeFormatIcon').src = icon;
    updateTime(); // 立即更新時間顯示
}

window.onload = function() {
    updateTime();
    setRandomBackground();
    setInterval(updateTime, 1000);
};
