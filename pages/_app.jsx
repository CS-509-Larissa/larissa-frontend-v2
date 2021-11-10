import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Nav from "../components/Nav";

const App = ({ Component, pageProps }) => {
  return (
    <div className="vbox">
      <Nav />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
