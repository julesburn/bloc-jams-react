import React from 'react';

const Landing = () => (
    <section className="landing">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 className="hero-title">Turn the music up!</h1>
          </div>
          <div className="clearfix visible-md-block"></div>
          <section className="selling-points">
            <div className="col-md-6">
              <div className="point">
                <h2 className="point-title">Choose your music</h2>
                <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
              </div>
            </div>
              <div className="col-md-6">
                <div className="point">
                  <h2 className="point-title">Unlimited, streaming, ad-free</h2>
                  <p className="point-description">No arbitrary limits. No distractions.</p>
                </div>
              </div>
              <div className="point">
                <div className="col-md-6">
                  <h2 className="point-title">Mobile enabled</h2>
                  <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
                </div>
              </div>
          </section>
        </div>
      </div>
    </section>
);

export default Landing;
