
import {
    getAllLands,
    addNewLand,
    updateLand,
    removeLandById
} from './modules/data_service.js';

import { validateLandForm } from './modules/form_validator.js';

import {
    renderLandTable,
    showFeedback
} from './modules/ui_renderer.js';


document.addEventListener('DOMContentLoaded', () => {

    // Mengambil elemen formulir
    const form = document.getElementById('form-administrasi');

    const nameInput = document.getElementById('nama-lahan');
    const locationInput = document.getElementById('lokasi-lahan');
    const areaInput = document.getElementById('luas-lahan');
    const cropInput = document.getElementById('jenis-tanaman');
    const dateInput = document.getElementById('tanggal-tanam');
    const statusInput = document.getElementById('status-lahan');

    // Memeriksa apakah formulir tersedia
    if (!form) {
        console.error('Form administrasi tidak ditemukan!');
        return;
    }

    let editingId = null;


    // Menampilkan data ke tabel
    const refreshUI = () => {
        const lands = getAllLands();

        renderLandTable(
            lands,
            handleEdit,
            handleDelete
        );
    };


    // Fungsi mengedit data
    const handleEdit = (id) => {

        const land = getAllLands().find(item => item.id === id);

        if (!land) return;

        nameInput.value = land.name;
        locationInput.value = land.location;
        areaInput.value = land.area;
        cropInput.value = land.crop;
        dateInput.value = land.date;
        statusInput.value = land.status;

        editingId = id;

        form.querySelector('button[type="submit"]').textContent =
            'Perbarui Data';

        showFeedback(
            'Silakan ubah data lahan.',
            'success'
        );
    };


    // Fungsi menghapus data
    const handleDelete = (id) => {

        const konfirmasi = confirm(
            'Apakah kamu yakin ingin menghapus data ini?'
        );

        if (!konfirmasi) return;

        removeLandById(id);

        refreshUI();

        showFeedback(
            'Data lahan berhasil dihapus.',
            'success'
        );

        if (editingId === id) {
            editingId = null;
            form.reset();
        }
    };


    // Proses menyimpan dan memperbarui data
    form.addEventListener('submit', (event) => {

        event.preventDefault();

        const landData = {
            name: nameInput.value.trim(),
            location: locationInput.value.trim(),
            area: parseFloat(areaInput.value),
            crop: cropInput.value,
            date: dateInput.value,
            status: statusInput.value
        };


        // Validasi data formulir
        const validation = validateLandForm(
            landData.name,
            landData.location,
            landData.area,
            landData.crop,
            landData.date,
            landData.status
        );

        if (!validation.isValid) {

            showFeedback(
                validation.errors.join(' '),
                'error'
            );

            return;
        }


        // Menyimpan atau memperbarui data
        if (editingId !== null) {

            updateLand(editingId, landData);

            showFeedback(
                'Data lahan berhasil diperbarui.',
                'success'
            );

        } else {

            addNewLand(landData);

            showFeedback(
                'Data lahan berhasil disimpan.',
                'success'
            );
        }


        // Mengosongkan formulir
        form.reset();

        editingId = null;

        form.querySelector('button[type="submit"]').textContent =
            'Simpan Data';


        // Memperbarui tampilan tabel
        refreshUI();

    });


    // Mengatur tombol reset
    form.addEventListener('reset', () => {

        editingId = null;

        form.querySelector('button[type="submit"]').textContent =
            'Simpan Data';

    });


    // Menampilkan data saat halaman pertama kali dibuka
    refreshUI();

});
