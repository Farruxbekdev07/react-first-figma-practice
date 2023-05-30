import React from "react";
import '../../css/Ecommerce/App.css'
function Footer() {
    return (
        <>
            <footer>
                <div>
                    <p>
                        <span>400 University Drive Suite 200 Coral</span><br />
                        <span>Gables,</span><br />
                        <span>FL 33134 USA</span>
                    </p>
                </div>
                <div className="ul-wrapper">
                    <ul>
                        <li>Links</li>
                        <li>Home</li>
                        <li>Shop</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                    <ul>
                        <li>Help</li>
                        <li>Payment Options</li>
                        <li>Returns</li>
                        <li>Privacy Policies</li>
                    </ul>
                    <ul>
                        <li>NewsLetter</li>
                        <div>
                            <input placeholder="Enter Your Email Address"/>
                            <button>SUBSCRIBE</button>
                        </div>
                    </ul>
                </div>
            </footer>
            <div className="footer-title">
                <p>2022 Meubel House. All rights reverved</p>
            </div>
        </>
    );
};
export default Footer;