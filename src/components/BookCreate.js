// 🍀 context
import { useState } from "react";
// 🥣
import useBooksContext from "../hooks/use-books-context";
// import BooksContext from "../context/books";

// 🍀 ({ onCreate }) 더 이상 이 Prop 물려받지 않을 것!
// -> useContext 임포트해 BooksContext 안에 내재돼 있는 createBook 함수 가져와서 쓸 것!
function BookCreate() {
  const [title, setTitle] = useState("");
  // 🍀
  const { createBook } = useBooksContext();

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // onCreate(title); 🍀
    createBook(title);
    setTitle("");
  };

  return (
    <div className="book-create">
      <h3>Add a Book</h3>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        {/* input 요소를 만들 때마다, 우리는 value와 onChnage 속성값을 지정해줘야 한다! 유저가 인풋에 입력할 때마다, 입력값을 감지하는 handleChange 함수와, 입력값을 등록해야 하기 때문에 업데이트하기 위해 state 시스템을 사용해야 한다. */}
        <input className="input" value={title} onChange={handleChange} />
        <button className="button">Create!</button>
      </form>
    </div>
  );
}

export default BookCreate;
