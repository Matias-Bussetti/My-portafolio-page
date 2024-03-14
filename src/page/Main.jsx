import ApplicationWindow from "../components/ApplicationWindow";
import Studies from "../components/windows/Studies";
import { ProvideAppsRegistered } from "../context/useAppRegisted";

const Main = () => {
  return (
    <main>
      <ApplicationWindow
        id={1}
        name={"Educación"}
        startPostion={{ x: 50, y: 50 }}
        startSize={{ w: 300, h: 450 }}
      >
        <Studies />
      </ApplicationWindow>
      <ApplicationWindow
        id={2}
        name={"Educación 2"}
        startPostion={{ x: 50, y: 50 }}
        startSize={{ w: 300, h: 450 }}
      >
        <Studies />
      </ApplicationWindow>
      <ApplicationWindow
        id={3}
        name={"Educación 3"}
        startPostion={{ x: 50, y: 50 }}
        startSize={{ w: 300, h: 450 }}
      >
        <Studies />
      </ApplicationWindow>
    </main>
  );
};

export default Main;
