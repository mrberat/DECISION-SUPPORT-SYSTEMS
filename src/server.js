const express = require('express');
const app = express();
const path = require('path');
const db = require('../db/db')
const bodyParser = require('body-parser');

// Statik dosyaların sunulması için public klasörünün tanımlanması
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ana route dosyalarını projeye dahil etmek
const mainRoutes = require('../src/routes/mainRoutes');
app.use('/signin.html', mainRoutes);
app.use('/api', mainRoutes); // Örnek olarak, /api endpoint'ini kullanıyoruz

  app.get('/bahcelievler2022aylikciro', (req, res) => {
    const sql = `
      SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(ciro) AS aylik_ciro
      FROM bahcelievler
      WHERE YEAR(tarih) = 2022
      GROUP BY YEAR(tarih), MONTH(tarih)
      ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });
  
  app.get('/bahcelievler2023aylikciro', (req, res) => {
    const sql = `
      SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(ciro) AS aylik_ciro
      FROM bahcelievler
      WHERE YEAR(tarih) = 2023
      GROUP BY YEAR(tarih), MONTH(tarih)
      ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });


  app.get('/bahcelievler2022aylikfis', (req, res) => {
    const sql = `
    SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(fis) AS aylik_fis
    FROM bahcelievler
    WHERE YEAR(tarih) = 2022
    
    GROUP BY YEAR(tarih), MONTH(tarih)
    ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });

  app.get('/bahcelievler2023aylikfis', (req, res) => {
    const sql = `
    SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(fis) AS aylik_fis
    FROM bahcelievler
    WHERE YEAR(tarih) = 2023
    
    GROUP BY YEAR(tarih), MONTH(tarih)
    ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });

  app.get('/bahcelievler_yogunluk', (req, res) => {
    const girilen_yil = req.query.yil; // Girilen yıl parametresi örneğin /restoran-verileri?yil=2023 şeklinde
  
    const query = `
      SELECT
          rl.restoran_adi,
          MONTH(p.tarih) AS ay,
          ROUND(AVG(r.fis) / AVG(p.pers_sayi), 1) AS aylik_ortalama_yogunluk
      FROM
          restoran_listesi rl
      JOIN
          personel p ON rl.restoran_id = p.restoran_id
      JOIN
          (
              SELECT tarih, fis, restoran_id FROM bahcelievler
          ) r ON p.restoran_id = r.restoran_id AND MONTH(p.tarih) = MONTH(r.tarih)
      WHERE
          YEAR(p.tarih) = ? 
          AND rl.restoran_adi = 'bahcelievler'
      GROUP BY
          rl.restoran_adi,
          MONTH(p.tarih)
      ORDER BY
          ay
    `;
  
    // SQL sorgusunu çalıştır
    db.query(query, [girilen_yil], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Sorgu çalıştırılırken bir hata oluştu.' });
        throw error;
      }
      res.json(results);
    });
  });

  app.get('/bahcelievler_personel', (req, res) => {
    const secilen_yil = req.query.secilen_yil;
  
    const query = `
      SELECT 
          DATE_FORMAT(p.tarih, '%Y-%m') AS ay,
          SUM(p.pers_sayi) AS toplam_personel
      FROM 
          personel p
      JOIN 
      bahcelievler a ON p.restoran_id = a.restoran_id AND p.tarih = a.tarih
      WHERE 
          p.restoran_id = (SELECT restoran_id FROM restoran_listesi WHERE restoran_adi = 'bahcelievler')
          AND YEAR(p.tarih) = ?
      GROUP BY 
          DATE_FORMAT(p.tarih, '%Y-%m')
      ORDER BY 
          ay
    `;
  
    db.query(query, [secilen_yil], (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results);
    });
  });


  app.get('/altinkum2022aylikciro', (req, res) => {
    const sql = `
      SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(ciro) AS aylik_ciro
      FROM altinkum
      WHERE YEAR(tarih) = 2022
      GROUP BY YEAR(tarih), MONTH(tarih)
      ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });
  

  app.get('/altinkum2023aylikciro', (req, res) => {
    const sql = `
      SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(ciro) AS aylik_ciro
      FROM altinkum
      WHERE YEAR(tarih) = 2023
      GROUP BY YEAR(tarih), MONTH(tarih)
      ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });

  app.get('/altinkum2022aylikfis', (req, res) => {
    const sql = `
      SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(fis) AS aylik_fis
      FROM altinkum
      WHERE YEAR(tarih) = 2022
      GROUP BY YEAR(tarih), MONTH(tarih)
      ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });

  app.get('/altinkum2023aylikfis', (req, res) => {
    const sql = `
      SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(fis) AS aylik_fis
      FROM altinkum
      WHERE YEAR(tarih) = 2023
      GROUP BY YEAR(tarih), MONTH(tarih)
      ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });

  app.get('/altinkum_yogunluk', (req, res) => {
    const girilen_yil = req.query.yil; // Girilen yıl parametresi örneğin /restoran-verileri?yil=2023 şeklinde
  
    const query = `
      SELECT
          rl.restoran_adi,
          MONTH(p.tarih) AS ay,
          ROUND(AVG(r.fis) / AVG(p.pers_sayi), 1) AS aylik_ortalama_yogunluk
      FROM
          restoran_listesi rl
      JOIN
          personel p ON rl.restoran_id = p.restoran_id
      JOIN
          (
              SELECT tarih, fis, restoran_id FROM altinkum
          ) r ON p.restoran_id = r.restoran_id AND MONTH(p.tarih) = MONTH(r.tarih)
      WHERE
          YEAR(p.tarih) = ? 
          AND rl.restoran_adi = 'Altinkum'
      GROUP BY
          rl.restoran_adi,
          MONTH(p.tarih)
      ORDER BY
          ay
    `;
  
    // SQL sorgusunu çalıştır
    db.query(query, [girilen_yil], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Sorgu çalıştırılırken bir hata oluştu.' });
        throw error;
      }
      res.json(results);
    });
  });

  app.get('/altinkum_personel', (req, res) => {
    const secilen_yil = req.query.secilen_yil;
  
    const query = `
      SELECT 
          DATE_FORMAT(p.tarih, '%Y-%m') AS ay,
          SUM(p.pers_sayi) AS toplam_personel
      FROM 
          personel p
      JOIN 
          altinkum a ON p.restoran_id = a.restoran_id AND p.tarih = a.tarih
      WHERE 
          p.restoran_id = (SELECT restoran_id FROM restoran_listesi WHERE restoran_adi = 'altinkum')
          AND YEAR(p.tarih) = ?
      GROUP BY 
          DATE_FORMAT(p.tarih, '%Y-%m')
      ORDER BY 
          ay
    `;
  
    db.query(query, [secilen_yil], (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results);
    });
  });





  
  app.get('/forbes2022aylikciro', (req, res) => {
    const sql = `
      SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(ciro) AS aylik_ciro
      FROM forbes
      WHERE YEAR(tarih) = 2022
      GROUP BY YEAR(tarih), MONTH(tarih)
      ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });
  
  app.get('/forbes2023aylikciro', (req, res) => {
    const sql = `
      SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(ciro) AS aylik_ciro
      FROM forbes
      WHERE YEAR(tarih) = 2023
      GROUP BY YEAR(tarih), MONTH(tarih)
      ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });


  app.get('/forbes2022aylikfis', (req, res) => {
    const sql = `
    SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(fis) AS aylik_fis
    FROM forbes
    WHERE YEAR(tarih) = 2022
    
    GROUP BY YEAR(tarih), MONTH(tarih)
    ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });

  app.get('/forbes2023aylikfis', (req, res) => {
    const sql = `
    SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(fis) AS aylik_fis
    FROM forbes
    WHERE YEAR(tarih) = 2023
    
    GROUP BY YEAR(tarih), MONTH(tarih)
    ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });

  app.get('/forbes_yogunluk', (req, res) => {
    const girilen_yil = req.query.yil; // Girilen yıl parametresi örneğin /restoran-verileri?yil=2023 şeklinde
  
    const query = `
      SELECT
          rl.restoran_adi,
          MONTH(p.tarih) AS ay,
          ROUND(AVG(r.fis) / AVG(p.pers_sayi), 1) AS aylik_ortalama_yogunluk
      FROM
          restoran_listesi rl
      JOIN
          personel p ON rl.restoran_id = p.restoran_id
      JOIN
          (
              SELECT tarih, fis, restoran_id FROM forbes
          ) r ON p.restoran_id = r.restoran_id AND MONTH(p.tarih) = MONTH(r.tarih)
      WHERE
          YEAR(p.tarih) = ? 
          AND rl.restoran_adi = 'forbes'
      GROUP BY
          rl.restoran_adi,
          MONTH(p.tarih)
      ORDER BY
          ay
    `;
  
    // SQL sorgusunu çalıştır
    db.query(query, [girilen_yil], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Sorgu çalıştırılırken bir hata oluştu.' });
        throw error;
      }
      res.json(results);
    });
  });

  app.get('/forbes_personel', (req, res) => {
    const secilen_yil = req.query.secilen_yil;
  
    const query = `
      SELECT 
          DATE_FORMAT(p.tarih, '%Y-%m') AS ay,
          SUM(p.pers_sayi) AS toplam_personel
      FROM 
          personel p
      JOIN 
          forbes a ON p.restoran_id = a.restoran_id AND p.tarih = a.tarih
      WHERE 
          p.restoran_id = (SELECT restoran_id FROM restoran_listesi WHERE restoran_adi = 'forbes')
          AND YEAR(p.tarih) = ?
      GROUP BY 
          DATE_FORMAT(p.tarih, '%Y-%m')
      ORDER BY 
          ay
    `;
  
    db.query(query, [secilen_yil], (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results);
    });
  });


  app.get('/tinaztepe2022aylikciro', (req, res) => {
    const sql = `
      SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(ciro) AS aylik_ciro
      FROM tinaztepe
      WHERE YEAR(tarih) = 2022
      GROUP BY YEAR(tarih), MONTH(tarih)
      ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });
  
  app.get('/tinaztepe2023aylikciro', (req, res) => {
    const sql = `
      SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(ciro) AS aylik_ciro
      FROM tinaztepe
      WHERE YEAR(tarih) = 2023
      GROUP BY YEAR(tarih), MONTH(tarih)
      ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });


  app.get('/tinaztepe2022aylikfis', (req, res) => {
    const sql = `
    SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(fis) AS aylik_fis
    FROM tinaztepe
    WHERE YEAR(tarih) = 2022
    
    GROUP BY YEAR(tarih), MONTH(tarih)
    ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });

  app.get('/tinaztepe2023aylikfis', (req, res) => {
    const sql = `
    SELECT MONTH(tarih) AS ay, YEAR(tarih) AS yil, SUM(fis) AS aylik_fis
    FROM tinaztepe
    WHERE YEAR(tarih) = 2023
    
    GROUP BY YEAR(tarih), MONTH(tarih)
    ORDER BY yil, ay;
    `;
  
    // Veritabanı sorgusunu çalıştır
    db.query(sql, (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        return;
      }
      res.json(results);
    });
  });

  app.get('/tinaztepe_yogunluk', (req, res) => {
    const girilen_yil = req.query.yil; // Girilen yıl parametresi örneğin /restoran-verileri?yil=2023 şeklinde
  
    const query = `
      SELECT
          rl.restoran_adi,
          MONTH(p.tarih) AS ay,
          ROUND(AVG(r.fis) / AVG(p.pers_sayi), 1) AS aylik_ortalama_yogunluk
      FROM
          restoran_listesi rl
      JOIN
          personel p ON rl.restoran_id = p.restoran_id
      JOIN
          (
              SELECT tarih, fis, restoran_id FROM tinaztepe
          ) r ON p.restoran_id = r.restoran_id AND MONTH(p.tarih) = MONTH(r.tarih)
      WHERE
          YEAR(p.tarih) = ? 
          AND rl.restoran_adi = 'tinaztepe'
      GROUP BY
          rl.restoran_adi,
          MONTH(p.tarih)
      ORDER BY
          ay
    `;
  
    // SQL sorgusunu çalıştır
    db.query(query, [girilen_yil], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Sorgu çalıştırılırken bir hata oluştu.' });
        throw error;
      }
      res.json(results);
    });
  });

  app.get('/tinaztepe_personel', (req, res) => {
    const secilen_yil = req.query.secilen_yil;
  
    const query = `
      SELECT 
          DATE_FORMAT(p.tarih, '%Y-%m') AS ay,
          SUM(p.pers_sayi) AS toplam_personel
      FROM 
          personel p
      JOIN 
      tinaztepe a ON p.restoran_id = a.restoran_id AND p.tarih = a.tarih
      WHERE 
          p.restoran_id = (SELECT restoran_id FROM restoran_listesi WHERE restoran_adi = 'tinaztepe')
          AND YEAR(p.tarih) = ?
      GROUP BY 
          DATE_FORMAT(p.tarih, '%Y-%m')
      ORDER BY 
          ay
    `;
  
    db.query(query, [secilen_yil], (err, results) => {
      if (err) {
        throw err;
      }
      res.json(results);
    });
  });










app.get('/ortalama_yogunluk', (req, res) => {
  const query = `
  SELECT 
  DATE_FORMAT(personel.tarih, '%M ') AS ay,
  ROUND(AVG(bahcelievler.fis / personel.pers_sayi), 1) AS ortalama_yogunluk
FROM  
  personel, bahcelievler
WHERE 
  personel.restoran_id = bahcelievler.restoran_id
  AND personel.tarih BETWEEN '2022-01-01' AND '2022-12-31' -- Sadece 2022 yılı verileri
GROUP BY 
  DATE_FORMAT(personel.tarih, '%Y-%m')
ORDER BY 
  ay;
  `;

  // SQL sorgusunu çalıştırma
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
      throw error;
    }
    res.json(results);
  });
});




const sqlQuery = `
    SELECT
        rl.restoran_adi,
        MONTH(p.tarih) AS ay,
        round(AVG(r.fis) / AVG(p.pers_sayi),1) AS aylik_ortalama_yogunluk
    FROM
        restoran_listesi rl
    JOIN
        personel p ON rl.restoran_id = p.restoran_id
    JOIN
        (SELECT
            tarih,
            fis,
            restoran_id
        FROM
            altinkum
        UNION ALL
        SELECT
            tarih,
            fis,
            restoran_id
        FROM
            bahcelievler
        UNION ALL
        SELECT
            tarih,
            fis,
            restoran_id
        FROM
            forbes
        UNION ALL
        SELECT
            tarih,
            fis,
            restoran_id
        FROM
            tinaztepe) r ON p.restoran_id = r.restoran_id AND MONTH(p.tarih) = MONTH(r.tarih)
    WHERE
        YEAR(p.tarih) = ? 
        AND rl.restoran_adi = ?
    GROUP BY
        rl.restoran_adi,
        MONTH(p.tarih)
    ORDER BY
        ay;
`;

// Endpoint
app.get('/yogunluk', (req, res) => {
  const { girilen_yil, girilen_restoran_adi } = req.query;

  // SQL sorgusunu çalıştırma
  db.query(sqlQuery, [girilen_yil, girilen_restoran_adi], (err, results) => {
    if (err) {
      console.error('Hata:', err.message);
      res.status(500).send('Bir hata oluştu');
      return;
    }

    res.json(results); // Sonuçları JSON olarak döndürme
  });
});


app.post('/personel_ekle', (req, res) => {
  const { tarih, fis, ciro, restoran_id, yeni_pers } = req.body;

  // MySQL sorgusu
  const sql = 'INSERT INTO `bahcelievler` (`tarih`, `fis`, `ciro`, `restoran_id`, `yeni_pers`) VALUES (?,?,?,?,?);';
  db.query(sql, [tarih, fis,ciro, restoran_id, yeni_pers], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Personel başarıyla eklendi.' });
    }
  });
});

app.post('/veriEkle', (req, res) => {
  const { tarih, yeniPers } = req.body; // Kullanıcıdan gelen verileri al

  const sql = `INSERT INTO bahcelievler (tarih, fis, ciro, restoran_id, yeni_pers) VALUES (?, "", "", "", ?)`;
  const values = [tarih, yeniPers];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send('Veri eklenirken bir hata oluştu');
      throw err;
    }
    console.log('Veri eklendi:', result);
    res.status(200).send('Veri başarıyla eklendi');
  });
});


app.get('/toplam_personel', (req, res) => {
  const selectedMonth = req.query.month;
  const selectedYear = req.query.year;

  // Seçilen ay ve yılı kullanarak SQL sorgusunu oluşturun
  const query = `
    SELECT 
      DATE_FORMAT(p.tarih, '%Y-%m') AS ay,
      SUM(p.pers_sayi) AS toplam_personel
    FROM 
      personel p
    WHERE 
      p.tarih BETWEEN '${selectedYear}-${selectedMonth}-01' AND LAST_DAY('${selectedYear}-${selectedMonth}-01')
    GROUP BY 
      DATE_FORMAT(p.tarih, '%Y-%m');
  `;

  // Sorguyu MySQL'ye gönderme
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Sorgu çalıştırılırken bir hata oluştu.' });
    } else {
      res.json(results); // Sorgu sonuçlarını istemciye gönderme
    }
  });
});


app.get('/toplam_bos_personel', (req, res) => {
  const selectedMonth = req.query.month;
  const selectedYear = req.query.year;

  const query = `
    SELECT 
      DATE_FORMAT(bp.tarih, '%Y-%m') AS ay,
      SUM(bp.bos_pers) AS toplam_bos_personel
    FROM 
      personel bp
    WHERE 
      bp.tarih BETWEEN '${selectedYear}-${selectedMonth}-01' AND LAST_DAY('${selectedYear}-${selectedMonth}-01')
    GROUP BY 
      DATE_FORMAT(bp.tarih, '%Y-%m');
  `;

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Sorgu çalıştırılırken bir hata oluştu.' });
    } else {
      res.json(results);
    }
  });
});


app.get('/ortalama-yogunluk', (req, res) => {
  const girilen_yil = req.query.year; // Girilen yılı query parametresinden al
  const sqlQuery = `
    SELECT
        rl.restoran_adi,
        MONTH(p.tarih) AS ay,
        ROUND(AVG(r.fis) / AVG(p.pers_sayi), 1) AS aylik_ortalama_yogunluk
    FROM
        restoran_listesi rl
    JOIN
        personel p ON rl.restoran_id = p.restoran_id
    JOIN
        (
            SELECT tarih, fis, restoran_id FROM altinkum
        ) r ON p.restoran_id = r.restoran_id AND MONTH(p.tarih) = MONTH(r.tarih)
    WHERE
        YEAR(p.tarih) = ? 
        AND rl.restoran_adi = 'Altinkum'
    GROUP BY
        rl.restoran_adi,
        MONTH(p.tarih)
    ORDER BY
        ay;
  `;

  db.query(sqlQuery, [girilen_yil], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Sorgu çalıştırılırken bir hata oluştu.' });
    } else {
      res.status(200).json(results);
    }
  });
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} numaralı portta çalışıyor...`);
});
