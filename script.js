const bookStorage = {
    getBooks: () => {
        const books = localStorage.getItem('books');
        return books ? JSON.parse(books) : [];
    },
    saveBook: (book) => {
        const books = bookStorage.getBooks();
        if (book.id) {
            const index = books.findIndex(b => b.id === book.id);
            books[index] = book;
        } else {
            book.id = Date.now();
            books.push(book);
        }
        localStorage.setItem('books', JSON.stringify(books));
        return book;
    },
    deleteBook: (id) => {
        let books = bookStorage.getBooks();
        books = books.filter(book => book.id !== id);
        localStorage.setItem('books', JSON.stringify(books));
    }
};


const bookForm = document.getElementById('bookForm');
const booksContainer = document.getElementById('booksContainer');

function renderBooks() {
    const books = bookStorage.getBooks();
    booksContainer.innerHTML = books.map(book => `
                <div class="book-item">
                    <div>
                        <h3>${book.title}</h3>
                        <p>
                            • Autor: ${book.author}<br>  
                            • Ano: ${book.year}</p>
                        <p>${book.status}</p>
                    </div>
                    <div class="book-actions">
                        <button onclick="editBook(${book.id})">Editar</button>
                        <button class="delete" onclick="deleteBook(${book.id})">Excluir</button>
                    </div>
                </div>
            `).join('');
}

function editBook(id) {
    const books = bookStorage.getBooks();
    const book = books.find(b => b.id === id);
    document.getElementById('bookId').value = book.id;
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;
    document.getElementById('isbn').value = book.isbn;
    document.getElementById('status').value = book.status;
}

function deleteBook(id) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
        bookStorage.deleteBook(id);
        renderBooks();
    }
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const book = {
        id: parseInt(document.getElementById('bookId').value) || null,
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: document.getElementById('year').value,
        status: document.getElementById('status').value
    };

    bookStorage.saveBook(book);
    bookForm.reset();
    document.getElementById('bookId').value = '';
    renderBooks();
});

renderBooks();