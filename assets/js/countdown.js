// countdown.js

// 设置新年日期
const newYear = new Date('2025-01-01T00:00:00').getTime();

// 更新倒计时
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = newYear - now;

    // 计算剩余时间
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // 显示倒计时
    countdownElement.innerHTML = `${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;

    // 如果倒计时结束
    if (timeLeft <= 0) {
        countdownElement.innerHTML = "新年快乐！";
        clearInterval(interval); // 停止倒计时
    }
}

// 每秒更新时间
const interval = setInterval(updateCountdown, 1000);
