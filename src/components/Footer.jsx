import { footerLinks } from "../constants";

const Footer = () =>{
    return(
        <footer>
            <div className="info">
            <p>More ways to shop: 
               <a href="https://maps.apple.com/?q=Apple+Store" className="underline text-primary"> Find an Apple Store </a> 
                 or other retailer near you. Or call 000800 040 1966.</p>
            <img src="/icons/logo.svg" alt="apple logo"/>
            </div>

            <hr/>
            <div className="links">
                <p>Copyright © 2025 Apple Inc. All rights reserved.</p>
                <ul>
                    {footerLinks.map(({link, label}) =>(
                        <li key={label}>
                            <a href={link}>{label}</a>
                        </li>
                    ))}
                </ul>
            </div>

        </footer>
    )
}
export default Footer;