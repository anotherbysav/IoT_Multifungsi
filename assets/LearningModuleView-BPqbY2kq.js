import{c as g,_ as w,a as t,b as a,g as d,u as r,P as K,d as l,t as e,F as c,r as p,e as O,f as D,C as L,Q as q,y as x,z as H,l as B,s as y,n as f,k as _,p as M,R as Y,V as N,B as E,o as i,E as V}from"./index-DPkEmvor.js";import{T as J}from"./timer-DNeb6Q5m.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=g("ArrowRightIcon",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=g("CircleCheckIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=g("CircleHelpIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=g("CirclePlayIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=g("CodeXmlIcon",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=g("CompassIcon",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=g("GraduationCapIcon",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=g("ListChecksIcon",[["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=g("TargetIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]),z={"iot-basics":{title:"IoT Basics",subtitle:"Sensor & Dashboard",desc:"Memahami konsep dasar Internet of Things (IoT), cara kerja sensor, dan bagaimana data sensor ditampilkan pada dashboard monitoring.",level:"Pemula",duration:"15 menit",progress:70,goals:["Menjelaskan konsep dasar IoT dan arsitekturnya","Mengenal jenis-jenis sensor pada kit praktikum","Membaca data sensor secara real-time di dashboard","Menganalisis perubahan data melalui grafik"],sections:[{heading:"Apa itu IoT?",body:"Internet of Things (IoT) adalah konsep di mana perangkat fisik (seperti sensor, aktuator, dan mikrokontroler) terhubung ke jaringan internet untuk mengirim dan menerima data secara otomatis. Pada praktikum ini, perangkat utama yang digunakan adalah mikrokontroler ESP32.",points:["ESP32 sebagai pusat pengendali dan pengiriman data","Sensor membaca kondisi lingkungan (suhu, cahaya, kelembapan)","Data dikirim ke server/dashboard melalui WiFi","Dashboard menampilkan data secara real-time untuk dimonitor"]},{heading:"Komponen pada Modul Sensor",body:"Modul sensor membaca besaran fisik lalu mengubahnya menjadi sinyal listrik yang bisa dibaca mikrokontroler.",table:[{sensor:"DHT22",fungsi:"Suhu & kelembapan udara",pin:"D4",output:"Digital 1-wire"},{sensor:"BH1750",fungsi:"Intensitas cahaya (lux)",pin:"I2C",output:"Digital I2C"},{sensor:"MQ-135",fungsi:"Kualitas udara (ppm)",pin:"A0",output:"Analog"},{sensor:"BMP280",fungsi:"Tekanan udara (hPa)",pin:"I2C",output:"Digital I2C"},{sensor:"HC-SR04",fungsi:"Jarak (cm)",pin:"D5",output:"Digital"},{sensor:"SW-420",fungsi:"Getaran / gerakan",pin:"D2",output:"Digital"}]},{heading:"Membaca Data di Dashboard",body:"Di halaman Dashboard terdapat 8 kartu sensor yang menampilkan nilai terbaru, perubahan dari pembacaan sebelumnya (naik/turun), serta grafik kecil (sparkline) sebagai tren waktu nyata.",points:["Nilai besar menunjukkan pembacaan sensor terakhir","Panah ↑ / ↓ menunjukkan arah perubahan","Sparkline memperlihatkan tren 60 pembacaan terakhir","Tab 1 Jam / 7 Hari / 30 Hari mengubah rentang grafik utama"]}],practice:{title:"Praktik: Amati Data Sensor",steps:["Buka menu Dashboard pada sidebar.","Perhatikan 8 kartu pada bagian Data Sensor (Real-time).","Catat nilai Suhu dan Kelembapan, tunggu beberapa detik, lalu bandingkan perubahannya.",'Buka tab grafik "1 Jam" dan "7 Hari", amati perbedaan bentuk grafik.',"Baca nilai pada kartu Kualitas Udara; jelaskan apakah berada dalam rentang normal."]},code:{lang:"C++",title:"Contoh Arduino: Membaca DHT22",snippet:`#include <DHT.h>

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
}`},quiz:[{q:"Apa fungsi mikrokontroler pada sistem IoT di praktikum ini?",options:["Membaca sensor & mengirim data","Menampilkan grafik","Menyimpan database","Memproses gambar"],answer:0},{q:"Output yang diberikan sensor HC-SR04 adalah ...",options:["Nilai suhu","Jarak (cm)","Intensitas cahaya","Kualitas udara"],answer:1}]},automation:{title:"Automation",subtitle:"Rule & Relay",desc:"Belajar membuat otomasi sederhana menggunakan aturan (rules) yang menghubungkan pembacaan sensor dengan aktuator seperti relay, LED, dan buzzer.",level:"Menengah",duration:"20 menit",progress:45,goals:["Memahami cara kerja relay sebagai saklar listrik",'Membuat aturan "Jika sensor, maka output"',"Mengaktifkan dan menonaktifkan aturan otomasi","Menguji otomasi pada modul praktikum"],sections:[{heading:"Konsep Otomasi",body:"Otomasi memungkinkan perangkat bekerja tanpa campur tangan manual. Pola dasar otomasi adalah: sensor membaca kondisi → aturan (rule) dievaluasi → aktuator dijalankan.",points:['Sensor menjadi "mata" sistem','Aturan menjadi "otak" pengambil keputusan','Aktuator menjadi "tangan" yang bertindak',"Contoh: jika Suhu > 30°C maka Kipas menyala"]},{heading:"Relay sebagai Aktuator",body:"Relay adalah saklar elektromagnetik. Saat diberi sinyal LOW/HIGH oleh ESP32, relay menghubungkan atau memutuskan rangkaian listrik. Berguna untuk mengontrol perangkat bertegangan tinggi dengan logika kecil.",points:["Relay 1 & Relay 2 tersedia pada kit praktikum","Setiap relay dapat dihubungkan ke beban seperti lampu atau pompa","Status relay selalu tampil pada menu Kontrol Output"]},{heading:"Menulis Aturan Otomasi",body:"Pada halaman Automation, aturan ditulis dengan format: Jika [sensor] [operator] [ambang], maka [aksi] [output]. Contoh lainnya: Jika Kelembapan < 50% maka Nyalakan Buzzer.",points:["Operator > dan < membandingkan nilai sensor dengan ambang",'Operator "terdeteksi" untuk sensor diskrit (getaran/gerakan)',"Setiap aturan dapat diaktifkan/dinonaktifkan lewat toggle","Eksperimen dapat dikombinasikan dengan aturan otomasi"]}],practice:{title:"Praktik: Buat Aturan Kipas Otomatis",steps:["Buka menu Automation (Output).",'Tekan tombol "Tambah Rule".',"Kondisi sensor: Suhu, Operator: >, Ambang: 30.","Aksi: Nyalakan, Target: Kipas, lalu Simpan.","Perhatikan kartu Status Otomasi; aktifkan aturan dan catat hasilnya."]},code:{lang:"C++",title:"Contoh Arduino: Relay + Threshold",snippet:`const int DHTPIN = 4;
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
}`},quiz:[{q:"Pola dasar otomasi yang benar adalah ...",options:["Output → aturan → sensor","Sensor → aturan → aktuator","Aktuator → sensor → aturan","Aturan → sensor → output"],answer:1},{q:"Komponen yang berfungsi sebagai saklar elektromagnetik adalah ...",options:["Resistor","Capacitor","Relay","Transistor"],answer:2}]},"computer-vision":{title:"Computer Vision",subtitle:"Object Detection",desc:"Menggunakan kamera dan model AI YOLOv8 untuk mendeteksi objek (seperti orang) secara real-time, lalu menampilkan hasilnya pada dashboard.",level:"Menengah",duration:"25 menit",progress:30,goals:["Memahami konsep computer vision dan object detection","Mengenal model YOLOv8 sebagai detektor objek","Membaca hasil deteksi (label & confidence)","Menafsirkan rekomendasi berdasarkan deteksi"],sections:[{heading:"Apa itu Computer Vision?",body:'Computer vision adalah bidang AI yang memungkinkan komputer "melihat" dan memahami gambar atau video. Object detection adalah salah satu tugasnya: menemukan objek dalam gambar beserta posisinya (bounding box).',points:["Kamera menangkap frame secara real-time","Model AI menganalisis setiap frame","Hasil berupa label objek, posisi kotak, dan confidence","Confidence adalah tingkat keyakinan model terhadap deteksi"]},{heading:"YOLOv8 dan Confidence",body:"YOLO (You Only Look Once) adalah arsitektur deteksi objek yang cepat dan akurat. YOLOv8 dapat mendeteksi orang, kendaraan, dan objek lain pada kecepatan tinggi — cocok untuk monitoring kamera.",table:[{sensor:"Label",fungsi:"Kelas objek yang dikenali",pin:"—",output:"cth: Person"},{sensor:"Confidence",fungsi:"Tingkat keyakinan 0–100%",pin:"—",output:"cth: 96%"},{sensor:"Bounding box",fungsi:"Posisi objek pada gambar",pin:"—",output:"Kotak hijau"},{sensor:"FPS",fungsi:"Kecepatan proses frame",pin:"—",output:"~24 fps"}]},{heading:"Interpretasi Hasil",body:"Pada panel Analisis AI, hasil deteksi ditampilkan beserta rekomendasi. Rekomendasi dibuat untuk membantu pengambilan keputusan, misalnya mengaktifkan mode keamanan saat ada orang tidak dikenal.",points:['Deteksi "Person Detected" = ada orang di area kamera',"Confidence tinggi berarti model sangat yakin","Panel Rekomendasi memberi saran tindakan",'Mode "Keamanan" dapat diaktifkan dari pengaturan deteksi']}],practice:{title:"Praktik: Uji Deteksi Objek",steps:["Buka menu Computer Vision (AI).","Amati preview kamera pada kartu Kamera.",'Tekan tombol "Tangkap Deteksi" dan amati riwayat yang muncul.',"Ubah Confidence Threshold menjadi 85%, lalu bandingkan hasilnya.",'Aktifkan mode "Keamanan" dan baca rekomendasi pada dashboard.']},code:{lang:"Python",title:"Contoh: Deteksi dengan YOLOv8",snippet:`from ultralytics import YOLO
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
        break`},quiz:[{q:"Confidence yang tinggi pada deteksi menunjukkan ...",options:["Model ragu pada hasilnya","Model sangat yakin pada deteksi","Kamera bermasalah","Gambar gelap"],answer:1},{q:"Arsitektur deteksi objek yang digunakan pada dashboard adalah ...",options:["LSTM","GPT","ResNet","YOLOv8"],answer:3}]},"ai-iot":{title:"AI + IoT",subtitle:"Smart Recommendation",desc:"Menggabungkan data sensor dan AI untuk menghasilkan rekomendasi cerdas, menjadikan dashboard tidak hanya menampilkan data tetapi juga membimbing keputusan.",level:"Lanjut",duration:"20 menit",progress:10,goals:["Memahami integrasi AI dengan data IoT","Membaca dan menafsirkan output LLM","Menggunakan rekomendasi untuk keputusan","Rancang sistem rekomendasi sederhana"],sections:[{heading:"AI + IoT = Smart Monitoring",body:"IoT menyediakan data, AI mengubahnya menjadi makna. Pada dashboard ini, data sensor + hasil deteksi kamera dikirim ke model AI (LLM) yang menyusun rekomendasi otomatis dalam bahasa yang mudah dipahami.",points:["Sensor & kamera menghasilkan data mentah","YOLOv8 mengenali objek pada gambar","Data digabung menjadi konteks peristiwa","LLM menghasilkan rekomendasi berbasis konteks"]},{heading:"Contoh Alur Rekomendasi",body:'Ketika kamera mendeteksi orang di area kerja, sistem menyusun rekomendasi: "Pastikan perangkat dalam kondisi aman. Jika ini bukan aktivitas yang diharapkan, pertimbangkan untuk mengaktifkan mode keamanan." Rekomendasi ini bersifat adaptif terhadap kondisi.',table:[{sensor:"Kondisi",fungsi:"Data yang masuk",pin:"—",output:"Contoh"},{sensor:"Suhu > 30°C",fungsi:"Sensor suhu",pin:"—",output:'"Nyalakan kipas"'},{sensor:"Orang terdeteksi",fungsi:"Kamera + YOLOv8",pin:"—",output:'"Aktifkan mode keamanan"'},{sensor:"Cahaya < 300 lux",fungsi:"Sensor cahaya",pin:"—",output:'"Nyalakan LED"'}]},{heading:"Kriteria Rekomendasi",body:"Rekomendasi yang baik bersifat jelas, ringkas, dan dapat ditindaklanjuti (actionable). Sistem hanya menampilkan rekomendasi saat ambang kondisi terpenuhi, sehingga tidak menimbulkan kebisingan informasi.",points:["Jelas: menyebutkan kondisi dan tindakan","Ringkas: satu atau dua kalimat","Actionable: bisa langsung dieksekusi","Kontekstual: menyesuaikan dengan jenis peristiwa"]}],practice:{title:"Praktik: Analisis Rekomendasi",steps:['Buka Dashboard dan lihat panel "Analisis AI".',"Perhatikan bagian Rekomendasi beserta warna peringatannya.","Aktifkan deteksi di menu Computer Vision lalu amati perubahan rekomendasi.","Coba gabungkan aturan otomasi suhu dengan rekomendasi; apakah saling mendukung?","Tulis kesimpulan Anda pada laporan praktikum."]},code:{lang:"python",title:"Contoh: Membuat Rekomendasi Sederhana",snippet:`def rekomendasi(suhu, ada_orang):
    if ada_orang:
        return ("Orang terdeteksi di area kerja. "
                "Aktifkan mode keamanan jika tidak diharapkan.")
    if suhu > 30:
        return "Suhu tinggi. Nyalakan kipas."
    return "Kondisi normal."`},quiz:[{q:"Peran LLM pada sistem ini adalah ...",options:["Membaca sensor","Menyusun rekomendasi bahasa alami","Menggerakkan relay","Menampilkan grafik"],answer:1},{q:"Ciri rekomendasi yang baik adalah ...",options:["Panjang dan detail","Actionable dan ringkas","Berwarna mencolok","Selalu tampil"],answer:1}]}},aa={class:"bread"},ea={class:"layout"},na={class:"l-nav card"},ia={class:"ln-ic"},sa={class:"ln-main"},ta={key:0},oa={class:"l-main"},ra={class:"card hero rise rise-1"},la={class:"hero-top"},da={class:"hero-ic"},ua={class:"hero-txt"},ka={class:"hero-sub"},ma={class:"hero-desc"},ca={class:"hero-badge"},pa={class:"chip chip-gray"},ga={class:"chip chip-gray"},ha={class:"hero-prog"},ba={class:"prog-row"},ya={class:"prog-bar"},fa={key:1,class:"chip chip-green"},_a={class:"card sec rise rise-2"},va={class:"card-head"},Ca={class:"card-title"},Ma={class:"goals"},Sa={class:"card-head"},Aa={class:"card-title"},Ta={class:"sec-body"},Ia={class:"sec-text"},ja={key:0,class:"points"},Oa={key:1,class:"table"},Da={class:"mono"},La={class:"mono"},za={class:"card sec rise rise-2"},Pa={class:"card-head"},Ra={class:"card-title"},wa={class:"chip chip-green"},Ka={class:"steps"},qa={class:"step-num"},xa={class:"card sec rise rise-3"},Ha={class:"card-head"},Ba={class:"card-title"},Ya={class:"chip chip-gray"},Na={class:"codeblock"},Ea={class:"card sec rise rise-3"},Va={class:"card-head"},Ja={class:"card-title"},Fa={class:"quiz-body"},Ga={class:"quiz-text"},Wa={class:"quiz-opts"},Ua=["onClick"],$a={class:"qkey"},Qa={__name:"LearningModuleView",setup(Xa){const A=N(),T=[{slug:"iot-basics",title:"IoT Basics",icon:L},{slug:"automation",title:"Automation",icon:q},{slug:"computer-vision",title:"Computer Vision",icon:x},{slug:"ai-iot",title:"AI + IoT",icon:H}],s=M(()=>z[A.params.slug]||z["iot-basics"]),h=Y({}),I=M(()=>{let b=0;return s.value.quiz.forEach((o,C)=>{h[C]===o.answer&&b++}),b}),v=M(()=>Object.keys(h).length===s.value.quiz.length);function P(){for(const b in h)delete h[b]}function R(){y.learningDone[s.value.slug]=!0,y.toast(`Modul "${s.value.title}" selesai`)}return(b,o)=>{var j;const C=E("RouterLink");return i(),t("div",null,[a("div",aa,[d(r(K),{size:14}),o[0]||(o[0]=l(" Learning Modules ",-1)),o[1]||(o[1]=a("span",{class:"sep"},"/",-1)),l(" "+e(s.value.title),1)]),a("div",ea,[a("aside",na,[o[2]||(o[2]=a("p",{class:"ln-label"},"Daftar Modul",-1)),(i(),t(c,null,p(T,n=>d(C,{key:n.slug,to:`/learn/${n.slug}`,class:f(["ln-item",{active:r(A).params.slug===n.slug}])},{default:V(()=>[a("span",ia,[(i(),O(D(n.icon),{size:17}))]),a("span",sa,[a("span",null,e(n.title),1),r(y).learningDone[n.slug]?(i(),t("em",ta,"Selesai")):_("",!0)]),d(r(F),{size:14,class:"ln-chev"})]),_:2},1032,["to","class"])),64))]),a("div",oa,[a("div",ra,[a("div",la,[a("span",da,[(i(),O(D(((j=T.find(n=>n.slug===s.value.slug))==null?void 0:j.icon)||r(L)),{size:22}))]),a("div",ua,[a("h1",null,e(s.value.title),1),a("p",ka,e(s.value.subtitle),1),a("p",ma,e(s.value.desc),1)]),a("div",ca,[a("span",pa,[d(r(Q),{size:12}),l(" "+e(s.value.level),1)]),a("span",ga,[d(r(J),{size:12}),l(" "+e(s.value.duration),1)])])]),a("div",ha,[a("div",ba,[o[3]||(o[3]=a("span",null,"Progres Modul",-1)),a("strong",null,e(s.value.progress)+"%",1)]),a("div",ya,[a("div",{class:"prog-fill",style:B({width:s.value.progress+"%"})},null,4)])]),r(y).learningDone[s.value.slug]?(i(),t("span",fa,[d(r(S),{size:13}),o[5]||(o[5]=l(" Modul sudah selesai",-1))])):(i(),t("button",{key:0,class:"btn btn-primary",onClick:R},[d(r(S),{size:15}),o[4]||(o[4]=l(" Tandai Selesai ",-1))]))]),a("div",_a,[a("div",va,[a("h3",Ca,[d(r(Z),{size:16}),o[6]||(o[6]=l(" Tujuan Pembelajaran",-1))])]),a("ul",Ma,[(i(!0),t(c,null,p(s.value.goals,n=>(i(),t("li",{key:n},[d(r(S),{size:15}),l(e(n),1)]))),128))])]),(i(!0),t(c,null,p(s.value.sections,(n,u)=>(i(),t("div",{key:u,class:f(["card sec rise",`rise-${(u+1)%4}`])},[a("div",Sa,[a("h3",Aa,[d(r($),{size:16}),l(" "+e(n.heading),1)])]),a("div",Ta,[a("p",Ia,e(n.body),1),n.points?(i(),t("ul",ja,[(i(!0),t(c,null,p(n.points,(k,m)=>(i(),t("li",{key:m},e(k),1))),128))])):_("",!0),n.table?(i(),t("table",Oa,[a("thead",null,[a("tr",null,[(i(),t(c,null,p(["Sensor","Fungsi","Pin","Output"],k=>a("th",{key:k},e(k),1)),64))])]),a("tbody",null,[(i(!0),t(c,null,p(n.table,(k,m)=>(i(),t("tr",{key:m},[a("td",Da,e(k.sensor),1),a("td",null,e(k.fungsi),1),a("td",La,e(k.pin),1),a("td",null,e(k.output),1)]))),128))])])):_("",!0)])],2))),128)),a("div",za,[a("div",Pa,[a("h3",Ra,[d(r(X),{size:16}),l(" "+e(s.value.practice.title),1)]),a("span",wa,[d(r(W),{size:12}),o[7]||(o[7]=l(" Panduan",-1))])]),a("ol",Ka,[(i(!0),t(c,null,p(s.value.practice.steps,(n,u)=>(i(),t("li",{key:u},[a("span",qa,e(u+1),1),l(" "+e(n),1)]))),128))])]),a("div",xa,[a("div",Ha,[a("h3",Ba,[d(r(U),{size:16}),l(" "+e(s.value.code.title),1)]),a("span",Ya,e(s.value.code.lang),1)]),a("pre",Na,[a("code",null,e(s.value.code.snippet),1)])]),a("div",Ea,[a("div",Va,[a("h3",Ja,[d(r(G),{size:16}),o[8]||(o[8]=l(" Latihan Soal",-1))]),v.value?(i(),t("span",{key:0,class:f(["chip",I.value===s.value.quiz.length?"chip-green":"chip-amber"])}," Skor: "+e(I.value)+"/"+e(s.value.quiz.length),3)):_("",!0)]),a("div",Fa,[(i(!0),t(c,null,p(s.value.quiz,(n,u)=>(i(),t("div",{key:u,class:"quiz-q"},[a("p",Ga,e(u+1)+". "+e(n.q),1),a("div",Wa,[(i(!0),t(c,null,p(n.options,(k,m)=>(i(),t("button",{key:m,class:f(["qopt",{sel:h[u]===m,right:v.value&&m===n.answer,wrong:v.value&&h[u]===m&&m!==n.answer}]),onClick:Za=>h[u]=m},[a("span",$a,e(String.fromCharCode(65+m)),1),l(e(k),1)],10,Ua))),128))])]))),128)),a("div",{class:"quiz-foot"},[a("button",{class:"btn",onClick:P},"Ulangi")])])])])])])}}},ne=w(Qa,[["__scopeId","data-v-3dc266c7"]]);export{ne as default};
