import React from "react";
import CommentList from "./CommentList";
import Header from "./Header";

function App() {
  return (
    <div className="md:container md:mx-auto px-4">
      <Header />
      <CommentList />
    </div>
  );
}

export default App;
