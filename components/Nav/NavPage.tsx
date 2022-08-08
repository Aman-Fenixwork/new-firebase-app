import React, { useState } from 'react'
import Styles from "../../styles/Nav/nav.module.css"

const Nav = () => {

    const [active, setActive] = useState("Home");

    return (
        <div className={Styles.navBar}>
            <div className={Styles.nav}>
                <div className={Styles.navLeft}>
                    <div className={Styles.navLogo}>
                        .LOGO
                    </div>
                </div>
                <div className={Styles.navRight}>
                    <div className={Styles.navOptions}>
                        <ul>
                            <li className={active == "Home" ? Styles.active : Styles.deActive} onClick={() => setActive("Home")}>Home</li>
                            <li className={active == "About" ? Styles.active : Styles.deActive} onClick={() => setActive("About")}>About</li>
                            <li className={active == "Help" ? Styles.active : Styles.deActive} onClick={() => setActive("Help")}>Help</li>
                            <li className={active == "Contact" ? Styles.active : Styles.deActive} onClick={() => setActive("Contact")}>Contact</li>
                            <li className={active == "Service" ? Styles.active : Styles.deActive} onClick={() => setActive("Service")}>Service</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav