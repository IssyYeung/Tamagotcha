import Navbar from "../navbar/Navbar";

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <h1>{pageTitle}</h1>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
