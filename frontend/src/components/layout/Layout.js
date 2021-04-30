import Navbar from "../navbar/Navbar";
import style from "./layout.module.scss";

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <h1 className={style.pageTitle}>{pageTitle}</h1>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
