import React from 'react';
import Hamburger from "hamburger-react";
import Menu from '../Menu';
import "../Css/Menu.css";

export default function HamburgerComponent({ user, menuOpen, setMenuOpen }) {
    return (
        <div className="hamburger">
            {!menuOpen && <Hamburger
                size={24}
                color="#00ff00"
                toggled={menuOpen}
                toggle={setMenuOpen}
            />}
            {menuOpen &&
                <div className="divMenuHamburger">
                <Menu user={user}>
                    <Hamburger
                        className="hamburgerIcon"
                        size={20}
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