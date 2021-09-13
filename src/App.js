import React, { useState } from "react";

import Main from "./components/main";
import Book from "./components/book";
import ThankYou from "./components/thankYou";
import Navbar from "./components/navbar";
import HomePage from "./components/homepage";


export default _ => {
  const [page, setPage] = useState(0);

  return (
    <div>
      <Navbar setPage={setPage} />
 
      {page === 0 ? <HomePage setPage={setPage} /> : null}
      {page === 1 ? <Book setPage={setPage} /> : null}
      {page === 2 ? <ThankYou /> : null}
    </div>
  );
};

// {page === 0 ? <HomePage setPage={setPage} /> : null}

//{page === 0 ? <Main setPage={setPage} /> : null} {page === 0 ? <div dangerouslySetInnerHTML = {HomePage} /> : null}
/*
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
*/
