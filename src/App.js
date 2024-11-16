// 🍀 context (-> don't need useState anymore...)
import { useEffect, useContext } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
// 🍀 context
// import axios from "axios";
import BooksContext from "./context/books";

// Section 7 - Things we need to do
// 1. Create the API and understand how it works
// 2. When app starts up, make a request to API to get the current list of books
// 3. When use creates/edits/deletes a book, update the API, then update local data

function App() {
  const { fetchBooks } = useContext(BooksContext);
  // 🍀 context
  /*
  const [books, setBooks] = useState([]);

  // 126. When are we going to call fetchBooks? - "GET" method
  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    // get method will bring all the datas that we've ever made.
    setBooks(response.data);
  };
  */

  // 💥 Don't do this!
  // Every time we render App component, we're gonna make a request and update our state that causes the app comp to re-render .. we end up getting into an infinite loop over and over again..

  // 🖍️🖍️ setBooks()는 React state를 업데이트하기 때문에, 해당 state를 사용하는 컴포넌트(App 컴포넌트)를 다시 렌더링하기 때문에 무한루프를 도는 것..🖍️🖍️
  // fetchBooks();
  // 👉 React에서 제공하는 Hook 중 하나인 useEffect를 사용해야 한다 -> 컴포넌트의 특정 상태 변화나 처음 렌더링 시에만 동작하도록 설정 (ep.128)

  // 128. useEffect in action
  // ❓1. Understanding when our arrow function gets called❓
  // => useEffect에 보낸 함수는 컨텐츠와 돔이 최초로 업데이트(initial render) 된 후 무조건 호출되고, 그 다음부터는 2번째 매개변수에 따라 호출여부가 달라진다.

  // ✨ useEffect의 두 번째 인자로 전달된 배열(의존성 배열)은 React가 어떤 값의 변화에 따라 효과를 실행할지를 결정합니다.
  // > 빈 배열 []: 의존성이 없으므로, 컴포넌트가 처음 렌더링될 때만 실행됩니다.
  // > 의존성이 있을 경우: 배열에 포함된 값이 변경될 때마다 실행됩니다.

  // 1) [] : called after 1st render / never called again.
  // 2) - : called after 1st render / also called after every rerender.
  // 3) [counter]: called after 1st render / also called after rerenders if 'counter' variable changed

  // ❓2. Understanding the arrow function's return value❓

  // ❓3. Understanding stale variable references❓
  useEffect(() => {
    fetchBooks();
  }, []); // 빈 배열([])은 "처음 렌더링 시"에만 실행되도록 만듭니다.

  // 🍀 context
  /*
  // 112. Updating the Title - "PUT" method
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
  */

  return (
    <div className="app">
      <h1>Reading List</h1>
      {/* 모든 Prop 지워라!! -> context로부터 받을 것! */}
      <BookList />
      <BookCreate />
    </div>
  );
}

export default App;
