import React from "react";

function Footer() {
  return (
    <footer
      className="text-center text-white"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="container p-4">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:mb-12">
            {/* Col 1 */}
            <div className="col md:w-6/12 md:text-left text-center">
              <p className="mb-3 text-white text-lg">
                <a className="mb-6 font-semibold" href="#">
                  Acme Company
                </a>
              </p>
              <div>
                <p className="text-light">
                  We help you build amazing landing pages that convert.
                </p>
              </div>
            </div>

            {/* Col 2 */}
            <div className="col md:w-3/12 text-center mb-6 md:mb-0 flex flex-col gap-y-2">
              <p className="text-light font-semibold mb-3">Product</p>
              <a className="block text-white" href="#">
                Sign Up
              </a>
              <a className="block text-white" href="#">
                Pricing
              </a>
              <a className="block text-white" href="#">
                F.A.Q.
              </a>
            </div>
            {/* Col 3 */}
            <div className="col md:w-3/12 text-center mb-6 md:mb-0 flex flex-col gap-y-2">
              <p className="text-light font-semibold mb-3">Company</p>
              <a className="block text-white" href="#">
                Terms
              </a>
              <a className="block text-white" href="#">
                Privacy
              </a>
              <a className="block text-white" href="#">
                Contact Us
              </a>
            </div>
            {/* Col 4 */}
            <div className="col md:w-3/12 text-center md:mb-0 flex flex-col gap-y-2">
              <p className="text-light font-semibold mb-3">Connect With Us</p>
              <a className="block text-white" href="#" title="Facebook">
                <i className="fab fa-facebook-square text-3xl pr-2"></i>
              </a>
              <a className="block text-white" href="#" title="Twitter">
                <i className="fab fa-twitter-square text-3xl pr-2"></i>
              </a>
              <a className="block text-white" href="#" title="Instagram">
                <i className="fab fa-instagram text-3xl pr-2"></i>
              </a>
            </div>
          </div>
        </section>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
