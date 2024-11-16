import { useState } from "react";
import BookEdit from "./BookEdit";
// 🥣
// import BooksContext from "../context/books";
import useBooksContext from "../hooks/use-books-context";

// 🍀
// ❌({ book, onDelete, onEdit })❌
function BookShow({ book }) {
  const [showEdit, setShowEdit] = useState(false);
  const { deleteBookById } = useBooksContext();

  const handleDeleteClick = () => {
    // onDelete(book.id); 🍀
    deleteBookById(book.id);
  };

  // 110. Toggling Form Display
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  // 🧩 close the edit tap after editing! => 아래에 <BookEdit />의 Prop(=onSubmit)으로 보내줌..
  const handleSubmit = () => {
    setShowEdit(false);
    // 📌 114. A better solution! (onEdit를 Prop으로 물려주지 말고, 여기서 그냥 같이 실행!!)
    // onEdit(id, newTitle); 🍀 => 매개변수 (id, newTitle) 삭제
  };

  let content = <h3>{book.title}</h3>;
  // 📌 onEdit = { onEdit } prop 삭제 (only onSubmit)
  // 위에서 이미 onEdit() 실행했기 때문에 더 이상 필요없다.
  if (showEdit) {
    content = <BookEdit book={book} onSubmit={handleSubmit} />;
  }

  return (
    <div className="book-show">
      {/* https://picsum.photos/ 링크로부터 랜덤 이미지 겟 */}
      <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`} />
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
