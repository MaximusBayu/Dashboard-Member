import { Inter } from "next/font/google";
import "../globals.css";
import SideNavbar from '../Home/SideNavbar';
import MyAppBar from '../Home/Appbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
      <MyAppBar />
        <div className="flex ">
          <SideNavbar />
          <div className="flex-grow pl-72">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
