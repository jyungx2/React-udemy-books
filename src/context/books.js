// 🍀 context provider (now need axios here)
import axios from "axios";
import { createContext, useState } from "react";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    // get method will bring all the datas that we've ever made.
    setBooks(response.data);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    // 131. Thinking about updates(✅local state!)
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        // title: newTitle -> ...response.data
        // * book: current book object(data)
        // 💥response.data: updated book object that came back from an API server and might've been changed on other properties(title 이외의 다른 속성들이 바뀌면 그것또한 반영해야 하기 때문) => so we need to include this using spread operator as well.💥
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  // 109. Deleting Records - "DELETE" method
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
      title,
    });
    console.log(response); // {title: 'something', id: 1}

    // 125. Creating a new record - "POST" method
    // {id: Math.round(Math.randon() * 9999), title} -> response.data : 더 이상 직접 코드로 random id를 만들어서 부여하지 않고, JSON 서버에 의해 자동으로 만들어진 id를 사용할 것..)
    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);

    // 💥BAD CODE!💥
    // books.push({ id: 123, title: title });
    // console.log(books);
    // setBooks(books);
  };

  // 133. Introducing context (easy example)
  // const [count, setCount] = useState(5);

  // const valueToShare = {
  //   count,
  //   incrementCount: () => {
  //     setCount(count + 1);
  //   },
  // };

  const valueToShare = {
    books,
    deleteBookById,
    editBookById,
    fetchBooks,
    createBook,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;

// import BooksContext, { Provider } from './/./'
