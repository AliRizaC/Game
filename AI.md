Prompt:
"JavaScript'te 2D bir grid dizisindeki objeleri, orijinal veriyi bozmadan nasıl kopyalarım?"

AI Yanıtı: "İç içe map metodunu kullanarak her bir objeyi spread operatörü ile yeni bir referansa aktarabilirsiniz. Bu, 'Deep Copy' sağlayarak orijinal veri setinin (örneğin seviye datası) mutasyona uğramasını engeller: this.grid = data.map.map(row => row.map(cell => ({ ...cell })));"

Prompt:
"Javascript ile OOP mimarisinde grid tabanlı bir puzzle oyunu geliştiriyorum. Elimde N x N boyutlarında bir 2D matris var. Bu matrisin içinde 'I', 'L', 'T' ve '+' tipinde, 90'ar derece dönebilen boru nesneleri bulunuyor.
Senden istediğim:
Boruların dönüş açılarına (angle) göre açık olan portlarını [Kuzey, Doğu, Güney, Batı] formatında hesaplayan bir yardımcı metod yazman.
Bu portları kullanarak, Başlangıç hücresinden Bitiş hücresine kesintisiz bir bağlantı olup olmadığını Depth-First Search (DFS) algoritması ile bulan bir metod yazman.
Algoritma grid sınırlarına dikkat etmeli, daha önce ziyaret edilen hücrelere tekrar girmemeli (visited tracking) ve eğer yol bulursa bu yolu koordinat objeleri içeren bir dizi (array) olarak döndürmeli."


AI Yanıtı:
Bu problemi çözmek için boru tiplerini statik port verileriyle tanımlayıp, güncel açıyı bu dizi üzerinde bir "shift" (kaydırma) işlemiyle simüle etmek en optimize yaklaşımdır.

1. Port Hesaplama Mantığı
Her boru tipi için 0°'deki açık uçları [K, D, G, B] (1: Açık, 0: Kapalı) dizisi olarak tanımlanır. Boru döndükçe bu dizi saat yönünde ötelenir:

JavaScript
getPorts(type, angle) {
    const base = { 'I': [1,0,1,0], 'L': [1,1,0,0], 'T': [1,1,0,1], '+': [1,1,1,1] };
    let ports = [...base[type]];
    let shift = (angle / 90) % 4;
    for (let i = 0; i < shift; i++) ports.unshift(ports.pop()); // Saat yönünde döndürme
    return ports;
}
2. DFS ile Yol Bulma
Algoritma, this.grid üzerinde derinlemesine ilerlerken sadece karşılıklı portları (örneğin mevcut hücrenin Doğu kapısı ile komşunun Batı kapısı) eşleşen hücrelere geçiş yapar.

Sınır Kontrolü: Grid dışına çıkışlar engellenir.

Ziyaret Takibi: Set yapısı ile sonsuz döngüler önlenir.

Backtracking: Çıkmaz sokağa girildiğinde yol dizisinden son eleman çıkarılarak alternatif yollar aranır.

JavaScript
checkConnection(curr, end, visited = new Set(), path = []) {
    const key = `${curr.r},${curr.c}`;
    if (this.isInvalid(curr.r, curr.c) || visited.has(key)) return null;

    visited.add(key);
    path.push({ r: curr.r, c: curr.c });

    if (curr.r === end.r && curr.c === end.c) return path; // Hedef bulundu

    for (let dir of this.getValidNeighbors(curr)) {
        let result = this.checkConnection(dir, end, visited, [...path]);
        if (result) return result;
    }
    return null;
}

Prompt:
"Oyunumda farklı boru tipleri ('I', 'L', 'T', '+') var ve her biri 90, 180, 270 derece dönebiliyor. Her boru tipi ve her açı kombinasyonu için tek tek if-else veya switch-case yazmak çok uzun sürüyor ve hata yapmaya açık. Boruların hangi yönlerinin (Kuzey, Doğu, Güney, Batı) açık olduğunu, açısına göre dinamik ve tek bir fonksiyonla hesaplamanın daha kısa bir yolu var mıdır?"

AI Yanıtı:
Evet, her durumu manuel yazmak yerine Array Shifting (Dizi Kaydırma) mantığını kullanabiliriz. Her boruyu 0° açısındayken sahip olduğu portlarla bir dizi ([K, D, G, B]) olarak tanımlarız. Boru döndükçe bu dizideki elemanları saat yönünde kaydırarak yeni portları hesaplarız.

JavaScript
// Örnek: 'L' borusu 0 derecede Kuzey(1) ve Doğu(1) açıktır: [1, 1, 0, 0]
// 90 derece döndüğünde dizi sağa kayar ve yeni hali: [0, 1, 1, 0] (Doğu ve Güney açık) olur.

getPorts(type, angle) {
    const basePorts = {
        'I': [1, 0, 1, 0], // Dikey
        'L': [1, 1, 0, 0], // L tipi
        'T': [1, 1, 0, 1], // T tipi
        '+': [1, 1, 1, 1]  // Artı tipi
    };

    let ports = [...basePorts[type]];
    const shiftCount = (angle / 90) % 4;

    for (let i = 0; i < shiftCount; i++) {
        // Dizinin son elemanını alıp başa ekleyerek saat yönünde döndürme simülasyonu
        ports.unshift(ports.pop());
    }
    return ports;
}

Neden Bu Yöntemi Seçtik?
Kod Tekrarı Önlenir: 16 farklı durum (4 tip x 4 açı) yerine tek bir döngüyle tüm borular yönetilir.
Hata Payı Azalır: Yeni bir boru tipi eklendiğinde sadece 0°'deki halini tanımlamak yeterlidir; dönüş mantığı otomatik çalışır.
Bakım Kolaylığı: Statik kod blokları yerine matematiksel bir model kurulduğu için projenin genişletilmesi çok daha kolaydır.