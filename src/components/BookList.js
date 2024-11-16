import BookShow from "./BookShow";
// import { useContext } from "react";
// import BooksContext from "../context/books";
// 🥣
import useBooksContext from "../hooks/use-books-context";

// // 🥣 A Small Taste of reusable hooks => "hooks" folder
// function useBooksContext() {
//   return useContext(BooksContext);
// }

// 🍀
// ❌no longer going to receive these props!❌ ({ books, onDelete, onEdit })
function BookList() {
  // 🍀 context
  // const { count, incrementCount } = useContext(BooksContext);

  // 🍀🥣
  const { books } = useBooksContext();

  const renderedBooks = books.map((book) => {
    return (
      // 🍀 onEdit, onDelete prop 지워랏
      // <BookShow onEdit={onEdit} onDelete={onDelete} key={book.id} book={book} />
      // 💥 we still make use of props even if we're using context. (just leave 'key' and 'book' prop here!)
      <BookShow key={book.id} book={book} />
    );
  });

  return (
    <div className="book-list">
      {/* {count}
      <button onClick={incrementCount}></button> */}
      {renderedBooks}
    </div>
  );
}

export default BookList;
