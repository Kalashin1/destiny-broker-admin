import { ReactNode, FC } from "react";
import Appbar from "./appbar";
// import Footer from "./footer";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <Appbar />
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
