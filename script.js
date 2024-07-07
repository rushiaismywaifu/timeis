let countdown;
let timerInterval;

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('time').textContent = `目前時間為${hours}時${minutes}分${seconds}秒`;
}

function startTimer() {
    const hours = parseInt(document.getElementById('inputHours').value) || 0;
    const minutes = parseInt(document.getElementById('inputMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('inputSeconds').value) || 0;
    countdown = hours * 3600 + minutes * 60 + seconds;

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

setInterval(updateTime, 1000); // 每秒更新一次時間
