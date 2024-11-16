import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import BooksContext from "./context/books";
import { Provider } from "./context/books";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

// 134. Context in Action
// 컨텍스트 컴포넌트로 감싸져 있는 child 컴포넌트들만 컨텍스트의 provider로부터 제공되는 value에 접근할 수 있다! (부모는 X)
root.render(
  <Provider>
    <App />
  </Provider>
);
