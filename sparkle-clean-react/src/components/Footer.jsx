export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SparkleClean</h3>
            <p>Making your space shine with our professional cleaning services.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="#services">Residential Cleaning</a>
              </li>
              <li>
                <a href="#services">Commercial Cleaning</a>
              </li>
              <li>
                <a href="#services">Deep Cleaning</a>
              </li>
              <li>
                <a href="#contact">Move In/Out Cleaning</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SparkleClean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
