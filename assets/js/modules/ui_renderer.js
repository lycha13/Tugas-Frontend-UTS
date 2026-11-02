
export const renderLandTable = (lands, onEdit, onDelete) => {
    const tbody = document.getElementById('tabel-administrasi');

    if (!tbody) return;

    tbody.innerHTML = '';

    lands.forEach((land, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${land.name}</td>
            <td>${land.location}</td>
            <td>${land.area}</td>
            <td>${land.crop}</td>
            <td>${land.date}</td>
            <td>${land.status}</td>
            <td>
                <button type="button" class="btn-edit" data-id="${land.id}">
                    Edit
                </button>
                <button type="button" class="btn-delete" data-id="${land.id}">
                    Hapus
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    tbody.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => {
            onEdit(Number(button.dataset.id));
        });
    });

    tbody.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => {
            onDelete(Number(button.dataset.id));
        });
    });
};

export const showFeedback = (message, type) => {
    let feedback = document.getElementById('form-feedback');

    if (!feedback) {
        feedback = document.createElement('p');
        feedback.id = 'form-feedback';

        const form = document.getElementById('form-administrasi');
        if (form) {
            form.appendChild(feedback);
        }
    }

    feedback.textContent = message;
    feedback.className = `feedback-msg ${type}`;
};
