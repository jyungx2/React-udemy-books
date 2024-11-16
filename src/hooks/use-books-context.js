import { useContext } from "react";
import BooksContext from "../context/books";

// 🥣 A Small Taste of reusable hooks
function useBooksContext() {
  return useContext(BooksContext);
}

export default useBooksContext;
