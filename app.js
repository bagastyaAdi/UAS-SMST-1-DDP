const fs = require("fs");
const prompt = require("prompt-sync")();

// Array untuk menyimpan resep-resep makanan
const resep = [];

// Fungsi untuk menambahkan resep baru
function tambahResep() {
  const namaResep = prompt("Nama Resep: ");
  const bahanBaku = [];
  let nomorBahan = 1;

  // Loop untuk meminta input bahan-bahan
  while (true) {
    const bahan = prompt(`Bahan ke - ${nomorBahan}: `);
    if (bahan === "_") {
      console.log("masukan langkah langkah setelah nya dibawah ini");
      break;
    }

    const jumlah = prompt(`Jumlah bahan ke - ${nomorBahan}: `);
    const satuan = prompt(`Satuan bahan ke - ${nomorBahan}: `);

    // Menambah bahan ke dalam array
    bahanBaku.push({
      bahan: bahan,
      satuan: satuan,
      jumlah: jumlah,
    });

    nomorBahan++;
  }

  const langkah = [];
  let nomorLangkah = 1;

  // Loop untuk meminta input langkah-langkah
  while (true) {
    const langkahText = prompt(`Langkah ke - ${nomorLangkah}: `);
    if (langkahText === "_") {
      break;
    }

    // Menambah langkah ke dalam array
    langkah.push(langkahText);
    nomorLangkah++;
  }

  // Menambah resep baru ke dalam array resep
  resep.push({
    namaResep: namaResep,
    bahanBaku: bahanBaku,
    langkah: langkah,
  });

  // Menyimpan resep ke dalam file
  simpanResepKeFile();
}

// Fungsi untuk mencari resep berdasarkan nama
function cariResep() {
  const namaResep = prompt("Masukkan nama resep: ");
  const resepDitemukan = resep.find((resep) => resep.namaResep === namaResep);
  if (!resepDitemukan) {
    console.log("Resep tidak ditemukan!");
  } else {
    console.log("Resep ditemukan!");
    console.log("Nama Resep: " + resepDitemukan.namaResep);
    console.log("Bahan-bahan:");
    resepDitemukan.bahanBaku.forEach((bahan) => {
      console.log(
        "1. " +
          bahan.bahan +
          " " +
          bahan.satuan +
          " dengan jumblah" +
          bahan.jumlah
      );
    });
    console.log("Langkah-langkah:");
    resepDitemukan.langkah.forEach((langkah) => {
      console.log(langkah);
    });
  }
}

// Fungsi untuk menghapus resep
function hapusResep() {
  console.log("Daftar Resep:");

  // Menampilkan daftar resep
  resep.forEach((r, i) => console.log(`${i + 1}. ${r.namaResep}`));

  const indeksResep = prompt(
    `Pilih Resep yang akan dihapus [1-${resep.length}]: `
  );

  if (indeksResep >= 1 && indeksResep <= resep.length) {
    // Menghapus resep sesuai dengan indeks yang dipilih
    const resepDihapus = resep.splice(indeksResep - 1, 1)[0];
    console.log("Resep berhasil dihapus!");

    // Menyimpan perubahan ke dalam file
    simpanResepKeFile();
  } else {
    console.log("Pilihan tidak valid.");
  }
}

// Fungsi untuk menyimpan resep ke dalam file JSON
function simpanResepKeFile() {
  const jsonString = JSON.stringify(resep, null, 2);
  fs.writeFileSync("resep.json", jsonString);
  console.log("Resep berhasil disimpan dalam file resep.json");
}

// Fungsi untuk membaca resep dari file saat aplikasi dimulai
function bacaResepDariFile() {
  try {
    const data = fs.readFileSync("resep.json", "utf-8");
    const resepDariFile = JSON.parse(data);
    resep.push(...resepDariFile);
    console.log("Resep berhasil dibaca dari file resep.json");
  } catch (error) {
    console.log("Tidak dapat membaca file resep.json");
  }
}

// Fungsi untuk keluar dari aplikasi
function keluar() {
  console.log("Keluar...");
  process.exit();
}

// Objek menu dengan pilihan fungsi sesuai nomor menu
const menu = {
  1: tambahResep,
  2: cariResep,
  3: hapusResep,
  4: keluar,
};

// Loop utama untuk menampilkan menu dan menerima input pengguna
while (true) {
  console.log("=====================");
  console.log("Program Resep Makanan");
  console.log("=====================");
  console.log("1. Tambah Resep");
  console.log("2. Cari Resep");
  console.log("3. Hapus Resep");
  console.log("4. Keluar");
  console.log("NOTE ");
  console.log(
    "jika ingin meghentikan penambahan bahan,maka imput _ (underscore) pada bahan"
  );
  console.log("silahkan Pilih Menu [1-4]: ");
  const pilihanMenu = prompt("");
  const pilihan = Number(pilihanMenu);

  if (isNaN(pilihan) || pilihan < 1 || pilihan > 4) {
    console.log("Pilihan menu tidak valid!");
  } else {
    // Memanggil fungsi sesuai dengan pilihan menu
    menu[pilihan]();
  }
}
