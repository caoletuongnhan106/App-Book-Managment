import { useBookContext } from './context/BookContext';
import { BookProvider } from './context/BookContext';

function AppContent() {
  const { books } = useBookContext();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Library Management System</h1>
      <div className="row">
        {books.length === 0 ? (
          <p className="text-center">No books available.</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">Author: {book.author}</p>
                  <p className="card-text">Year: {book.year}</p>
                  <p className="card-text">Quantity: {book.quantity}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BookProvider>
      <AppContent />
    </BookProvider>
  );
}

export default App;