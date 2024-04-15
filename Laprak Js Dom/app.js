// Seleksi elemen-elemen yang dibutuhkan dari DOM
const form = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

// Event listener untuk menambahkan tugas
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Hindari pengiriman form bawaan
    const taskText = taskInput.value.trim(); // Ambil teks tugas, hilangkan spasi ekstra

    if (taskText !== '') {
        addTask(taskText); // Panggil fungsi untuk menambahkan tugas ke daftar
        taskInput.value = ''; // Kosongkan input setelah menambahkan tugas
    }
});

// Fungsi untuk menambahkan tugas ke daftar
function addTask(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
        <span>${text}</span>
        <button type="button" class="btn btn-danger btn-sm float-right ml-2 delete-btn">Hapus</button>
        <button type="button" class="btn btn-success btn-sm float-right complete-btn">Selesai</button>
    `;
    taskList.appendChild(li);

    // Animasi fade-in saat menambahkan tugas baru
    li.classList.add('fade-in');

    // Tambahkan event listener untuk tombol "Hapus" dan "Selesai"
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.classList.add('remove');
        li.addEventListener('animationend', function() {
            li.remove(); // Hapus elemen li dari DOM setelah animasi fade-out selesai
        });
    });

    li.querySelector('.complete-btn').addEventListener('click', function() {
        li.classList.toggle('completed'); // Tambahkan atau hapus class completed untuk menandai tugas selesai
    });
}

// Event listener untuk filter tugas
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');
        taskList.querySelectorAll('.list-group-item').forEach(task => {
            const isCompleted = task.classList.contains('completed');
            if (filterValue === 'all' || (filterValue === 'completed' && isCompleted) || (filterValue === 'incomplete' && !isCompleted)) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    });
});
