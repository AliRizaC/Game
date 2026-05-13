// 1. VERİ: LEVELLER
// Bu bölüm oyunun veritabanıdır. Mantık ve görselden tamamen izoledir.
const LEVELS_DATA = [
    {
        gridSize: 3, timeLimit: 10, turnLimit: 10, 
        startCell: { r: 1, c: 0, edge: 3 }, // Başlangıç noktası: 1. satır, 0. sütun. edge:3 (Batı kapısı açık)
        endCell: { r: 1, c: 2, edge: 1 },   // Bitiş noktası: 1. satır, 2. sütun. edge:1 (Doğu kapısı açık)
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
        startCell: { r: 1, c: 0, edge: 3 }, endCell: { r: 3, c: 4, edge: 1 },
        map: [
            [{type: 'I', angle: 90}, {type: 'empty', angle: 0}, {type: 'T', angle: 180}, {type: 'I', angle: 0},{type: 'T', angle: 0}],
            [{type: 'L', angle: 90}, {type: 'T', angle: 0}, {type: 'empty', angle: 0}, {type: '+', angle: 0},{type: 'L', angle: 0}],
            [{type: 'T', angle: 90}, {type: 'T', angle: 0}, {type: 'T', angle: 180}, {type: 'I', angle: 0},{type: '+', angle: 0}],
            [{type: 'empty', angle: 90}, {type: '+', angle: 0}, {type: 'L', angle: 90}, {type: 'T', angle: 0},{type: 'L', angle: 0}],
            [{type: 'L', angle: 90}, {type: 'empty', angle: 0}, {type: 'T', angle: 180}, {type: 'I', angle: 0},{type: 'empty', angle: 0}],
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
        startCell: { r: 4, c: 0, edge: 2 }, endCell:  { r: 0, c: 4, edge: 0 },
        map: [
            [{type: 'I', angle: 90}, {type: 'empty', angle: 180}, {type: 'T', angle: 0}, {type: 'I', angle: 180},{type: 'T', angle: 270}],
            [{type: 'L', angle: 0}, {type: 'T', angle: 270}, {type: 'empty', angle: 270}, {type: '+', angle: 180},{type: 'I', angle: 0}],
            [{type: 'empty', angle: 90}, {type: 'T', angle: 90}, {type: 'I', angle: 90}, {type: 'L', angle: 0},{type: '+', angle: 180}],
            [{type: 'T', angle: 270}, {type: '+', angle: 0}, {type: 'L', angle: 270}, {type: 'T', angle: 90},{type: 'L', angle: 180}],
            [{type: 'I', angle: 180}, {type: 'empty', angle: 0}, {type: 'T', angle: 180}, {type: 'I', angle: 270},{type: 'empty', angle: 90}],
        ]
    }
];

// 2. SES YÖNETİMİ
class AudioController {
    constructor() {
        // Tarayıcı belleğine sesleri alıp nesne olarak tutuyoruz.
        this.bgMusic = new Audio('sounds/background.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.4; // Arkaplan müziği kısık olmalı ki efektleri ezmesin
        this.actionMusic = new Audio('sounds/action.mp3');
        this.actionMusic.volume = 0.8;
    }
    
    playBg() {
        // Aksiyon sesini zorla sustur, başa sar. Sonra BG müziğini çal.
        this.actionMusic.pause();
        this.actionMusic.currentTime = 0;
        // catch: Tarayıcılar kullanıcı tıklamadan ses çalmaya izin vermez. Hata mesajı verir.
        this.bgMusic.play().catch(e => console.warn("Müzik çalınamadı (Kullanıcı etkileşimi gerekebilir):", e));
    }
    
    playAction() {
        // Animasyon başladığında gerilimi artırmak için ana müziği kesip efekt sesini bas.
        this.bgMusic.pause();
        this.actionMusic.currentTime = 0; 
        this.actionMusic.play().catch(e => console.warn("Aksiyon sesi hatası:", e));
    }
    
    stopAll() {
        // Oyun bittiğinde sessizlik sağlamak için her şeyi durdur.
        this.bgMusic.pause();
        this.actionMusic.pause();
    }
    
    setTension(isStressed) {
        // Zaman 5 saniyenin altına düştüğünde müziğin hızını (playbackRate) %30 artırarak oyuncuyu paniğe sokarız.
        this.bgMusic.playbackRate = isStressed ? 1.3 : 1.0;
    }
}

// 3. OYUN MOTORU
// Çizimle işi yoktur, sadece matematik hesaplar.
class GameEngine {
    constructor(levelsData) {
        // Ana veri kaynağını motorun içine çekiyoruz.
        this.levelsData = levelsData;
        this.totalLevels = levelsData.length;
        this.unlockedLevels = 1; // Oyuncu ilk başta sadece 1. bölümü oynayabilir.
        
        // Bu değişkenler her level yüklendiğinde sıfırlanacak state (durum) verileridir.
        this.currentLevel = 1;
        this.gridSize = 3;
        this.grid = []; 
        this.startCell = null;
        this.endCell = null;
        
        this.timeLeft = 0;
        this.turnsLeft = 0;
        this.isGameOver = false; 
    }

    loadLevel(levelNum) {
        // İstenen leveli yükle. Dizi indexleri 0'dan başladığı için levelNum - 1 yapıyoruz.
        this.currentLevel = levelNum;
        const data = this.levelsData[levelNum - 1] || this.levelsData[0];
        
        // Sabit verileri anlık oyun state'ine aktarıyoruz.
        this.gridSize = data.gridSize;
        // {...obj} kullanımı spread operatörüdür. Objenin referansını değil, kopyasını alırız ki orijinali bozulmasın.
        this.startCell = { ...data.startCell }; 
        this.endCell = { ...data.endCell };
        this.timeLeft = data.timeLimit;
        this.turnsLeft = data.turnLimit;
        this.isGameOver = false;

        // Deep Copy (Derin Kopyalama)
        // Eğer this.grid = data.map deseydik, dizinin RAM'deki referansını alırdık.
        // Oyuncu boruyu çevirdiğinde asıl veritabanındaki (LEVELS_DATA) boru da kalıcı olarak dönerdi.
        // Bu yüzden iki katmanlı map() fonksiyonu ile yepyeni, bağımsız bir array oluşturuyoruz.
        this.grid = data.map.map(row => row.map(cell => ({ ...cell })));
    }

    rotateCell(row, col) {
        // Oyun bitmişse veya hamle kalmamışsa tıklamaları yok say, dışarı false döndür.
        if (this.isGameOver || this.turnsLeft <= 0) return false;
        
        let cell = this.grid[row][col];
        // Sadece içinde boru olan hücreler dönebilir. Boş (empty) lav hücresine tıklanırsa tepki verme.
        if (cell.type !== 'empty') {
            // Açıyı 90 artır, ancak 360'a ulaştığında 0'a sıfırlanması için mod (%) 360 al.
            cell.angle = (cell.angle + 90) % 360;
            this.turnsLeft--; // Başarılı hamle, oyuncunun hakkını azalt.
            return true; // Dönüş başarılı, Controller'a "ekranı güncelle" mesajı veriyoruz.
        }
        return false;
    }

    getPorts(cell) {
        // Bu metod, o anki hücrenin hangi yönlere bağlantısı olduğunu [Kuzey, Doğu, Güney, Batı] şeklinde döndürür.
        if (cell.type === 'empty') return [0, 0, 0, 0]; // Lav hücresi kapalıdır.
        
        let base = [];
        // Boruların 0 derecedeyken (varsayılan) sahip oldukları fiziksel delikler (1=açık, 0=kapalı)
        if (cell.type === 'I') base = [1, 0, 1, 0]; // Kuzey ve Güney açık
        if (cell.type === 'L') base = [1, 1, 0, 0]; // Kuzey ve Doğu açık
        if (cell.type === 'T') base = [1, 1, 0, 1]; // Kuzey, Doğu, Batı açık
        if (cell.type === '+') base = [1, 1, 1, 1]; // Dört yön açık
        
        // Açıyı 90'a bölerek borunun kaç defa çevrildiğini (0, 1, 2 veya 3 adım) buluyoruz.
        let shifts = (cell.angle / 90) % 4; 
        
        // Orijinal base dizisini bozmamak için kopyasını (ports) oluştur.
        let ports = [...base]; 
        
        // Dairesel  Kaydırma (Circular Shift)
        for (let i = 0; i < shifts; i++) {// Boru saat yönünde 90 derece dönerse, açık olan portlar da dizide 1 index sağa kayar.
            ports.unshift(ports.pop());   // pop() son elemanı alır çıkarır, unshift() onu alıp dizinin en başına ekler.

        }
        return ports;
    }

    findPath() { // DFS (Derinlik Öncelikli Arama) Yol Bulma algoritması
        // 1. Önce başlangıç hücresinin mevcut durumda hangi yönlere açık olduğuna bakıyoruz.
        let startPorts = this.getPorts(this.grid[this.startCell.r][this.startCell.c]);
        
        // 2. Eğer oyunun istediği çıkış yönü (startCell.edge) şu an kapalıysa baştan kaybettik, null dön.
        if (startPorts[this.startCell.edge] === 0) return null; 

        // 3. Geçtiğimiz hücrelere bir daha girip sonsuz döngüye girmemek için "ziyaret edildi" haritası çıkar.
        let visited = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(false));
        
        // 4. Recursive (Özyinelemeli) Arama Fonksiyonu
        const search = (r, c, currentPath) => {
            // Güvenlik Duvarı 1: Harita sınırlarının dışına çıkarsan aramayı durdur.
            if (r < 0 || r >= this.gridSize || c < 0 || c >= this.gridSize) return null;
            
            // Güvenlik Duvarı 2: Daha önce bu hücreye basıldıysa çık.
            if (visited[r][c]) return null;
            
            // Bu hücreye adım atıldı, haritada işaretle.
            visited[r][c] = true; 
            
            // Geçmiş yolu kopyala ve üzerine şu anki koordinatları ekle.
            let newPath = [...currentPath, {r, c}]; 
            let myPorts = this.getPorts(this.grid[r][c]); // Bulunduğum hücrenin delikleri
            
            // Eğer bitiş hücresine ulaştıysak...
            if (r === this.endCell.r && c === this.endCell.c) {
                // ...ve oyunun istediği son çıkış kapısı açıksa tebrikler, yolu geri fırlat.
                if (myPorts[this.endCell.edge] === 1) return newPath; 
                return null;
            }
            
            // Komşu Kontroller ve İlerleme
            // KUZEYE GİT: Benim kuzeyim (0) açık mı? Ve Üstümde satır var mı? Ve Üstümdeki hücrenin Güneyi (2) açık mı? (İki boru birbirine örtüşüyor mu?)
            if (myPorts[0] && r > 0 && this.getPorts(this.grid[r-1][c])[2]) { 
                let res = search(r-1, c, newPath); // Şartlar uyuyorsa kuzeye recursive dalış yap
                if(res) return res; // Yol bulduysa o yolu en üst katmana kadar iade et
            } 
            // DOĞUYA GİT: Benim doğum (1) açık mı? Ve Sağımda sütun var mı? Ve Sağdakinin Batısı (3) açık mı?
            if (myPorts[1] && c < this.gridSize-1 && this.getPorts(this.grid[r][c+1])[3]) { 
                let res = search(r, c+1, newPath); if(res) return res; 
            } 
            // GÜNEYE GİT: Benim güneyim (2) açık mı? Ve Altımda satır var mı? VE Alttakinin Kuzeyi (0) açık mı?
            if (myPorts[2] && r < this.gridSize-1 && this.getPorts(this.grid[r+1][c])[0]) { 
                let res = search(r+1, c, newPath); if(res) return res; 
            } 
            // BATIYA GİT: Benim batım (3) açık mı? Ve Solumda sütun var mı? Ve Soldakinin Doğusu (1) açık mı?
            if (myPorts[3] && c > 0 && this.getPorts(this.grid[r][c-1])[1]) { 
                let res = search(r, c-1, newPath); if(res) return res; 
            } 
            
            // 4 yöne de gidilemiyorsa veya gidilen yollar çıkmaz sokaksa başarısız (null) dön.
            return null; 
        };
        
        // DFS'i ilk kez Başlangıç noktasından ve boş bir yol dizisiyle [] başlatıryoruz.
        return search(this.startCell.r, this.startCell.c, []);
    }
}

// 4. ÇİZİM MOTORU 
// Motorun ürettiği matematiksel veriyi Canvas üzerinde piksellere dönüştürür.
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d'); // Çizim için 2 boyutlu fırçamızı (context) alıyoruz.
        this.images = this.loadImages(); // Resimleri oyun başlamadan RAM'e yüklüyoruz.
    }

    loadImages() {
        // Gereksiz 404 hatası veren bg (arkaplan) resmini buradan kaldırdık. Sadece gerekli objeler var.
        const imgs = {
            straight: new Image(), corner: new Image(), tShape: new Image(),
            cross: new Image(), empty: new Image()
        };
        imgs.straight.src = 'images/straight.png';
        imgs.corner.src = 'images/corner.png';
        imgs.tShape.src = 'images/t_shape.png';
        imgs.cross.src = 'images/cross.png';
        imgs.empty.src = 'images/lav.png';
        return imgs;
    }

    drawGame(engine, characterPos) {
        // Çizim yapmadan önce her seferinde bir önceki karenin kalıntılarını siliyoruz.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dinamik hücre boyutu hesaplama (Ekran 500px, grid 5 ise hücre başı 100px düşer).
        const tileSize = this.canvas.width / engine.gridSize;

        // MATRİSİ ÇİZ: tüm gridi dolaşır)
        for (let row = 0; row < engine.gridSize; row++) {
            for (let col = 0; col < engine.gridSize; col++) {
                let cell = engine.grid[row][col];
                let x = col * tileSize; // Ekranda çizmeye başlayacağı X pikseli
                let y = row * tileSize; // Ekranda çizmeye başlayacağı Y pikseli

                // ZEMİN ÇİZİMİ: Önce hücrenin EN ALTINA lav resmini koy. (Görsellik katman katman yapılır).
                if (this.images.empty.complete && this.images.empty.naturalHeight !== 0) {
                    this.ctx.drawImage(this.images.empty, x, y, tileSize, tileSize);
                } else {
                    // İnternet kesikse oyun çökmesin diye fallback (kurtarıcı) kahverengi zemin çiz.
                    this.ctx.fillStyle = "#5D4037";
                    this.ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2);
                }

                // ÜST KATMAN: Eğer hücre boş değilse (içinde boru varsa) boruyu zemin üzerine çiz.
                if (cell.type !== 'empty') {
                    this.drawNode(x, y, tileSize, cell.type, cell.angle);
                }
            }
        }

        //Başlangıç ve bitiş oklarını ilgili hücrenin yanına çizdir.
        this.drawGateArrow(engine.startCell, tileSize, 'start');
        this.drawGateArrow(engine.endCell, tileSize, 'end');

        // EN ÜST KATMAN (Z-Index): Eğer DFS yol bulmuşsa ve animasyon oynuyorsa, karakter en üstte çizilir.
        if (characterPos) {
            this.drawCharacter(characterPos.x, characterPos.y, tileSize);
        }
    }

    drawNode(x, y, tileSize, type, angle) {
        // ÇOK ÖNEMLİ: Canvas işlemleri. Ekranda bir resmi döndürmek (rotate) için merkez noktasını kaydırmamız gerekir.
        this.ctx.save(); // Fırçanın 0,0 (sol üst) konumunu ve tüm ayarlarını hafızaya al.
        
        // Fırçayı tam hücrenin Merkezine taşı.
        this.ctx.translate(x + tileSize / 2, y + tileSize / 2);
        
        // Tüm tuvali (canvas) belirtilen açı (angle) kadar döndür. Formül Dereceyi Radyana çevirir.
        this.ctx.rotate(angle * Math.PI / 180);
        
        // Çizilecek resmi tipe göre belirle.
        let img = null;
        if (type === 'I') img = this.images.straight;
        else if (type === 'L') img = this.images.corner;
        else if (type === 'T') img = this.images.tShape;
        else if (type === '+') img = this.images.cross;

        // Resim başarılı yüklendiyse çiz.
        if (img && img.complete && img.naturalHeight !== 0) {
            //Fırça şu an hücrenin merkezinde olduğu için, resmin tam ortalanması adına çizime genişliğin yarısı kadar geriden başlamamız gerekiyor.
            this.ctx.drawImage(img, -tileSize / 2, -tileSize / 2, tileSize, tileSize);
        } else {
            // İnternet sorunu varsa oyun kilitlenmesin diye düz mavi karelerle (fillRect) kaba bir boru çizimi yapıyoruz.
            this.ctx.fillStyle = "#4FC3F7"; 
            let thick = tileSize * 0.25; 
            if (type === 'I') { this.ctx.fillRect(-thick/2, -tileSize/2, thick, tileSize); } 
            else if (type === 'L') { this.ctx.fillRect(-thick/2, -tileSize/2, thick, tileSize/2+thick/2); this.ctx.fillRect(-thick/2, -thick/2, tileSize/2+thick/2, thick); } 
            else if (type === 'T') { this.ctx.fillRect(-thick/2, -tileSize/2, thick, tileSize/2+thick/2); this.ctx.fillRect(-thick/2, -thick/2, tileSize/2+thick/2, thick); this.ctx.fillRect(-tileSize/2, -thick/2, tileSize/2+thick/2, thick); } 
            else if (type === '+') { this.ctx.fillRect(-thick/2, -tileSize/2, thick, tileSize); this.ctx.fillRect(-tileSize/2, -thick/2, tileSize, thick); }
        }
        
        // Fırçayı döndürülmüş merkezden kurtar ve eski (0,0) konumuna sıfırla ki diğer hücreleri yamuk çizmesin.
        this.ctx.restore(); 
    }

    drawGateArrow(cell, tileSize, type) {
        let x = cell.c * tileSize; let y = cell.r * tileSize;
        this.ctx.save(); 
        this.ctx.translate(x + tileSize/2, y + tileSize/2); 
        
        // Okun bakacağı yönü belirle (0=Kuzey, 1=Doğu, 2=Güney, 3=Batı). 90 ile çarpıp radyona çevir.
        this.ctx.rotate((cell.edge * 90) * Math.PI / 180); 
        
        this.ctx.fillStyle = (type === 'start') ? "#66BB6A" : "#EF5350"; // Başlangıç Yeşil, Bitiş Kırmızı
        this.ctx.beginPath(); // Çizgisel şekil çizimi başlat
        
        let m = tileSize * 0.15; // Okun boyutu
        let edgeY = -tileSize/2; // Okun hücre sınırına dayanması için Y ofseti
        
        // moveTo fırçayı kaldırıp koyar, lineTo kağıt üzerinde çizgi çizer. Basit bir üçgen yapıyoruz.
        if (type === 'start') {
            this.ctx.moveTo(-m, edgeY); this.ctx.lineTo(m, edgeY); this.ctx.lineTo(0, edgeY + m + 5); 
        } else {
            this.ctx.moveTo(-m, edgeY + m + 5); this.ctx.lineTo(m, edgeY + m + 5); this.ctx.lineTo(0, edgeY);
        }
        this.ctx.fill(); // Üçgenin içini renkle doldur
        this.ctx.restore(); 
    }

    drawCharacter(x, y, tileSize) {
        this.ctx.save();
        this.ctx.beginPath();
        // arc() metodu x,y koordinatına belirtilen yarıçapta (tileSize*0.11) 360 derecelik (Math.PI*2) bir daire çizer.
        this.ctx.arc(x, y, tileSize * 0.11, 0, Math.PI * 2);
        
        this.ctx.fillStyle = "#FFCA28"; // Dairenin içi Sarı
        this.ctx.fill();
        
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = "#FF8F00"; // Dairenin dış çerçevesi Turuncu
        this.ctx.stroke();
        
        // Neon parlama (Glow) efekti vermek için shadowBlur (gölge bulanıklığı) ekliyoruz.
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "#FFCA28";
        this.ctx.fill();
        
        this.ctx.restore();
    }
}

// 5. OYUN YÖNETİCİSİ (ANA KONTROLCÜ)
// Veri ve Görüntü  sınıflarını birbiriyle konuşturur.
class GameController {
    constructor() {
        // Alt sistemleri kur.
        this.engine = new GameEngine(LEVELS_DATA);
        this.renderer = new Renderer(document.getElementById('gameCanvas'));
        this.audio = new AudioController();
        
        // Animasyon ve zamanlama değişkenleri
        this.timerInterval = null;
        this.isAnimating = false;
        this.characterPos = null;

        // Arayüz butonlarını canlandır ve başlangıç ekranını göster.
        this.initUIBindings();
        this.showScreen('startScreen');
    }

    initUIBindings() {
        // Fare ile tıklandığında handleCanvasClick fonksiyonuna yönlendir. (e) parametresi olayın (event) kendisidir.
        this.renderer.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        
        // HTML'deki butonlara tıklama görevleri (event listener) atıyoruz.
        document.getElementById('checkPathBtn').onclick = () => this.checkPath();
        document.getElementById('restartBtn').onclick = () => this.startLevel(this.engine.currentLevel);
        document.getElementById('startBtn').onclick = () => { this.audio.playBg(); this.renderLevelButtons(); this.showScreen('levelScreen'); };
        document.getElementById('backBtn').onclick = () => this.showScreen('startScreen');
        document.getElementById('returnToMenuBtn').onclick = () => this.showScreen('levelScreen');
    }

    showScreen(screenId) {
        // Ekran geçişlerini yönetir. Parametre olarak gelen ID'yi 'flex' (görünür) yapar, diğerlerini gizler (none).
        ['startScreen', 'levelScreen', 'gameScreen'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = (id === screenId) ? 'flex' : 'none';
        });
    }

    renderLevelButtons() {
        const grid = document.getElementById('levelGrid');
        if (!grid) return;
        
        grid.innerHTML = ''; // Eski butonları temizle
        
        // Motorun totalLevels bilgisini kullanarak dinamik buton yaratır (Örn: 9 adet).
        for (let i = 1; i <= this.engine.totalLevels; i++) {
            const btn = document.createElement('button'); // DOM üzerinde sanal buton yarat
            btn.innerText = i;
            btn.classList.add('level-btn');
            
            // Eğer oyuncu henüz o levelin kilidini açmadıysa butonu inaktif (disabled) yap.
            if (i > this.engine.unlockedLevels) {
                btn.classList.add('locked'); btn.disabled = true;
            } else {
                // Tıklandığında o i değerindeki leveli başlat.
                btn.onclick = () => this.startLevel(i);
            }
            grid.appendChild(btn); // Sanal butonu HTML sayfasına fiziki olarak göm.
        }
    }

    startLevel(levelNum) {
        // Motoru yeni level için formatla.
        this.engine.loadLevel(levelNum);
        
        // Eski animasyon ve karakter pozisyonlarını sıfırla.
        this.isAnimating = false;
        this.characterPos = null;
        
        // Arayüz yazılarını temizle
        const lvlText = document.getElementById('currentLevelText');
        if (lvlText) lvlText.innerText = "Level " + levelNum;
        const msg = document.getElementById('messageArea');
        if (msg) msg.innerText = ""; 
        
        // Oyun ekranına geç, skorları güncelle ve Ressama "İlk halini çiz" emri ver.
        this.showScreen('gameScreen');
        this.updateUI();
        this.renderer.drawGame(this.engine, this.characterPos);
        
        // Müzik ve süreyi başlat
        this.audio.setTension(false);
        this.audio.playBg();
        this.startTimer();
    }

    handleCanvasClick(event) {
        // Animasyon esnasında veya oyun bittiğinde tıklamaları reddet.
        if (this.isAnimating || this.engine.isGameOver) return;
        
        // Tıklanan fare piksellerini (Örn: X:250, Y:130) grid indexine (Satır:1, Sütun:2) çeviririz.
        const rect = this.renderer.canvas.getBoundingClientRect(); // Canvas'ın sayfadaki konumunu al
        const tileSize = this.renderer.canvas.width / this.engine.gridSize; // Hücre boyutunu bul
        
        // Fare x,y'sinden canvas'ın boşluğunu çıkarıp hücre boyutuna bölerek sütun(col) ve satırı(row) buluyoruz.
        const col = Math.floor((event.clientX - rect.left) / tileSize);
        const row = Math.floor((event.clientY - rect.top) / tileSize);

        // Motora "Bu hücreyi çevir" sinyali gönder. Motor "Tamam döndürdüm(true)" derse...
        if (this.engine.rotateCell(row, col)) {
            this.updateUI(); // Kalan hamle yazısını düşür.
            this.renderer.drawGame(this.engine, this.characterPos); // Döndürülmüş boruyu ekrana çizdir.
            // Hamle bittiyse oyunu kaybet.
            if (this.engine.turnsLeft <= 0) this.gameOver("Hamle Hakkın Kalmadı!");
        }
    }

    startTimer() {
        // Eski zamanlayıcı çalışıyorsa iptal et (üst üste binmemesi için).
        clearInterval(this.timerInterval);
        
        // Her 1000 milisaniyede (1 saniye) çalışacak asenkron döngü.
        this.timerInterval = setInterval(() => {
            if (this.isAnimating || this.engine.isGameOver) return;
            
            this.engine.timeLeft--; // Motorun zamanını düşür.
            this.updateUI(); // Arayüze yansıt.
            
            const timeWrapper = document.getElementById('timeWrapper');
            if (timeWrapper) {
                // Zaman azaldıysa css class'ı ekleyip kırmızı yap ve müziği hızlandır.
                if (this.engine.timeLeft <= 5) {
                    this.audio.setTension(true);
                    timeWrapper.classList.add('danger-text');
                } else {
                    timeWrapper.classList.remove('danger-text');
                }
            }

            // Süre sıfırlandıysa oyunu kaybet.
            if (this.engine.timeLeft <= 0) this.gameOver("Süren Doldu!");
        }, 1000);
    }

    updateUI() {
        // HTML elementlerini bulup içine değişkenleri basar (Reactivity'nin ilkel hali).
        const tDisp = document.getElementById('timeDisplay');
        const tuDisp = document.getElementById('turnDisplay');
        if (tDisp) tDisp.innerText = this.engine.timeLeft;
        if (tuDisp) tuDisp.innerText = this.engine.turnsLeft;
        
        const turnWrapper = document.getElementById('turnWrapper');
        if (turnWrapper) {
            // Hamle bitmek üzereyse o kısmı da kırmızı yap.
            if (this.engine.turnsLeft <= 3) turnWrapper.classList.add('danger-text');
            else turnWrapper.classList.remove('danger-text');
        }
    }

    checkPath() {
        // Oyuncu "Yolu Kontrol Et" tuşuna basmıştır.
        if (this.isAnimating || this.engine.isGameOver) return;
        
        // Motorun DFS algoritmasını çalıştır. Başarılıysa bize koordinat dizisi (path) döndürecek.
        let path = this.engine.findPath();
        let msgArea = document.getElementById('messageArea');

        if (path) {
            // YOL BULUNDU: Süreyi durdur, sesi değiştir ve animasyonu başlat.
            clearInterval(this.timerInterval);
            this.audio.playAction();
            if(msgArea) {
                msgArea.style.color = "#4FC3F7"; 
                msgArea.innerText = "Yola çıkılıyor...";
            }
            this.runAnimation(path);
        } else {
            // YOL YOK: Hata ver, 2 saniye sonra yazıyı sil.
            if(msgArea) {
                msgArea.style.color = "#E57373"; 
                msgArea.innerText = "Yol Bağlantısı hatalı !!!";
                setTimeout(() => { if(!this.engine.isGameOver) msgArea.innerText = ""; }, 2000);
            }
        }
    }

    runAnimation(pathCoordinates) {
        // ANİMASYON FİZİĞİ
        this.isAnimating = true;
        const tileSize = this.renderer.canvas.width / this.engine.gridSize;
        let waypoints = []; // Karakterin uğrayacağı fiziksel pikseller listesi

        // Hücrenin kenar piksellerini bulan yardımcı fonksiyon (Animasyonun ortadan kenara çıkması için).
        const getEdgeCoords = (r, c, edge) => {
            let cx = c * tileSize + tileSize / 2;
            let cy = r * tileSize + tileSize / 2;
            if (edge === 0) return { x: cx, y: cy - tileSize/2 }; 
            if (edge === 1) return { x: cx + tileSize/2, y: cy }; 
            if (edge === 2) return { x: cx, y: cy + tileSize/2 }; 
            if (edge === 3) return { x: cx - tileSize/2, y: cy };
        };

        // 1. Durak Noktası: Başlangıç kapısının ucu.
        waypoints.push(getEdgeCoords(this.engine.startCell.r, this.engine.startCell.c, this.engine.startCell.edge));

        // 2. Durak Noktası: Motorun bulduğu yol koordinatlarını (örneğin: [1,2], [2,2]) piksele çevirip listeye ekle.
        for (let i = 0; i < pathCoordinates.length; i++) {
            let cell = pathCoordinates[i];
            waypoints.push({
                x: cell.c * tileSize + tileSize / 2, // (Sütun * Genişlik) + (Genişlik/2)
                y: cell.r * tileSize + tileSize / 2
            });
        }

        // 3. Son Durak Noktası: Bitiş kapısının ucu.
        waypoints.push(getEdgeCoords(this.engine.endCell.r, this.engine.endCell.c, this.engine.endCell.edge));

        let targetIndex = 1; // Hedeflenen sıradaki durak
        this.characterPos = { x: waypoints[0].x, y: waypoints[0].y }; // Karakterin o anki gerçek pozisyonu
        let speed = 5; // Karakter hızı (px/frame)

        // Tarayıcının ekran yenileme hızına senkronize çalışan Game Loop döngüsü
        const animateFrame = () => {
            if (!this.isAnimating) return; 

            // Hedef pikseller
            let targetX = waypoints[targetIndex].x;
            let targetY = waypoints[targetIndex].y;

            // X ve Y eksenindeki uzaklık farkları
            let dx = targetX - this.characterPos.x;
            let dy = targetY - this.characterPos.y;
            
            // Pisagor teoremi ile kuş uçuşu gerçek mesafeyi (Hipotenüs) buluyoruz. (a^2) + (b^2) = c^2
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Eğer karakter hedefe kendi hızından daha yakınsa (yani ulaşmak üzereyse) hedefe yapıştır.
            if (distance < speed) {
                this.characterPos.x = targetX;
                this.characterPos.y = targetY;
                targetIndex++; // Sıradaki hedefe geç

                // Tüm duraklar bittiyse animasyonu öldür ve leveli bitir.
                if (targetIndex >= waypoints.length) {
                    this.isAnimating = false;
                    this.characterPos = null;
                    this.levelPassed(); 
                    return;
                }
            } else {
                // Birim vektör bulma: Yön x Hız. 
                // X ve Y'yi kendi toplam mesafelerine bölüp hızla çarparak her iki yönde de dengeli gitmesini sağlıyoruz.
                this.characterPos.x += (dx / distance) * speed;
                this.characterPos.y += (dy / distance) * speed;
            }

            // Yeni pozisyon hesaplandı, şimdi tuvale o yeni haliyle çizmesini emrediyoruz.
            this.renderer.drawGame(this.engine, this.characterPos); 
            
            // Kendi kendini bir sonraki frame için tekrar çağır (Sonsuz Döngü mantığı).
            requestAnimationFrame(animateFrame); 
        };

        // Rekürsif animasyon döngüsünü ilk defa başlatıyoruz.
        animateFrame(); 
    }

    levelPassed() {
        // Animasyon başarıyla bitince çağrılır.
        let msgArea = document.getElementById('messageArea');
        if(msgArea) {
            msgArea.style.color = "#81C784"; 
            msgArea.innerText = "Mükemmel! Bölüm tamamlandı.";
        }
        
        this.audio.stopAll(); // Aksiyon sesini kes
        
        // Eğer oynadığımız bölüm, en son ulaştığımız kilitli bölümse, bir sonrakini aç.
        if (this.engine.currentLevel === this.engine.unlockedLevels && this.engine.unlockedLevels < this.engine.totalLevels) {
            this.engine.unlockedLevels++;
        }
        
        // 1.5 saniye ekranda bekle, sonra menüye dön.
        setTimeout(() => { 
            this.audio.playBg(); 
            this.renderLevelButtons(); // Yeni kilidi açılmış butonları çiz
            this.showScreen('levelScreen'); 
        }, 1500); 
    }

    gameOver(reason) {
        // Süre veya hamle biterse çağrılır.
        this.engine.isGameOver = true;
        clearInterval(this.timerInterval); // Sayacı öldür
        this.audio.stopAll();
        
        let msgArea = document.getElementById('messageArea')
        if(msgArea) {
            msgArea.style.color = "#E57373";
            msgArea.innerText = `Oyun Bitti! ${reason}`;
        }
    }
}

// 6. BAŞLATICI
// HTML tamamen yüklendikten sonra motoru çalıştırır.
window.onload = () => {
    // Tüm sistemi tetikleyen ana kıvılcım.
    const game = new GameController();
    
    // Varsa arka plan HTML videosunu (estetik için) yavaşlatır.
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) bgVideo.playbackRate = 0.6; 
};