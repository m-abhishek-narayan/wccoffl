import { Link, animateScroll as scroll } from 'react-scroll'

function Footer() {


  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="side1">
            <div className="row">
              <div className="col-md-3">
                <h1 className="logo">WCC</h1>
                <p className="footer-text">
                  Thank you for Visiting 
        
                </p>
              </div>
              <div className="col-md-3">
                <p className="footer-title">Important Link</p>
                <ul>
                  <li>
                  <Link   
                         spy={true}
                         smooth={true}
                         duration={1000}
                         to="headerbg"
                  > Home </Link>
                  </li>
                  <li>
                  <Link to="profile" spy={true} smooth={true} duration={1000} > Profile </Link>
                  </li>
                  <li>
                  <Link to="gallery" spy={true} smooth={true} duration={1000}>Gallery  </Link>
                  </li>
                  <li>
                  <Link to="awards" spy={true} smooth={true} duration={1000}> Awards  </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="side2">
            <div className="row">
              <div className="col-md-3">
                <p className="footer-title">Contact</p>
                <ul>
                  <li>
                    <Link to="#" >abhisheknarayanm2001@gmail.com</Link>
                  </li>
                  <li>
                    <h1 style={{ color:"white" }} > Abhishek</h1>
                  </li>
                  <li>
                    <h1 style={{ color:"white" }}>The Boss</h1>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <p className="footer-title">Social Media</p>
                <ul>
                  <li>
                    <a target="_blank" rel="noreferrer" href="https://github.com/m-abhishek-narayan" > Github</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => scroll.scrollToTop(2500)} src="" className="gotop"><i className="fas fa-level-up-alt"></i></button>

    </footer>
  );
}
export default Footer;
