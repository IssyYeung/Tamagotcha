import Navbar from "../navbar/Navbar";
import style from "./layout.module.scss";
import { Helmet } from "react-helmet";

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <Helmet>
        {/* any meta tags, link tags, external script tags go in here,
   try not to touch the index.html */}
        <title>{pageTitle}</title>
      </Helmet>
      <h1 className={style.pageTitle}>{pageTitle}</h1>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
