import { useState } from "react";
// import BooksContext from "../context/books";
// 🥣
import useBooksContext from "../hooks/use-books-context";

function BookEdit({ book, onSubmit }) {
  const [title, setTitle] = useState(book.title);
  // 🍀
  const { editBookById } = useBooksContext();

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  // 📌 114. A better solution!
  // - Props: onEdit | onSubmit
  // => both are functions that's called when a user "submits the form" => No difference at all! they're called at the exact same time!
  const handleSubmit = (event) => {
    event.preventDefault();
    // title state = new updated title

    // 📌 onEdit prop 대신, 물려받은 onSubmit을 추가
    // * onSubmit prop: onEdit() + setShowEdit(false)함수를 포함
    // onEdit(book.id, title);
    onSubmit(book.id, title);
    // -> Only single prop, event handler!(=onSubmit = {handleSubmit} := setShowEdit(false), onEdit(id, newTitle))
    // 🍀 onSubmit이라는 Prop은 여전히 받아야한다!! -> edit창을 닫을지 말지 여부를 판단하는 함수.. -> setShowEdit(false);
    editBookById(book.id, title);
  };
  // form 요소의 Submission이 실행되면, 유저가 책 제목을 편집했을 때 실행되는 동작을 담은 onEdit, save 버튼 눌렀을 때, 편집창이 없어지는 동작을 담은 onSubmit 함수 두 개로 나눌 필요 없이, 어차피 두 함수 모두 폼 요소가 제출되면 일어나는 동작이니까, 두개를 하나의 함수 안에서 불러오는 로직을 짜자. =>  BookShow 컴포넌트에 handleSubmit()함수 부분에 showedit 상태를 관리하는 함수 setShowEdit(false)와, app으로부터 물려받은 onEdit()함수를 실행시키고, 이걸 현재 BookEdit 컴포넌트에서 onSubmit이라는 prop 이름으로 물려받아 form 요소가 submit됐을 때(=onSubmit) 실행될 수 있도록 불러온다.
  // 💥onSubmit(3번 출현), handleSubmit(2번 출현)
  // - onSubmit
  // 1. Form태그에 있는 onSubmit은 진짜 의미를 담는 onSubmit..
  // 2. BookShow 컴포넌트에 onSubmit은 단지 Prop name..
  // 3. BookEdit 컴포넌트의 handleSubmit함수 안의 onSubmit = BookShow 컴포넌트의 handeSubmit 함수를 뜻함..

  // - handleSubmit
  // BookShow comp:
  // BookEdit comp:
  return (
    <form className="book-edit" onSubmit={handleSubmit}>
      <label>Title</label>
      <input className="input" value={title} onChange={handleChange} />
      <button className="button is-primary">Save</button>
    </form>
  );
}

export default BookEdit;
