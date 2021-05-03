import Navbar from "../navbar/Navbar";
import style from "./Layout.module.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";

const helmetContext = {};

const Layout = ({ pageTitle, children, showNavbar = true }) => {
  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1 className={style.pageTitle}>{pageTitle}</h1>
      {showNavbar && <Navbar />}
      {children}
    </HelmetProvider>
  );
};

export default Layout;
