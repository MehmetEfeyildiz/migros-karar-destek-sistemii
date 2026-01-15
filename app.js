const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Veritabanı bağlantısı
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Veritabanı kullanıcı adı
    password: '', // Veritabanı şifresi
    database: 'migros' // Veritabanı adı
});

// Veritabanına bağlan
db.connect((err) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err);
        process.exit(1);
    }
    console.log('Veritabanına başarıyla bağlanıldı!');
});

// Statik dosyaları public klasöründen sunma
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key', // Session şifresi
    resave: false,
    saveUninitialized: true
}));

// Giriş sayfası
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Public klasöründeki index.html dosyasını gönder
});

// Dashboard sayfası
app.get('/dashboard', (req, res) => {
    if (!req.session.loggedIn) {
        // Eğer kullanıcı giriş yapmamışsa, ana sayfaya yönlendirilir
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html')); // Public klasöründeki dashboard.html dosyasını gönder
});

// Giriş işlemi
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Veritabanında kullanıcı doğrulama
    const query = 'SELECT * FROM kullanicilar WHERE kullanici_adi = ? AND kullanici_parolasi = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Sorgu hatası:', err);
            return res.status(500).send('Bir hata oluştu, lütfen tekrar deneyin.');
        }

        if (results.length > 0) {
            req.session.loggedIn = true; // Oturumu başlat
            return res.redirect('/dashboard'); // Başarılı giriş sonrası yönlendirme
        } else {
            return res.send('<h1>Giriş başarısız! Kullanıcı adı veya şifre yanlış.</h1>');
        }
    });
});

// Çıkış işlemi
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Çıkış yapılırken bir hata oluştu.');
        }
        res.redirect('/');
    });
});

// Satış verileri API'si
app.get('/api/satislar', (req, res) => {
    const query = 'SELECT ay_id, satis_miktari FROM satislar ORDER BY FIELD(ay_id, "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık")';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Veri çekme hatası:', err);
            res.status(500).send('Veritabanı hatası');
        } else {
            res.json(results); // Satış verilerini JSON formatında gönder
        }
    });
});

// /api/iller-en-fazla-satis API'si
app.get('/api/iller-en-fazla-satis', (req, res) => {
    const query = 'SELECT il_adi, satis_sayisi FROM iller ORDER BY satis_sayisi DESC LIMIT 6';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Veri çekme hatası:', err);
            res.status(500).send('Veritabanı hatası');
        } else {
            res.json(results); // İlk 6 ilin satış verilerini JSON formatında gönder
        }
    });
});

// Mağaza kapasite verilerini getiren API endpoint'i
app.get('/api/magazalar', (req, res) => {
    const query = `
        SELECT 
            magaza_adi,
            kapasite as kapasite,
            buyume as buyume
        FROM kapasite
        ORDER BY kapasite DESC`;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Veri çekme hatası:', err);
            res.status(500).send('Veritabanı hatası');
            return;
        }
        console.log('Mağaza verileri:', results); // Debug için
        res.json(results);
    });
});

// Mağaza türüne göre verileri getiren basitleştirilmiş API endpoint
app.get('/api/magaza-verileri', (req, res) => {
    const magazaTuru = req.query.tur || 'all';
    
    let query;
    let queryParams = [];

    if (magazaTuru === 'all') {
        query = `
            SELECT 
                'Tüm Mağazalar' as magaza_turu,
                SUM(aktif_magaza) as aktif_magaza,
                SUM(satis_miktari) as satis_miktari,
                SUM(musteri_sayisi) as musteri_sayisi,
                AVG(sepet_ortalama) as sepet_ortalama,
                SUM(toplam_satis) as toplam_satis
            FROM magazalar
        `;
    } else {
        query = `
            SELECT 
                magaza_turu,
                aktif_magaza,
                satis_miktari,
                musteri_sayisi,
                sepet_ortalama,
                toplam_satis
            FROM magazalar
            WHERE magaza_turu = ?
        `;
        queryParams = [magazaTuru];
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Veri çekme hatası:', err);
            return res.status(500).json({ error: 'Veritabanı hatası' });
        }

        const processedResults = results.map(row => ({
            magaza_turu: row.magaza_turu,
            aktif_magaza: row.aktif_magaza,
            satis_miktari: row.satis_miktari,
            musteri_sayisi: row.musteri_sayisi || 0, // Null kontrolü
            sepet_ortalama: row.sepet_ortalama,
            toplam_satis: row.toplam_satis
        }));

        res.json(processedResults);
    });
});

// Şehir listesi API'si
app.get('/api/iller', (req, res) => {
    const query = 'SELECT il_adi FROM iller';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Veri çekme hatası:', err);
            res.status(500).send('Veritabanı hatası');
        } else {
            res.json(results);
        }
    });
});

// Müşteri şikayetleri verilerini getiren API endpoint'i
app.get('/api/sikayetler', (req, res) => {
    const query = 'SELECT sikayet_sayisi FROM sikayetler';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Veri çekme hatası:', err);
            res.status(500).send('Veritabanı hatası');
        } else {
            res.json(results);
        }
    });
});

// İl nüfusu ve satış verilerini getiren yeni API endpoint
app.get('/api/il-bilgileri/:ilAdi', (req, res) => {
    const ilAdi = req.params.ilAdi;
    const query = `
        SELECT 
            il_adi,
            nufus,
            ortalama_gunluk_satis,
            satis_sayisi
        FROM iller
        WHERE il_adi = ?`;
    
    db.query(query, [ilAdi], (err, results) => {
        if (err) {
            console.error('Veri çekme hatası:', err);
            return res.status(500).json({ error: 'Veritabanı hatası' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ 
                error: 'İl bulunamadı',
                // Varsayılan değerler gönder
                data: {
                    il_adi: ilAdi,
                    nufus: 100000,
                    ortalama_gunluk_satis: 100,
                    satis_sayisi: 1000
                }
            });
        }
        
        res.json(results[0]);
    });
});

// Bölgesel verileri getiren API endpoint'i
app.get('/api/bolge-verileri/:bolgeAdi', (req, res) => {
    const bolgeAdi = req.params.bolgeAdi;
    const query = `
        SELECT 
            magaza_sayisi,
            aktif_magaza,
            talep_sayisi,
            karsilanan_talep
        FROM bolge_istatistikleri
        WHERE bolge_adi = ?`;
    
    db.query(query, [bolgeAdi], (err, results) => {
        if (err) {
            console.error('Veri çekme hatası:', err);
            return res.status(500).json({ error: 'Veritabanı hatası' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Bölge bulunamadı' });
        }
        
        res.json(results[0]);
    });
});

app.listen(port, () => {
    console.log(`Server çalışıyor: http://localhost:${port}`);
});

// Chart verilerini almak için bir API
app.get('/api/chart-data', (req, res) => {
    const query = 'SELECT yil_id, sarj_sayisi FROM şarj'; // Tablo adınızı doğru girin
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// Yıla göre veri çekme API endpoint'i
app.get('/api/aylik-satis', (req, res) => {
    const yil = req.query.yil; // Yıl parametresini alıyoruz
    const query = 'SELECT il_adi, talep_sayisi FROM talepler WHERE yil_id = ?';
    
    db.query(query, [yil], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
