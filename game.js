// ==========================================
// 1. SES YÖNETİM MODÜLÜ 
// ==========================================
class AudioController {
    constructor() {
        this.bgMusic = new Audio('sounds/background.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.4;

        this.actionMusic = new Audio('sounds/action.mp3');
        this.actionMusic.loop = false;
        this.actionMusic.volume = 0.8;
    }

    playBg() {
        this.actionMusic.pause();
        this.actionMusic.currentTime = 0;
        this.bgMusic.play().catch(e => console.error("Arka plan müziği çalınamadı:", e));
    }

    playAction() {
        this.bgMusic.pause();
        this.actionMusic.currentTime = 0; 
        this.actionMusic.play().catch(e => console.error("Aksiyon sesi hatası:", e));
    }

    stopAll() {
        this.bgMusic.pause();
        this.actionMusic.pause();
        this.actionMusic.currentTime = 0;
    }

    setTension(isStressed) {
        if (isStressed) {
            this.bgMusic.playbackRate = 1.3; 
        } else {
            this.bgMusic.playbackRate = 1.0; 
        }
    }
}

const gameAudio = new AudioController();

// ==========================================
// 2. ASSET (RESİM) YÜKLEME BÖLÜMÜ
// ==========================================
const imgStraight = new Image(); imgStraight.src = 'images/straight.png';
const imgCorner = new Image();   imgCorner.src = 'images/corner.png';
const imgT = new Image();        imgT.src = 'images/t_shape.png';
const imgCross = new Image();    imgCross.src = 'images/cross.png';
const imgEmpty = new Image();    imgEmpty.src = 'images/lav.png'; 
const imgFullBackground = new Image(); imgFullBackground.src = 'images/tum_arkaplan.jpg';

// ==========================================
// 3. DURUM DEĞİŞKENLERİ VE LEVELLER
// ==========================================
const totalLevels = 9;
let unlockedLevels = 1;
let currentLevel = 1;
let timeLeft = 0;
let turnsLeft = 0;
let timerInterval = null;
let isGameOver = false; 
let isAnimating = false; 
let characterPos = null;

const levels = [
    {
        gridSize: 3, timeLimit: 10, turnLimit: 10, 
        startCell: { r: 1, c: 0, edge: 3 }, endCell: { r: 1, c: 2, edge: 1 },
        map: [
            [{type: 'empty', angle: 90}, {type: 'empty', angle: 0}, {type: 'empty', angle: 180}],
            [{type: 'L', angle: 90}, {type: 'empty', angle: 0}, {type: 'L', angle: 0}],
            [{type: 'L', angle: 0}, {type: 'I', angle: 90}, {type: 'L', angle: 270}]
        ]
    },
    {
        gridSize: 3, timeLimit: 10, turnLimit: 15, 
        startCell: { r: 0, c: 0, edge: 0 }, endCell: { r: 2, c: 2, edge: 2 },
        map: [
            [{type: 'I', angle: 90}, {type: 'empty', angle: 0}, {type: 'T', angle: 180}],
            [{type: 'L', angle: 90}, {type: 'I', angle: 0}, {type: 'L', angle: 0}],
            [{type: 'L', angle: 0}, {type: 'I', angle: 90}, {type: 'I', angle: 270}]
        ]
    },
    {
        gridSize: 3, timeLimit: 15, turnLimit: 15, 
        startCell: { r: 0, c: 1, edge: 0 }, endCell: { r: 0, c: 2, edge: 0 },
        map: [
            [{type: 'T', angle: 90}, {type: 'L', angle: 0}, {type: 'I', angle: 180}],
            [{type: 'I', angle: 90}, {type: 'I', angle: 0}, {type: 'T', angle: 0}],
            [{type: 'L', angle: 0}, {type: '+', angle: 90}, {type: 'L', angle: 270}]
        ]
    },
    {
        gridSize: 4, timeLimit: 15, turnLimit: 20, 
        startCell: { r: 0, c: 2, edge: 0 }, endCell: { r: 3, c: 1, edge: 2 },
        map: [
            [{type: 'L', angle: 0}, {type: 'I', angle: 90}, {type: 'T', angle: 180}, {type: 'L', angle: 270}],
            [{type: 'I', angle: 0}, {type: 'empty', angle: 0}, {type: 'L', angle: 90}, {type: 'I', angle: 0}],
            [{type: 'T', angle: 90}, {type: 'L', angle: 270}, {type: 'I', angle: 0}, {type: 'I', angle: 90}],
            [{type: 'L', angle: 180}, {type: 'I', angle: 90}, {type: 'T', angle: 0}, {type: 'L', angle: 90}]
        ]
    },
    {
        gridSize: 4, timeLimit: 20, turnLimit: 20, 
        startCell: { r: 0, c: 0, edge: 0 }, endCell: { r: 3, c: 3, edge: 1 },
        map: [
            [{type: 'L', angle: 90}, {type: 'T', angle: 0}, {type: 'L', angle: 180}, {type: 'empty', angle: 0}],
            [{type: '+', angle: 0}, {type: '+', angle: 90}, {type: 'T', angle: 180}, {type: 'I', angle: 90}],
            [{type: 'I', angle: 0}, {type: 'L', angle: 270}, {type: 'I', angle: 0}, {type: 'L', angle: 90}],
            [{type: 'empty', angle: 0}, {type: 'I', angle: 90}, {type: 'T', angle: 270}, {type: 'L', angle: 0}]
        ]
    },
    {
        gridSize: 4, timeLimit: 20, turnLimit: 25, 
        startCell: { r: 0, c: 0, edge: 3 }, endCell: { r: 1, c: 0, edge: 3 },
        map: [
            [{type: 'I', angle: 90}, {type: 'I', angle: 0}, {type: 'I', angle: 180}, {type: 'L', angle: 0}],
            [{type: 'I', angle: 0}, {type: 'L', angle: 90}, {type: 'L', angle: 180}, {type: 'T', angle: 90}],
            [{type: 'L', angle: 0}, {type: 'L', angle: 270}, {type: 'I', angle: 0}, {type: 'L', angle: 90}],
            [{type: '+', angle: 0}, {type: 'I', angle: 90}, {type: 'T', angle: 270}, {type: 'L', angle: 0}]
        ]
    },
    {
        gridSize: 5, timeLimit: 25, turnLimit: 25, 
        startCell: { r: 4, c: 0, edge: 2 }, endCell:  { r: 0, c: 4, edge: 0 },
        map: [
            [{type: 'I', angle: 90}, {type: 'empty', angle: 180}, {type: 'T', angle: 0}, {type: 'I', angle: 180},{type: 'T', angle: 270}],
            [{type: 'L', angle: 0}, {type: 'T', angle: 270}, {type: 'empty', angle: 270}, {type: '+', angle: 180},{type: 'I', angle: 0}],
            [{type: 'empty', angle: 90}, {type: 'T', angle: 90}, {type: 'I', angle: 90}, {type: 'L', angle: 0},{type: '+', angle: 180}],
            [{type: 'T', angle: 270}, {type: '+', angle: 0}, {type: 'L', angle: 270}, {type: 'T', angle: 90},{type: 'L', angle: 180}],
            [{type: 'I', angle: 180}, {type: 'empty', angle: 0}, {type: 'T', angle: 180}, {type: 'I', angle: 270},{type: 'empty', angle: 90}],
        ]
    },
    {
        gridSize: 5, timeLimit: 25, turnLimit: 25, 
        startCell: { r: 0, c: 1, edge: 0 }, endCell: { r: 4, c: 4, edge: 1 },
        map: [
            [{type: 'I', angle: 90}, {type: 'I', angle: 0}, {type: 'T', angle: 180}, {type: 'I', angle: 0},{type: 'empty', angle: 90}],
            [{type: 'empty', angle: 180}, {type: 'T', angle: 180}, {type: '+', angle: 180}, {type: '+', angle: 0},{type: 'L', angle: 0}],
            [{type: '+', angle: 90}, {type: 'T', angle: 90}, {type: 'I', angle: 270}, {type: 'empty', angle: 0},{type: '+', angle: 90}],
            [{type: 'I', angle: 0}, {type: 'empty', angle: 0}, {type: 'L', angle: 180}, {type: 'T', angle: 0},{type: 'L', angle: 0}],
            [{type: 'L', angle: 90}, {type: 'I', angle: 270}, {type: 'T', angle: 180}, {type: 'I', angle: 0},{type: 'L', angle: 180}],
        ]
    },
    {
        gridSize: 5, timeLimit: 25, turnLimit: 25, 
        startCell: { r: 1, c: 0, edge: 3 }, endCell: { r: 3, c: 4, edge: 1 },
        map: [
            [{type: 'I', angle: 90}, {type: 'empty', angle: 0}, {type: 'T', angle: 180}, {type: 'I', angle: 0},{type: 'T', angle: 0}],
            [{type: 'L', angle: 90}, {type: 'T', angle: 0}, {type: 'empty', angle: 0}, {type: '+', angle: 0},{type: 'L', angle: 0}],
            [{type: 'T', angle: 90}, {type: 'T', angle: 0}, {type: 'T', angle: 180}, {type: 'I', angle: 0},{type: '+', angle: 0}],
            [{type: 'empty', angle: 90}, {type: '+', angle: 0}, {type: 'L', angle: 90}, {type: 'T', angle: 0},{type: 'L', angle: 0}],
            [{type: 'L', angle: 90}, {type: 'empty', angle: 0}, {type: 'T', angle: 180}, {type: 'I', angle: 0},{type: 'empty', angle: 0}],
        ]
    }
];

let currentGrid = [];
let currentGridSize = 3;
let currentStart = {r: 0, c: 0, edge: 0};
let currentEnd = {r: 2, c: 2, edge: 1};
let tileSize = 0;

// ==========================================
// 4. HTML ELEMENTLERİ SEÇİMİ
// ==========================================
const startScreen = document.getElementById('startScreen');
const levelScreen = document.getElementById('levelScreen');
const gameScreen = document.getElementById('gameScreen');
const levelGrid = document.getElementById('levelGrid');
const messageArea = document.getElementById('messageArea');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartBtn = document.getElementById('restartBtn');

// ==========================================
// 5. EKRAN YÖNETİMİ
// ==========================================
function showScreen(screenElement) {
    startScreen.style.display = 'none';
    levelScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    screenElement.style.display = 'flex';
}

function renderLevelButtons() {
    levelGrid.innerHTML = '';
    for (let i = 1; i <= totalLevels; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('level-btn');
        if (i > unlockedLevels) {
            btn.classList.add('locked'); btn.disabled = true;
        } else {
            btn.onclick = () => startLevel(i);
        }
        levelGrid.appendChild(btn);
    }
}

function clamp(val, max) { 
    return Math.max(0, Math.min(val, max - 1)); 
}

function startLevel(levelNum) {
    isAnimating = false; 
    characterPos = null;
    
    currentLevel = levelNum;
    document.getElementById('currentLevelText').innerText = "Level " + levelNum;
    messageArea.innerText = ""; 
    showScreen(gameScreen);
    
    let levelData = levels[levelNum - 1] || levels[0]; 
    currentGridSize = levelData.gridSize;
    
    currentStart = { 
        r: clamp(levelData.startCell.r, currentGridSize), 
        c: clamp(levelData.startCell.c, currentGridSize), 
        edge: levelData.startCell.edge 
    };
    currentEnd = { 
        r: clamp(levelData.endCell.r, currentGridSize), 
        c: clamp(levelData.endCell.c, currentGridSize), 
        edge: levelData.endCell.edge 
    };
    
    tileSize = canvas.width / currentGridSize;
    currentGrid = levelData.map.map(row => row.map(cell => ({...cell}))); 
    drawGame();

    isGameOver = false;
    timeLeft = levelData.timeLimit || 60; 
    turnsLeft = levelData.turnLimit || 30;
    
    updateStatsUI();
    clearInterval(timerInterval); 
    
    gameAudio.setTension(false);
    gameAudio.playBg();
    
    timerInterval = setInterval(() => {
        if (isAnimating || isGameOver) return; 
        timeLeft--;
        updateStatsUI();
        
        if (timeLeft <= 5) {
            gameAudio.setTension(true);
        }

        if (timeLeft <= 0) {
            gameAudio.stopAll();
            triggerGameOver("Süren Doldu!");
        }
    }, 1000); 
}

// ==========================================
// 6. ÇİZİM FONKSİYONLARI 
// ==========================================
function getEdgeCoords(r, c, edge) {
    let cx = c * tileSize + tileSize / 2;
    let cy = r * tileSize + tileSize / 2;
    if (edge === 0) return { x: cx, y: cy - tileSize/2 }; 
    if (edge === 1) return { x: cx + tileSize/2, y: cy }; 
    if (edge === 2) return { x: cx, y: cy + tileSize/2 }; 
    if (edge === 3) return { x: cx - tileSize/2, y: cy }; 
}

function drawGateArrow(r, c, edge, type) {
    let x = c * tileSize; let y = r * tileSize;
    ctx.save();
    ctx.translate(x + tileSize/2, y + tileSize/2); 
    ctx.rotate((edge * 90) * Math.PI / 180);       
    
    ctx.fillStyle = (type === 'start') ? "#66BB6A" : "#EF5350"; 
    ctx.beginPath();
    let m = tileSize * 0.15; let edgeY = -tileSize/2; 
    if (type === 'start') {
        ctx.moveTo(-m, edgeY); ctx.lineTo(m, edgeY); ctx.lineTo(0, edgeY + m + 5); 
    } else {
        ctx.moveTo(-m, edgeY + m + 5); ctx.lineTo(m, edgeY + m + 5); ctx.lineTo(0, edgeY);
    }
    ctx.fill(); ctx.restore();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (imgFullBackground.complete && imgFullBackground.naturalHeight !== 0) {
        ctx.drawImage(imgFullBackground, 0, 0, canvas.width, canvas.height);
    }

    for (let row = 0; row < currentGridSize; row++) {
        for (let col = 0; col < currentGridSize; col++) {
            let cell = currentGrid[row][col];
            let x = col * tileSize; let y = row * tileSize;

            if (!imgFullBackground.complete || imgFullBackground.naturalHeight === 0) {
                if (imgEmpty.complete && imgEmpty.naturalHeight !== 0) {
                    ctx.drawImage(imgEmpty, x, y, tileSize, tileSize);
                } else {
                    ctx.fillStyle = "#5D4037"; 
                    if (row === currentStart.r && col === currentStart.c) ctx.fillStyle = "#4E342E"; 
                    if (row === currentEnd.r && col === currentEnd.c) ctx.fillStyle = "#4E342E"; 
                    ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2); 
                }
            } else {
                if (row === currentStart.r && col === currentStart.c) {
                    ctx.fillStyle = "rgba(76, 175, 80, 0.2)"; ctx.fillRect(x, y, tileSize, tileSize);
                }
                if (row === currentEnd.r && col === currentEnd.c) {
                    ctx.fillStyle = "rgba(244, 67, 54, 0.2)"; ctx.fillRect(x, y, tileSize, tileSize);
                }
            }

            if (cell.type !== 'empty') drawPuzzleNode(x, y, cell.type, cell.angle);
        }
    }
    drawGateArrow(currentStart.r, currentStart.c, currentStart.edge, 'start');
    drawGateArrow(currentEnd.r, currentEnd.c, currentEnd.edge, 'end');

    if (characterPos) {
        ctx.save();
        ctx.beginPath();
        let radius = tileSize * 0.11; 
        ctx.arc(characterPos.x, characterPos.y, radius, 0, Math.PI * 2);
        
        ctx.fillStyle = "#FFCA28"; 
        ctx.fill();
        
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FF8F00"; 
        ctx.stroke();
        
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#FFCA28";
        ctx.fill();
        ctx.restore();
    }
}

function drawPuzzleNode(x, y, type, angle) {
    ctx.save(); 
    ctx.translate(x + tileSize / 2, y + tileSize / 2);
    ctx.rotate(angle * Math.PI / 180);
    
    let img = null;
    if (type === 'I') img = imgStraight;
    else if (type === 'L') img = imgCorner;
    else if (type === 'T') img = imgT;
    else if (type === '+') img = imgCross;

    if (img && img.complete && img.naturalHeight !== 0) {
        ctx.drawImage(img, -tileSize / 2, -tileSize / 2, tileSize, tileSize);
    } else {
        ctx.fillStyle = "#4FC3F7"; 
        let thick = tileSize * 0.25; 
        if (type === 'I') { ctx.fillRect(-thick/2, -tileSize/2, thick, tileSize); } 
        else if (type === 'L') { ctx.fillRect(-thick/2, -tileSize/2, thick, tileSize/2+thick/2); ctx.fillRect(-thick/2, -thick/2, tileSize/2+thick/2, thick); } 
        else if (type === 'T') { ctx.fillRect(-thick/2, -tileSize/2, thick, tileSize/2+thick/2); ctx.fillRect(-thick/2, -thick/2, tileSize/2+thick/2, thick); ctx.fillRect(-tileSize/2, -thick/2, tileSize/2+thick/2, thick); } 
        else if (type === '+') { ctx.fillRect(-thick/2, -tileSize/2, thick, tileSize); ctx.fillRect(-tileSize/2, -thick/2, tileSize, thick); }
    }
    ctx.restore(); 
}

// ==========================================
// 7. ETKİLEŞİM VE YOL BULMA 
// ==========================================
canvas.addEventListener('click', function(event) {
    if (isAnimating || isGameOver) return; 

    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((event.clientX - rect.left) / tileSize);
    const row = Math.floor((event.clientY - rect.top) / tileSize);

    if (row >= 0 && row < currentGridSize && col >= 0 && col < currentGridSize) {
        let cell = currentGrid[row][col];
        if (cell.type !== 'empty') {
            
            if (turnsLeft <= 0) {
                triggerGameOver("Hamle Hakkın Kalmadı!");
                return;
            }

            cell.angle = (cell.angle + 90) % 360;
            turnsLeft--; 
            updateStatsUI(); 
            drawGame();
        }
    }
});

function getPorts(cell) {
    if (cell.type === 'empty') return [0, 0, 0, 0];
    let base = [];
    if (cell.type === 'I') base = [1, 0, 1, 0]; 
    if (cell.type === 'L') base = [1, 1, 0, 0]; 
    if (cell.type === 'T') base = [1, 1, 0, 1]; 
    if (cell.type === '+') base = [1, 1, 1, 1]; 
    
    let shifts = (cell.angle / 90) % 4; let ports = [...base]; 
    for (let i = 0; i < shifts; i++) ports.unshift(ports.pop());
    return ports;
}

function findPath() {
    let startPorts = getPorts(currentGrid[currentStart.r][currentStart.c]);
    if (startPorts[currentStart.edge] === 0) return null; 

    let visited = Array(currentGridSize).fill().map(() => Array(currentGridSize).fill(false));
    
    function search(r, c, currentPath) {
        if (r < 0 || r >= currentGridSize || c < 0 || c >= currentGridSize) return null;
        if (visited[r][c]) return null;
        visited[r][c] = true; 
        
        let newPath = [...currentPath, {r, c}]; 
        let myPorts = getPorts(currentGrid[r][c]); 
        
        if (r === currentEnd.r && c === currentEnd.c) {
            if (myPorts[currentEnd.edge] === 1) return newPath; 
            return null;
        }
        
        if (myPorts[0] && r > 0 && getPorts(currentGrid[r-1][c])[2]) { let res = search(r-1, c, newPath); if(res) return res; } 
        if (myPorts[1] && c < currentGridSize-1 && getPorts(currentGrid[r][c+1])[3]) { let res = search(r, c+1, newPath); if(res) return res; } 
        if (myPorts[2] && r < currentGridSize-1 && getPorts(currentGrid[r+1][c])[0]) { let res = search(r+1, c, newPath); if(res) return res; } 
        if (myPorts[3] && c > 0 && getPorts(currentGrid[r][c-1])[1]) { let res = search(r, c-1, newPath); if(res) return res; } 
        
        return null; 
    }
    return search(currentStart.r, currentStart.c, []);
}

// ==========================================
// 8. ANİMASYON MOTORU
// ==========================================
function startAnimation(pathCoordinates) {
    isAnimating = true;
    let waypoints = [];

    waypoints.push(getEdgeCoords(currentStart.r, currentStart.c, currentStart.edge));

    for (let i = 0; i < pathCoordinates.length; i++) {
        let cell = pathCoordinates[i];
        waypoints.push({
            x: cell.c * tileSize + tileSize / 2,
            y: cell.r * tileSize + tileSize / 2
        });
    }

    waypoints.push(getEdgeCoords(currentEnd.r, currentEnd.c, currentEnd.edge));

    let targetIndex = 1; 
    characterPos = { x: waypoints[0].x, y: waypoints[0].y }; 
    let speed = 10; 

    function animateFrame() {
        if (!isAnimating) return; 

        let targetX = waypoints[targetIndex].x;
        let targetY = waypoints[targetIndex].y;

        let dx = targetX - characterPos.x;
        let dy = targetY - characterPos.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < speed) {
            characterPos.x = targetX;
            characterPos.y = targetY;
            targetIndex++;

            if (targetIndex >= waypoints.length) {
                isAnimating = false;
                characterPos = null;
                levelPassedSequence(); 
                return;
            }
        } else {
            characterPos.x += (dx / distance) * speed;
            characterPos.y += (dy / distance) * speed;
        }

        drawGame(); 
        requestAnimationFrame(animateFrame); 
    }

    animateFrame(); 
}

function levelPassedSequence() {
    messageArea.style.color = "#81C784"; 
    messageArea.innerText = "Mükemmel! Bölüm tamamlandı.";
    
    gameAudio.stopAll();
    
    if (currentLevel === unlockedLevels && unlockedLevels < totalLevels) {
        unlockedLevels++;
    }
    
    setTimeout(() => { 
        gameAudio.playBg(); 
        renderLevelButtons(); 
        showScreen(levelScreen); 
    }, 1500); 
}

// ==========================================
// 9. BUTON DİNLEYİCİLERİ VE ARAYÜZ
// ==========================================
document.getElementById('checkPathBtn').onclick = () => {
    if (isAnimating || isGameOver) return; 

    let successfulPath = findPath(); 

    if (successfulPath) {
        clearInterval(timerInterval); 
        gameAudio.playAction(); 
        
        messageArea.style.color = "#4FC3F7"; 
        messageArea.innerText = "Yola çıkılıyor...";
        startAnimation(successfulPath); 
    } else {
        messageArea.style.color = "#E57373"; 
        messageArea.innerText = "Yol Bağlantısı hatalı !!!";
        setTimeout(() => { if(!isGameOver) messageArea.innerText = ""; }, 2000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.playbackRate = 0.6; 
    }
});

function updateStatsUI() {
    const timeDisplay = document.getElementById('timeDisplay');
    const turnDisplay = document.getElementById('turnDisplay');
    const timeWrapper = document.getElementById('timeWrapper');
    const turnWrapper = document.getElementById('turnWrapper');
    
    timeDisplay.innerText = timeLeft;
    turnDisplay.innerText = turnsLeft;

    if (timeLeft <= 5) timeWrapper.classList.add('danger-text');
    else timeWrapper.classList.remove('danger-text');

    if (turnsLeft <= 3) turnWrapper.classList.add('danger-text');
    else turnWrapper.classList.remove('danger-text');
}

function triggerGameOver(reason) {
    isGameOver = true;
    clearInterval(timerInterval); 
    
    gameAudio.stopAll();
    
    messageArea.style.color = "#E57373"; 
    messageArea.innerText = `Oyun Bitti! ${reason}`;
}

restartBtn.onclick = () => { gameAudio.playBg(); startLevel(currentLevel); };
document.getElementById('startBtn').onclick = () => { gameAudio.playBg(); renderLevelButtons(); showScreen(levelScreen); };
document.getElementById('backBtn').onclick = () => { gameAudio.playBg(); showScreen(startScreen); };
document.getElementById('returnToMenuBtn').onclick = () => { gameAudio.playBg(); renderLevelButtons(); showScreen(levelScreen); };