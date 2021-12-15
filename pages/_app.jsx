//import "bootstrap/dist/css/bootstrap.min.css";
import "../scss/globals.scss";

import { SSRProvider } from "@react-aria/ssr";

import Nav from "../components/Nav";

const App = ({ Component, pageProps }) => {
  return (
    <SSRProvider>
      <div className="global-container">
        <Nav />
        <Component {...pageProps} />
      </div>
    </SSRProvider>
  );
};

export default App;
