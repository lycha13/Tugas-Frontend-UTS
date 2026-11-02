export const validateLandForm = (name, location, area, crop, date, status) => {
    const errors = [];

    if (!name || name.length < 4) {
        errors.push("Nama lahan minimal 4 karakter.");
    }

    if (!location) {
        errors.push("Lokasi lahan wajib diisi.");
    }

    if (isNaN(area) || area <= 0) {
        errors.push("Luas lahan harus lebih dari 0.");
    }

    if (!crop) {
        errors.push("Jenis tanaman wajib dipilih.");
    }

    if (!date) {
        errors.push("Tanggal penanaman wajib diisi.");
    }

    if (!status) {
        errors.push("Status lahan wajib dipilih.");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};