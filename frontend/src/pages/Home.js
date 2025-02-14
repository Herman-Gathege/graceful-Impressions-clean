import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="container mt-5 mb-5">
        <div className="row align-items-center">
          {/* Left: Image */}
          <div className="col-md-6">
            <img
              src="Group 1.png"
              alt="Hero"
              className="img-fluid rounded mb-4"
            />
          </div>
          {/* Right: Content */}
          <div className="col-md-6">
            <h1>Where Art Meets Enthusiasm.</h1>
            <p>
              Let your Art find its way to new heights by posting in this global
              gallery.
            </p>
            <Link to="/signup">
              <button className="btn  btn-lg mt-3">Join our Gallery</button>
            </Link>
            <span className="mx-2"></span>
            <Link to="/gallery">
              <button className="btn custom-btn btn-lg mt-3">
                View our Gallery
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-5 mb-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="text-start">How Do We Help?</h2>
            <p className="text-start">
              Finding a platform to upload all your hard work is not easy. With
              Graceful Impressions, we focus on helping you get the right
              attention to your art.
            </p>
            <Link to="/signup">
              <button className="btn  btn-lg mt-3">Join our Gallery</button>
            </Link>
          </div>

          <div className="col-md-6">
            <div className="container mt-4">
              <div className="row text-center">
                {/* First Row */}
                <div className="col-md-6 mb-4">
                  <div
                    className="box p-4"
                    style={{ backgroundColor: "#14151A", borderRadius: "8px" }}
                  >
                    <img
                      src="connection 2.png"
                      alt="Networking"
                      className="img-fluid rounded mb-3"
                    />
                    <h4>Networking</h4>
                    <p>Get awesome leads personalized to your craft.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div
                    className="box p-4"
                    style={{ backgroundColor: "#14151A", borderRadius: "8px" }}
                  >
                    <img
                      src="email-marketing 2.png"
                      alt="Marketing"
                      className="img-fluid rounded mb-3"
                    />
                    <h4>Marketing</h4>
                    <p>We help you find the right clients to work with. </p>
                  </div>
                </div>

                {/* Second Row */}
                <div className="col-md-6 mb-4">
                  <div
                    className="box p-4"
                    style={{ backgroundColor: "#14151A", borderRadius: "8px" }}
                  >
                    <img
                      src="gallery 2.png"
                      alt="Gallery"
                      className="img-fluid rounded mb-3"
                    />
                    <h4>Gallery</h4>
                    <p>We offer a platform where you upload your art safely.</p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div
                    className="box p-4"
                    style={{ backgroundColor: "#14151A", borderRadius: "8px" }}
                  >
                    <img
                      src="safety 2.png"
                      alt="Rights"
                      className="img-fluid rounded mb-3"
                    />
                    <h4>Rights</h4>
                    <p>We help you keep your art safe from plagiarism.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mt-5 mb-5">
        <div className="row align-items-center">
          {/* Left: Image */}
          <div className="col-md-6">
            <img
              src="happy.png"
              alt="About"
              className="img-fluid rounded mb-4"
            />
          </div>
          {/* Right: Content */}
          <div className="col-md-6">
            <h1>We bring simplicity to our clients.</h1>
            <p>
              Focus on your art, let us focus on getting you the right audience
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="live-stats bg-dark mb-5">
        <div className="container">
          <h2 className="text-center mb-4">Live Stats</h2>
          <div className="row text-center d-flex justify-content-center align-items-center flex-nowrap">
            <div className="col-md-4">
              <img
                src="live gallery.png"
                alt="Users"
                className="img-fluid rounded mb-3"
              />
              <h3>100+</h3>
              <p>Live Galleries</p>
            </div>
            <div className="col-md-4">
              <img
                src="active-clients.png"
                alt="Users"
                className="img-fluid rounded mb-3"
              />
              <h3>50+</h3>
              <p>Active Clients</p>
            </div>
            <div className="col-md-4">
              <img
                src="succesful-sales.png"
                alt="Users"
                className="img-fluid rounded mb-3"
              />
              <h3>40+</h3>
              <p>Successful Sales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="container mt-5 mb-5">
        <div className="row align-items-center">
          {/* Left: Content */}
          <div className="col-md-6">
            <h1>Ready to get started?</h1>
            <p>Create your account and let the fun begin. </p>
            <Link to="/signup">
              <button className="btn btn-lg mt-3 mt-md-5 mb-3">
                Join our Gallery
              </button>
            </Link>
            <span className="mx-2"></span>
            <Link to="/gallery">
              <button className="btn custom-btn btn-lg mt-3 mt-md-5 mb-3">
                View our Gallery
              </button>
            </Link>
          </div>

          {/* Right: Image */}
          <div className="col-md-6">
            <img
              src="final-sec.png"
              alt="CTA"
              className="img-fluid rounded mb-4"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
