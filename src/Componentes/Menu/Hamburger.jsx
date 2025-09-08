import React from 'react';
import Hamburger from "hamburger-react";
import Menu from '../Menu';
import "../Css/Menu.css";

export default function HamburgerComponent({ menuOpen, setMenuOpen }) {
    return (
        <div className="hamburger">
            {!menuOpen && <div className="divMenuBarras" >
                <Hamburger
                size={28}
                color="#ffffff"
                toggled={menuOpen}
                toggle={setMenuOpen}
                />
            </div>}
            {menuOpen &&
                <div className="divMenuHamburger">
                <Menu>
                    <Hamburger
                        className="hamburgerIcon"
                        size={28}
                        color="#ffffff"
                        toggled={menuOpen}
                        toggle={setMenuOpen}
                    />
                </Menu>
                </div>
            }
        </div>
    );
}