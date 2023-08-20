import React from 'react'
import './Footer.css'

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // You can also use 'auto' or 'instant'
      });
  };

  return (
    <div className='footer__container'>
        <div className='footer__to-top' onClick={scrollToTop}>
            <span>Back to top</span>
        </div>
        <div className='footer__content'>
            <div className='content__tech'>
                <span>Built with:</span>
                <div>
                    <span>tech here</span>
                    <span>tech here</span>
                    <span>tech here</span>
                </div>
            </div>
            <div className='content__links'>
                <a href="https://www.linkedin.com/in/cathal-paz-052239263/" rel="noreferrer" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://github.com/cathalpaz" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.amazon.com/" target="_blank" rel="noreferrer"><i className="fa-solid fa-user"></i></a>
            </div>
            <div className='footer__logo'>
                <img src='/images/programazon.png' alt='logo' />
                <span>© by Cathal Paz</span>
            </div>
        </div>
    </div>
  )
}

export default Footer
