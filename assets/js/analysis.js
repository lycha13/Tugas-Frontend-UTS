import {
    getAllLands,
    calculateTotalArea
} from './modules/data_service.js';

document.addEventListener('DOMContentLoaded', () => {

    const lands = getAllLands();

    // Menghitung ringkasan statistik
    const totalLahan = lands.length;
    const totalArea = calculateTotalArea(lands);

    const jenisTanaman = [...new Set(
        lands.map(land => land.crop)
    )];

    const lahanAktif = lands.filter(
        land => land.status === 'Aktif'
    ).length;

    // Menampilkan ringkasan statistik
    document.getElementById('total-lahan').textContent = totalLahan;

    document.getElementById('total-area').textContent =
        `${totalArea.toFixed(2)} Ha`;

    document.getElementById('total-tanaman').textContent =
        jenisTanaman.length;

    document.getElementById('lahan-aktif').textContent =
        lahanAktif;

    // Mengelompokkan data berdasarkan jenis tanaman
    const hasilAnalisis = {};

    lands.forEach(land => {
        if (!hasilAnalisis[land.crop]) {
            hasilAnalisis[land.crop] = {
                jumlah: 0,
                luas: 0
            };
        }

        hasilAnalisis[land.crop].jumlah++;
        hasilAnalisis[land.crop].luas += Number(land.area);
    });

    // Menampilkan tabel analisis
    const tbody = document.getElementById('hasil-analisis');

    tbody.innerHTML = '';

    Object.entries(hasilAnalisis).forEach(([crop, data]) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${crop}</td>
            <td>${data.jumlah}</td>
            <td>${data.luas.toFixed(2)} Ha</td>
        `;

        tbody.appendChild(row);
    });

    // Menampilkan visualisasi sederhana
    const visualisasi = document.getElementById('visualisasi-data');

    visualisasi.innerHTML = '';

    Object.entries(hasilAnalisis).forEach(([crop, data]) => {
        const persentase = totalArea > 0
            ? (data.luas / totalArea) * 100
            : 0;

        const item = document.createElement('div');

        item.innerHTML = `
            <p><strong>${crop}</strong> - ${data.luas.toFixed(2)} Ha</p>
            <div class="analysis-bar">
                <div class="analysis-fill" style="width: ${persentase}%"></div>
            </div>
        `;

        visualisasi.appendChild(item);
    });

    // Menampilkan kesimpulan
    const kesimpulan = document.getElementById('kesimpulan-analisis');

    if (lands.length === 0) {
        kesimpulan.textContent =
            'Belum ada data lahan. Silakan tambahkan data melalui halaman Administrasi.';
    } else {
        kesimpulan.textContent =
            `Terdapat ${totalLahan} lahan dengan total luas ${totalArea.toFixed(2)} Ha, terdiri dari ${jenisTanaman.length} jenis tanaman dan ${lahanAktif} lahan aktif.`;
    }

});
