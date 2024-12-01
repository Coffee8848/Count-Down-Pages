// fireworks.js

// 创建一个简单的烟花动画
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks-container');
    
    // 创建一个简单的烟花元素
    const firework = document.createElement('div');
    firework.style.position = 'absolute';
    firework.style.width = '50px';
    firework.style.height = '50px';
    firework.style.backgroundColor = 'red';
    firework.style.borderRadius = '50%';
    firework.style.top = '50%';
    firework.style.left = '50%';
    fireworksContainer.appendChild(firework);

    // 使用 anime.js 来创建烟花动画
    anime({
        targets: firework,
        scale: [1, 5],
        opacity: [1, 0],
        translateX: [-100, 100],
        translateY: [-100, 100],
        duration: 2000,
        easing: 'easeOutQuad',
        complete: () => {
            fireworksContainer.removeChild(firework);
        }
    });
}

// 在倒计时结束时触发烟花动画
setTimeout(() => {
    createFireworks();
}, 5000); // 5秒后开始烟花动画
