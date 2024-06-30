
//import stadiaLogo from '../assets/stadia_logo.png'
import { ReactNode } from "react";
import Navbar from './Navbar';
import Footer from './Footer';

interface Props {
    children?: ReactNode
    // any props that come into the component
}

export default function Layout({children, ...props}:Props)  {
  return (
    <>
      <Navbar />
        <main {...props} >{children}</main>
      <Footer />
          
    </>
  );
}