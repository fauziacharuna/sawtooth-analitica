class Document {

    constructor(
        id = null,
        legalitas,
        jenisLegalitas,
        nama,
        telepon,
        tahun,
        tahunRenovasi,
        hubungan,
        jenisAset,
        alamatAset,
        luasTanah,
        luasBangunan,
        bentukTanah,
        lebarJalan,
        frontage,
        letakTanah,
        elevasi,
        daerahBanjir,
        RCNterdepresiasi,
        nilaiTanah,
        koordinat,
        gambarAset = null,
        createdAt = null
    ) {

        this.id = id;
        this.legalitas = legalitas;
        this.jenisLegalitas = jenisLegalitas;
        this.nama = nama;
        this.telepon = telepon;
        this.hubungan = hubungan;
        this.tahun = tahun;
        this.tahunRenovasi = tahunRenovasi;
        this.jenisAset = jenisAset;
        this.alamatAset = alamatAset;
        this.luasTanah = luasTanah;
        this.luasBangunan = luasBangunan;
        this.bentukTanah = bentukTanah;
        this.lebarJalan = lebarJalan;
        this.frontage = frontage;
        this.letakTanah = letakTanah;
        this.elevasi = elevasi;
        this.daerahBanjir = daerahBanjir;
        this.RCNterdepresiasi = RCNterdepresiasi;
        this.nilaiTanah = nilaiTanah;
        this.koordinat = koordinat;
        this.gambarAset = gambarAset;
        this.createdAt = createdAt;
    }
}

module.exports = Document;