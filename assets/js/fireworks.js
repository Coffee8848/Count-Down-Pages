// 设置 canvas
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 烟花粒子类
class Particle {
    constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.size = Math.random() * 3 + 1;  // 粒子大小
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * -6 - 3;
        this.alpha = 1;  // 初始透明度
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;  // 逐渐消失

        // 如果透明度小于0，粒子就不再显示
        if (this.alpha <= 0) {
            this.alpha = 0;
        }
    }

    draw() {
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
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
        this.numParticles = 100;
        
        // 生成烟花的粒子
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push(new Particle(this.x, this.y, this.hue));
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
    const y = Math.random() * canvas.height / 2;
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
