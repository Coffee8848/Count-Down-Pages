// 设置 canvas
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 重力加速度
const gravity = 0.05;

// 烟花粒子类
class Particle {
    constructor(x, y, angle, speed, hue) {
        this.x = x;
        this.y = y;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.hue = hue;
        this.size = 4;  // 粒子大小
        this.alpha = 1;  // 初始透明度
    }

    update() {
        // 更新速度
        this.speedY += gravity;  // 加上重力
        // 更新位置
        this.x += this.speedX;
        this.y += this.speedY;
        // 透明度减少
        this.alpha -= 0.005;
        if (this.alpha <= 0) {
            this.alpha = 0;
        }
    }

    draw() {
        // 创建径向渐变，实现边缘变色
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 50%, ${this.alpha})`);
        gradient.addColorStop(1, `hsla(${(this.hue + 50) % 360}, 100%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 烟花类
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hue = Math.random() * 360;
        this.particles = [];
        this.numParticles = 100;  // 粒子数量

        // 生成烟花的粒子，形成花朵形状
        for (let i = 0; i < this.numParticles; i++) {
            const angle = (Math.PI * 2) / this.numParticles * i;
            const speed = Math.random() * 3 + 2;
            this.particles.push(new Particle(this.x, this.y, angle, speed, this.hue));
        }
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
        }
    }

    draw() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].draw();
        }
    }

    // 判断是否所有粒子消失
    isComplete() {
        return this.particles.every(p => p.alpha <= 0);
    }
}

// 烟花效果管理
const fireworks = [];

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;  // 从任意位置发射
    fireworks.push(new Firework(x, y));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // 清除画布
    for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].update();
        fireworks[i].draw();

        if (fireworks[i].isComplete()) {
            fireworks.splice(i, 1);  // 移除已经完成的烟花
            i--;
        }
    }
    requestAnimationFrame(animate);  // 循环动画
}

// 按钮点击事件
document.getElementById('fireworks-button').addEventListener('click', function() {
    createFirework();  // 创建一个新的烟花
});

// 启动动画
animate();