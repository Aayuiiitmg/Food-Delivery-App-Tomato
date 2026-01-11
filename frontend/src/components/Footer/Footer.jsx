import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left"><img src={assets.logo} alt="" />
      <p>From farm-fresh ingredients to chef-crafted dishes, we bring flavor, convenience, and care together. Discover meals made with passion, delivered with speed, and enjoyed with confidence. Your everyday cravings, elevated—because great food deserves thoughtful preparation, honest sourcing, and a seamless experience from kitchen to doorstep.</p>
        <div className="footer-social-icons"><img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon}  alt="" /></div>
        </div>
         <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
         </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <p>Any questions?<br></br> Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on <br></br>(+1) 96 716 6879</p>
        </div>
      </div>
      <hr />
       <p className='footer-copyright'>© 2024 All rights reserved. Tomato</p>
    </div>
  )
}

export default Footer
