import "./assets/App.css";
import Nav from "./page/Nav";
import Main from "./page/Main";
import { useState } from "react";
import Footer from "./page/Footer";
import { ProvideAppsRegistered } from "./context/useAppRegisted";

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
    <ProvideAppsRegistered>
      <div className="os">
        <Nav show={showNav} handleShowNav={handleShowNav} />
        <Main />

        <Footer handleShowNav={handleShowNav} />
      </div>
    </ProvideAppsRegistered>
  );
}

export default App;
