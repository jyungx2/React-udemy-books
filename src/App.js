import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  // When are we going to call fetchBooks?
  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");

    setBooks(response.data);
  };

  // Don't do this!
  // fetchBooks();

  // 128. useEffect in action
  // ❓1. Understanding when our arrow function gets called❓
  // => useEffect로 보낸 함수는 컨텐츠와 돔이 최초로 업데이트(initial render) 된 후 무조건 호출되고, 그 다음부터는 2번째 매개변수에 따라 호출여부가 달라진다.
  // 1) [] : called after 1st render / never called again.
  // 2) - : called after 1st render / also called after every rerender.
  // 3) [counter]: called after 1st render / also called after rerenders if 'counter' variable changed

  // ❓2. Understanding the arrow function's return value❓

  // ❓3. Understanding stale variable references❓
  useEffect(() => {
    fetchBooks();
  }, []);

  // 112. Updating the Title
  // ✅ server state(data)!
  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    // 131. Thinking about updates(✅local state!)
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        // title: newTitle -> ...response.data
        // * book: current book object(data)
        // * response.data: updated book object that came back from an API server and might've been changed on other properties(title 이외의 다른 속성들이 바뀌면 그것또한 반영해야 하기 때문) => so we need to include this using spread operator as well.
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  // 109. Deleting Records
  const deleteBookById = async (id) => {
    // 132. Deleteing a record
    await axios.delete(`http://localhost:3001/books/${id}`);

    // filter always returns a new array. don't have to use ... (spread operator)
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  // 106. Adding a Book!
  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title: title,
    });

    // 125. Creating a new record
    // {id: Math.round(Math.randon() * 9999), title} -> response.data (api 서버로부터 받아온 데이터 사용)
    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);

    // 💥BAD CODE!💥
    // books.push({ id: 123, title: title });
    // console.log(books);
    // setBooks(books);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
