export const modules = {
  'iot-basics': {
    title: 'IoT Basics',
    subtitle: 'Sensor & Dashboard',
    desc: 'Memahami konsep dasar Internet of Things (IoT), cara kerja sensor, dan bagaimana data sensor ditampilkan pada dashboard monitoring.',
    level: 'Pemula',
    duration: '15 menit',
    progress: 70,
    goals: [
      'Menjelaskan konsep dasar IoT dan arsitekturnya',
      'Mengenal jenis-jenis sensor pada kit praktikum',
      'Membaca data sensor secara real-time di dashboard',
      'Menganalisis perubahan data melalui grafik'
    ],
    sections: [
      {
        heading: 'Apa itu IoT?',
        body: 'Internet of Things (IoT) adalah konsep di mana perangkat fisik (seperti sensor, aktuator, dan mikrokontroler) terhubung ke jaringan internet untuk mengirim dan menerima data secara otomatis. Pada praktikum ini, perangkat utama yang digunakan adalah mikrokontroler ESP32.',
        points: [
          'ESP32 sebagai pusat pengendali dan pengiriman data',
          'Sensor membaca kondisi lingkungan (suhu, cahaya, kelembapan)',
          'Data dikirim ke server/dashboard melalui WiFi',
          'Dashboard menampilkan data secara real-time untuk dimonitor'
        ]
      },
      {
        heading: 'Komponen pada Modul Sensor',
        body: 'Modul sensor membaca besaran fisik lalu mengubahnya menjadi sinyal listrik yang bisa dibaca mikrokontroler.',
        table: [
          { sensor: 'DHT22', fungsi: 'Suhu & kelembapan udara', pin: 'D4', output: 'Digital 1-wire' },
          { sensor: 'BH1750', fungsi: 'Intensitas cahaya (lux)', pin: 'I2C', output: 'Digital I2C' },
          { sensor: 'MQ-135', fungsi: 'Kualitas udara (ppm)', pin: 'A0', output: 'Analog' },
          { sensor: 'BMP280', fungsi: 'Tekanan udara (hPa)', pin: 'I2C', output: 'Digital I2C' },
          { sensor: 'HC-SR04', fungsi: 'Jarak (cm)', pin: 'D5', output: 'Digital' },
          { sensor: 'SW-420', fungsi: 'Getaran / gerakan', pin: 'D2', output: 'Digital' }
        ]
      },
      {
        heading: 'Membaca Data di Dashboard',
        body: 'Di halaman Dashboard terdapat 8 kartu sensor yang menampilkan nilai terbaru, perubahan dari pembacaan sebelumnya (naik/turun), serta grafik kecil (sparkline) sebagai tren waktu nyata.',
        points: [
          'Nilai besar menunjukkan pembacaan sensor terakhir',
          'Panah ↑ / ↓ menunjukkan arah perubahan',
          'Sparkline memperlihatkan tren 60 pembacaan terakhir',
          'Tab 1 Jam / 7 Hari / 30 Hari mengubah rentang grafik utama'
        ]
      }
    ],
    practice: {
      title: 'Praktik: Amati Data Sensor',
      steps: [
        'Buka menu Dashboard pada sidebar.',
        'Perhatikan 8 kartu pada bagian Data Sensor (Real-time).',
        'Catat nilai Suhu dan Kelembapan, tunggu beberapa detik, lalu bandingkan perubahannya.',
        'Buka tab grafik "1 Jam" dan "7 Hari", amati perbedaan bentuk grafik.',
        'Baca nilai pada kartu Kualitas Udara; jelaskan apakah berada dalam rentang normal.'
      ]
    },
    code: {
      lang: 'C++',
      title: 'Contoh Arduino: Membaca DHT22',
      snippet: `#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  Serial.print("Suhu: "); Serial.print(t); Serial.println(" C");
  Serial.print("Kelembapan: "); Serial.print(h); Serial.println(" %");

  delay(2000);
}`
    },
    quiz: [
      {
        q: 'Apa fungsi mikrokontroler pada sistem IoT di praktikum ini?',
        options: ['Membaca sensor & mengirim data', 'Menampilkan grafik', 'Menyimpan database', 'Memproses gambar'],
        answer: 0
      },
      {
        q: 'Output yang diberikan sensor HC-SR04 adalah ...',
        options: ['Nilai suhu', 'Jarak (cm)', 'Intensitas cahaya', 'Kualitas udara'],
        answer: 1
      }
    ]
  },

  automation: {
    title: 'Automation',
    subtitle: 'Rule & Relay',
    desc: 'Belajar membuat otomasi sederhana menggunakan aturan (rules) yang menghubungkan pembacaan sensor dengan aktuator seperti relay, LED, dan buzzer.',
    level: 'Menengah',
    duration: '20 menit',
    progress: 45,
    goals: [
      'Memahami cara kerja relay sebagai saklar listrik',
      'Membuat aturan "Jika sensor, maka output"',
      'Mengaktifkan dan menonaktifkan aturan otomasi',
      'Menguji otomasi pada modul praktikum'
    ],
    sections: [
      {
        heading: 'Konsep Otomasi',
        body: 'Otomasi memungkinkan perangkat bekerja tanpa campur tangan manual. Pola dasar otomasi adalah: sensor membaca kondisi → aturan (rule) dievaluasi → aktuator dijalankan.',
        points: [
          'Sensor menjadi "mata" sistem',
          'Aturan menjadi "otak" pengambil keputusan',
          'Aktuator menjadi "tangan" yang bertindak',
          'Contoh: jika Suhu > 30°C maka Kipas menyala'
        ]
      },
      {
        heading: 'Relay sebagai Aktuator',
        body: 'Relay adalah saklar elektromagnetik. Saat diberi sinyal LOW/HIGH oleh ESP32, relay menghubungkan atau memutuskan rangkaian listrik. Berguna untuk mengontrol perangkat bertegangan tinggi dengan logika kecil.',
        points: [
          'Relay 1 & Relay 2 tersedia pada kit praktikum',
          'Setiap relay dapat dihubungkan ke beban seperti lampu atau pompa',
          'Status relay selalu tampil pada menu Kontrol Output'
        ]
      },
      {
        heading: 'Menulis Aturan Otomasi',
        body: 'Pada halaman Automation, aturan ditulis dengan format: Jika [sensor] [operator] [ambang], maka [aksi] [output]. Contoh lainnya: Jika Kelembapan < 50% maka Nyalakan Buzzer.',
        points: [
          'Operator > dan < membandingkan nilai sensor dengan ambang',
          'Operator "terdeteksi" untuk sensor diskrit (getaran/gerakan)',
          'Setiap aturan dapat diaktifkan/dinonaktifkan lewat toggle',
          'Eksperimen dapat dikombinasikan dengan aturan otomasi'
        ]
      }
    ],
    practice: {
      title: 'Praktik: Buat Aturan Kipas Otomatis',
      steps: [
        'Buka menu Automation (Output).',
        'Tekan tombol "Tambah Rule".',
        'Kondisi sensor: Suhu, Operator: >, Ambang: 30.',
        'Aksi: Nyalakan, Target: Kipas, lalu Simpan.',
        'Perhatikan kartu Status Otomasi; aktifkan aturan dan catat hasilnya.'
      ]
    },
    code: {
      lang: 'C++',
      title: 'Contoh Arduino: Relay + Threshold',
      snippet: `const int DHTPIN = 4;
const int RELAY = 13;

float bacaSuhu() {
  // baca suhu dari sensor DHT22
  return dht.readTemperature();
}

void loop() {
  float suhu = bacaSuhu();

  if (suhu > 30.0) {
    digitalWrite(RELAY, HIGH); // relay ON
  } else {
    digitalWrite(RELAY, LOW);  // relay OFF
  }

  delay(2000);
}`
    },
    quiz: [
      {
        q: 'Pola dasar otomasi yang benar adalah ...',
        options: ['Output → aturan → sensor', 'Sensor → aturan → aktuator', 'Aktuator → sensor → aturan', 'Aturan → sensor → output'],
        answer: 1
      },
      {
        q: 'Komponen yang berfungsi sebagai saklar elektromagnetik adalah ...',
        options: ['Resistor', 'Capacitor', 'Relay', 'Transistor'],
        answer: 2
      }
    ]
  },

  'computer-vision': {
    title: 'Computer Vision',
    subtitle: 'Object Detection',
    desc: 'Menggunakan kamera dan model AI YOLOv8 untuk mendeteksi objek (seperti orang) secara real-time, lalu menampilkan hasilnya pada dashboard.',
    level: 'Menengah',
    duration: '25 menit',
    progress: 30,
    goals: [
      'Memahami konsep computer vision dan object detection',
      'Mengenal model YOLOv8 sebagai detektor objek',
      'Membaca hasil deteksi (label & confidence)',
      'Menafsirkan rekomendasi berdasarkan deteksi'
    ],
    sections: [
      {
        heading: 'Apa itu Computer Vision?',
        body: 'Computer vision adalah bidang AI yang memungkinkan komputer "melihat" dan memahami gambar atau video. Object detection adalah salah satu tugasnya: menemukan objek dalam gambar beserta posisinya (bounding box).',
        points: [
          'Kamera menangkap frame secara real-time',
          'Model AI menganalisis setiap frame',
          'Hasil berupa label objek, posisi kotak, dan confidence',
          'Confidence adalah tingkat keyakinan model terhadap deteksi'
        ]
      },
      {
        heading: 'YOLOv8 dan Confidence',
        body: 'YOLO (You Only Look Once) adalah arsitektur deteksi objek yang cepat dan akurat. YOLOv8 dapat mendeteksi orang, kendaraan, dan objek lain pada kecepatan tinggi — cocok untuk monitoring kamera.',
        table: [
          { sensor: 'Label', fungsi: 'Kelas objek yang dikenali', pin: '—', output: 'cth: Person' },
          { sensor: 'Confidence', fungsi: 'Tingkat keyakinan 0–100%', pin: '—', output: 'cth: 96%' },
          { sensor: 'Bounding box', fungsi: 'Posisi objek pada gambar', pin: '—', output: 'Kotak hijau' },
          { sensor: 'FPS', fungsi: 'Kecepatan proses frame', pin: '—', output: '~24 fps' }
        ]
      },
      {
        heading: 'Interpretasi Hasil',
        body: 'Pada panel Analisis AI, hasil deteksi ditampilkan beserta rekomendasi. Rekomendasi dibuat untuk membantu pengambilan keputusan, misalnya mengaktifkan mode keamanan saat ada orang tidak dikenal.',
        points: [
          'Deteksi "Person Detected" = ada orang di area kamera',
          'Confidence tinggi berarti model sangat yakin',
          'Panel Rekomendasi memberi saran tindakan',
          'Mode "Keamanan" dapat diaktifkan dari pengaturan deteksi'
        ]
      }
    ],
    practice: {
      title: 'Praktik: Uji Deteksi Objek',
      steps: [
        'Buka menu Computer Vision (AI).',
        'Amati preview kamera pada kartu Kamera.',
        'Tekan tombol "Tangkap Deteksi" dan amati riwayat yang muncul.',
        'Ubah Confidence Threshold menjadi 85%, lalu bandingkan hasilnya.',
        'Aktifkan mode "Keamanan" dan baca rekomendasi pada dashboard.'
      ]
    },
    code: {
      lang: 'Python',
      title: 'Contoh: Deteksi dengan YOLOv8',
      snippet: `from ultralytics import YOLO
import cv2

# Load model
model = YOLO("yolov8n.pt")

cam = cv2.VideoCapture(0)

while True:
    ret, frame = cam.read()
    if not ret:
        break

    results = model(frame, conf=0.60)

    for r in results:
        for box, cls, conf in zip(r.boxes.xyxy,
                                  r.boxes.cls,
                                  r.boxes.conf):
            label = r.names[int(cls)]
            print(f"{label} — {conf:.2f}")

    key = cv2.waitKey(1)
    if key == 27:
        break`
    },
    quiz: [
      {
        q: 'Confidence yang tinggi pada deteksi menunjukkan ...',
        options: ['Model ragu pada hasilnya', 'Model sangat yakin pada deteksi', 'Kamera bermasalah', 'Gambar gelap'],
        answer: 1
      },
      {
        q: 'Arsitektur deteksi objek yang digunakan pada dashboard adalah ...',
        options: ['LSTM', 'GPT', 'ResNet', 'YOLOv8'],
        answer: 3
      }
    ]
  },

  'ai-iot': {
    title: 'AI + IoT',
    subtitle: 'Smart Recommendation',
    desc: 'Menggabungkan data sensor dan AI untuk menghasilkan rekomendasi cerdas, menjadikan dashboard tidak hanya menampilkan data tetapi juga membimbing keputusan.',
    level: 'Lanjut',
    duration: '20 menit',
    progress: 10,
    goals: [
      'Memahami integrasi AI dengan data IoT',
      'Membaca dan menafsirkan output LLM',
      'Menggunakan rekomendasi untuk keputusan',
      'Rancang sistem rekomendasi sederhana'
    ],
    sections: [
      {
        heading: 'AI + IoT = Smart Monitoring',
        body: 'IoT menyediakan data, AI mengubahnya menjadi makna. Pada dashboard ini, data sensor + hasil deteksi kamera dikirim ke model AI (LLM) yang menyusun rekomendasi otomatis dalam bahasa yang mudah dipahami.',
        points: [
          'Sensor & kamera menghasilkan data mentah',
          'YOLOv8 mengenali objek pada gambar',
          'Data digabung menjadi konteks peristiwa',
          'LLM menghasilkan rekomendasi berbasis konteks'
        ]
      },
      {
        heading: 'Contoh Alur Rekomendasi',
        body: 'Ketika kamera mendeteksi orang di area kerja, sistem menyusun rekomendasi: "Pastikan perangkat dalam kondisi aman. Jika ini bukan aktivitas yang diharapkan, pertimbangkan untuk mengaktifkan mode keamanan." Rekomendasi ini bersifat adaptif terhadap kondisi.',
        table: [
          { sensor: 'Kondisi', fungsi: 'Data yang masuk', pin: '—', output: 'Contoh' },
          { sensor: 'Suhu > 30°C', fungsi: 'Sensor suhu', pin: '—', output: '"Nyalakan kipas"' },
          { sensor: 'Orang terdeteksi', fungsi: 'Kamera + YOLOv8', pin: '—', output: '"Aktifkan mode keamanan"' },
          { sensor: 'Cahaya < 300 lux', fungsi: 'Sensor cahaya', pin: '—', output: '"Nyalakan LED"' }
        ]
      },
      {
        heading: 'Kriteria Rekomendasi',        body: 'Rekomendasi yang baik bersifat jelas, ringkas, dan dapat ditindaklanjuti (actionable). Sistem hanya menampilkan rekomendasi saat ambang kondisi terpenuhi, sehingga tidak menimbulkan kebisingan informasi.',
        points: [
          'Jelas: menyebutkan kondisi dan tindakan',
          'Ringkas: satu atau dua kalimat',
          'Actionable: bisa langsung dieksekusi',
          'Kontekstual: menyesuaikan dengan jenis peristiwa'
        ]
      }
    ],
    practice: {
      title: 'Praktik: Analisis Rekomendasi',
      steps: [
        'Buka Dashboard dan lihat panel "Analisis AI".',
        'Perhatikan bagian Rekomendasi beserta warna peringatannya.',
        'Aktifkan deteksi di menu Computer Vision lalu amati perubahan rekomendasi.',
        'Coba gabungkan aturan otomasi suhu dengan rekomendasi; apakah saling mendukung?',
        'Tulis kesimpulan Anda pada laporan praktikum.'
      ]
    },
    code: {
      lang: 'python',
      title: 'Contoh: Membuat Rekomendasi Sederhana',
      snippet: `def rekomendasi(suhu, ada_orang):
    if ada_orang:
        return ("Orang terdeteksi di area kerja. "
                "Aktifkan mode keamanan jika tidak diharapkan.")
    if suhu > 30:
        return "Suhu tinggi. Nyalakan kipas."
    return "Kondisi normal."`
    },
    quiz: [
      {
        q: 'Peran LLM pada sistem ini adalah ...',
        options: ['Membaca sensor', 'Menyusun rekomendasi bahasa alami', 'Menggerakkan relay', 'Menampilkan grafik'],
        answer: 1
      },
      {
        q: 'Ciri rekomendasi yang baik adalah ...',
        options: ['Panjang dan detail', 'Actionable dan ringkas', 'Berwarna mencolok', 'Selalu tampil'],
        answer: 1
      }
    ]
  }
}