import React from 'react';
import Hamburger from "hamburger-react";
// import {useState} from "react";
import Menu from '../Menu';
import "../Css/Menu.css";

export default function HamburgerComponent({ menuOpen, setMenuOpen }) {
    return (
        <div className="hamburger">
            <Hamburger
                size={24}
                color="#00ff00"
                toggled={menuOpen}
                toggle={setMenuOpen}
            />
            {menuOpen && <Menu />}
        </div>
    );
}


// export default function HamburgerComponent() {
//     const [open, setOpen] = useState(false);
//     return (
//         <div className="hamburger">
//             <Hamburger
//             size={24}
//             color="#000"
//             toggled={open}
//             toggle={setOpen}
//             />
//             {open && <Menu/>}
//         </div>
//     );
// }