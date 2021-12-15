import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";
import Tree from "../components/Tree";

import Image from "next/image";

import SvgImage from "/public/undraw_software_engineer_lvl5.svg";

const Home = () => {
  return (
    <>
      <Tree />
      <div className="svg-container">
        <img
          src="/undraw_software_engineer_lvl5.svg"
          style={{ maxWidth: "500px", marginRight: "100px", flex: "1" }}
        />
      </div>
    </>
  );
};

export default Home;
