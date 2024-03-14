import React from "react";
import { useAppsRegistered } from "../context/useAppRegisted";

const Nav = ({ show, handleShowNav }) => {
  const { apps } = useAppsRegistered();

  const handle = {
    openApp(callback) {
      callback();
      handleShowNav(false);
    },
  };
  return (
    <nav
      onClick={() => handleShowNav(false)}
      className={show ? "show" : "hide"}
    >
      <div className="start-menu" onClick={(e) => e.stopPropagation()}>
        {JSON.stringify(apps)}
        <ul>
          {apps.map((app) => (
            <li key={app.id} onClick={() => handle.openApp(app.handleOpen)}>
              {app.name}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
