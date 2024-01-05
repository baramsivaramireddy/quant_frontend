
"use client"
import Link from 'next/link';
import {useState } from 'react'
const Headers = () =>{
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navItems = [
        {href:'/login' ,title:'Login' ,style:'hover:underline'},
        {href:'/signup' ,title:'Signup' ,style:'bg-gradient-to-r from-purple-500 via-red-500 to-yellow-300 hover:underline px-4 py-1 r text-white rounded-full font-semibold '}
    ]
    return (
        <div className=' sticky flex md:flex-row  md:border-b-2 md:border-solid px-3 py-3  shadown flex-col justify-between'>

            <LogoAndTitle isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <Navbar items={navItems} isMobileMenuOpen={isMobileMenuOpen}  />
        </div>
    )
}
export default Headers;


const LogoAndTitle  = (props) =>{


    return (

        <div className='flex flex-row gap-5 items-center'>
            <div> 
            {/* logo */}

            {'\u2693'}
            </div>
            <div className='text-xl font-bold '>

                {/* title */}
                Quant
            </div>
            <div className='md:hidden  text-3xl ml-auto' onClick={() => props.setIsMobileMenuOpen((prev) => !prev)} >
                {'\u2261'}
            </div>
        </div>
    )
}


const Navbar = (props) =>{

    return (
        <div className={`md:flex md:flex-row   transition-all ease-linear duration-500  ${props.isMobileMenuOpen?"":"hidden "}  flex flex-col  justify-center  items-center  gap-5`}>
            {props.items.map((item,index) =>(
                <NavbarItem {...item}  key={index} />
            ))}
        </div>
    )
}

const NavbarItem = ({title , href ,style} ) =>{

    return (<div  className={style}>

        <Link  href={href}> {title}</Link>
    </div>)
}