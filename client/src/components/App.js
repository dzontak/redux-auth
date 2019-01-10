import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import "components/App.css";

/* children is a prop that is passed in from index.js with all the nexted tags
   of App tag defined there.
   For example
   <App>
     <Route path="/" exact component={Welcome} />
   </App>
*/
export default ({ children }) => {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
