import "./assets/App.css";
import Nav from "./page/Nav";
import Main from "./page/Main";
import { useState } from "react";
import Footer from "./page/Footer";

function App() {
  const [showNav, setShowNav] = useState(false);

  function handleShowNav(show) {
    if (show) {
      setShowNav(show);
      return;
    }
    setShowNav((prev) => !prev);
  }

  return (
    <div className="os">
      <Nav show={showNav} handleShowNav={handleShowNav} />
      <Main />

      <Footer handleShowNav={handleShowNav} />
    </div>
  );
}

export default App;
