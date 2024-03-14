import { useContext, createContext, useState } from "react";

const appsRegisteredContext = createContext();

export function ProvideAppsRegistered({ children }) {
  const appsRegistered = useProvideAppsRegistered();
  return (
    <appsRegisteredContext.Provider value={appsRegistered}>
      {children}
    </appsRegisteredContext.Provider>
  );
}

export const useAppsRegistered = () => {
  return useContext(appsRegisteredContext);
};

export function useProvideAppsRegistered() {
  const [apps, setApps] = useState([]);

  function registerApp(newApp) {
    if (apps.filter((app) => app.id === newApp.id).length == 0) {
      setApps((prev) => [...prev, newApp]);
    }
  }

  function updateAppOpenStatus(appId, openStatus) {
    setApps((prev) => {
      const updateApps = prev.map((app) => {
        if (app.id == appId) {
          return { ...app, isOpen: openStatus };
        }
        return app;
      });

      return updateApps;
    });
  }

  return { apps, registerApp, updateAppOpenStatus };
}
