import { CustomNavbar } from "../../components/Navbar/CustomNavbar";
import { Root } from "./Root";
import "./Main.scss";

const App = () => {
  return (
    <div className="main">
      <CustomNavbar />
      <Root />
    </div>
  );
};

export default App;
