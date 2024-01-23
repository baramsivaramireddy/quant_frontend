"use client";
import Link from "next/link";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
const Headers = () => {

  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname()
 
 
  useEffect(() => {
   if (isMobileMenuOpen== true){
    setIsMobileMenuOpen(false)
   }

  }, [pathname])
  const navItems = [
    { href: "/questions", title: "Questions", style: "hover:underline" },
  ];
  return (
    <div className=" sticky flex md:flex-row  md:border-b-2 md:border-solid px-3 py-3  shadown flex-col justify-between">
      <LogoAndTitle
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <SecondaryNavbar items={navItems} isMobileMenuOpen={isMobileMenuOpen} />
      <UserNavBar isMobileMenuOpen={isMobileMenuOpen}/>
    </div>
  );
};
export default Headers;

const LogoAndTitle = (props) => {
  return (
    <div className="flex flex-row gap-5 items-center">
      <div>
        {/* logo */}

        {"\u2693"}
      </div>
      <div className="text-xl font-bold ">
        {/* title */}
        Quant
      </div>
      <div
        className="md:hidden  text-3xl ml-auto"
        onClick={() => props.setIsMobileMenuOpen((prev) => !prev)}
      >
        {"\u2261"}
      </div>
    </div>
  );
};

const SecondaryNavbar = (props) => {
  return (
    <div
      className={`md:flex md:flex-row   transition-all ease-linear duration-500  ${
        props.isMobileMenuOpen ? "" : "hidden "
      }  flex flex-col  justify-center  items-center  gap-5`}
    >
      {props.items.map((item, index) => (
        <NavbarItem {...item} key={index} />
      ))}
    </div>
  );
};

const UserNavBar = (props) => {
  const { userToken, logout } = useAuth();
  if (userToken != null) {

    // user is present
    return (
      <>
        <div
          className={`md:flex md:flex-row   transition-all ease-linear duration-500  ${
            props.isMobileMenuOpen ? "" : "hidden "
          }  flex flex-col  justify-center  items-center  gap-5`}
        >
          <button className="rounded-full w-7 h-7 bg-gray-200 "></button>
          <div>
            {/* logout button */}
            <button onClick={logout}> logout </button>
          </div>
        </div>
      </>
    );
  }
  return (<>
 <div
          className={`md:flex md:flex-row   transition-all ease-linear duration-500  ${
            props.isMobileMenuOpen ? "" : "hidden "
          }  flex flex-col  justify-center  items-center  gap-5`}
        >
         <NavbarItem href="/login" title= "Login" style="hover:underline" />
        </div>

   

  </>)
};

const NavbarItem = ({ title, href, style }) => {
  return (
    <div className={style}>
      <Link href={href}> {title}</Link>
    </div>
  );
};
