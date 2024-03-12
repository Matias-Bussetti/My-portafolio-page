import ApplicationWindow from "../components/ApplicationWindow";
import Studies from "../components/windows/Studies";

const Main = () => {
  return (
    <>
      <main>
        <ApplicationWindow
          name={"Educación"}
          startPostion={{ x: 50, y: 50 }}
          startSize={{ w: 300, h: 450 }}
        >
          <Studies />
        </ApplicationWindow>
        <ApplicationWindow name={"test"} startPostion={{ x: 50, y: 30 }} />
        <ApplicationWindow name={"test"} startPostion={{ x: 50, y: 60 }} />
        <ApplicationWindow name={"test"} startPostion={{ x: 50, y: 40 }} />
        <ApplicationWindow name={"test"} startPostion={{ x: 50, y: 50 }} />
      </main>
    </>
  );
};

export default Main;
