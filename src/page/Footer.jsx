import React from "react";
import { useAppsRegistered } from "../context/useAppRegisted";

const Footer = ({ handleShowNav }) => {
  const { apps } = useAppsRegistered();

  const handle = {
    openApp(callback) {
      callback();
    },
  };
  return (
    <footer>
      <button onClick={handleShowNav}>OS</button>
      {apps
        .filter((app) => app.isOpen)
        .map((app) => (
          <button
            key={app.id}
            onClick={() => handle.openApp(app.handleMinimize)}
          >
            {app.name}
          </button>
        ))}
    </footer>
  );
};

export default Footer;
