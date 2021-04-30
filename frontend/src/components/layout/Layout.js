const Layout = ({ pageTitle, children }) => {
  console.log(pageTitle);
  return (
    <div>
      <h1>{pageTitle}</h1>
      {/* <Navbar /> */}
      {children}
    </div>
  );
};

export default Layout;
