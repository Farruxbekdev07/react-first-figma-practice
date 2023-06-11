import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderPage from "./Header";
import '../../css/Ecommerce/App.css';
import vector_1 from '../../media/images/vector_1.png';
import sofa1 from '../../media/images/sofa_1.png';
import sofa2 from '../../media/images/sofa_2.png';
import table from '../../media/images/table.png';
import mirror from '../../media/images/mirror.png';
import sofa3 from '../../media/images/sofa_3.png';
import blog1 from '../../media/images/blog_1.png';
import blog2 from '../../media/images/blog_2.png';
import blog3 from '../../media/images/blog_3.png';
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderPage />
      <section className="main-section">
        <div>
          <h1>Rocket single seater</h1>
          <button className="button-component" onClick={() => navigate('/dashboard')}>Shop Now</button>
        </div>
        <img src={vector_1} alt="vector 1"/>
      </section>
      <section className="second-section">
        <div className="wrapper">
          <div>
            <h2>Side table</h2>
            <button className="button-component">View More</button>
          </div>
        </div>
        <div className="wrapper">
          <div>
            <h2>Side table</h2>
            <button className="button-component">View More</button>
          </div>
        </div>
      </section>
      <section className="third-section">
        <div className="title">
          <h2>Top Picks For You</h2>
          <small>Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.</small>
        </div>
        <div className="wrapper-div">
          <div className="card">
            <img src={sofa1}/>
            <div>
              <small>Trenton modular sofa_3</small>
              <b>Rs. 25,000.00</b>
            </div>
          </div>
          <div className="card">
            <img src={sofa2}/>
            <div>
              <small>Granite dining table with dining chair</small>
              <b>Rs. 25,000.00</b>
            </div>
          </div>
          <div className="card">
            <img src={table}/>
            <div>
              <small>Outdoor bar table and stool</small>
              <b>Rs. 25,000.00</b>
            </div>
          </div>
          <div className="card">
            <img src={mirror}/>
            <div>
              <small>Plain console with teak mirror</small>
              <b>Rs. 25,000.00</b>
            </div>
          </div>
        </div>
        <div className="button-wrapper">
          <button className="button-component">View More</button>
        </div>
      </section>
      <section className="fourth-section">
        <div className="img-wrapper">
          <img src={sofa3} alt="sofa3"/>
        </div>
        <div className="content-wrapper">
          <b>New Arrivals</b>
          <h2>Asgaard sofa</h2>
          <button>Order Now</button>
        </div>
      </section>
      <section className="fives-section">
        <div className="title">
          <h2>Our Blogs</h2>
          <small>Find a bright ideal to suit your taste with our great selection</small>
        </div>
        <div className="card-wrapper">
          <div className="card">
            <div className="img-wrapper">
              <img src={blog1} alt="blog1"/>
            </div>
            <div className="content-wrapper">
              <small>Going all-in with millennial design</small>
              <button className="button-component">Read More</button>
              <p>
                <span><i class="fa-regular fa-clock"></i>5 min </span>
                <span><i class="fa-regular fa-calendar"></i> 12<sup>th</sup> Oct 2022</span>
              </p>
            </div>
          </div>
          <div className="card">
            <div className="img-wrapper">
              <img src={blog2} alt="blog2"/>
            </div>
            <div className="content-wrapper">
              <small>Going all-in with millennial design</small>
              <button className="button-component">Read More</button>
              <p>
                <span><i class="fa-regular fa-clock"></i>5 min </span>
                <span><i class="fa-regular fa-calendar"></i> 12<sup>th</sup> Oct 2022</span>
              </p>
            </div>
          </div>
          <div className="card">
            <div className="img-wrapper">
              <img src={blog3} alt="blog3"/>
            </div>
            <div className="content-wrapper">
              <small>Going all-in with millennial design</small>
              <button className="button-component">Read More</button>
              <p>
                <span><i class="fa-regular fa-clock"></i>5 min </span>
                <span><i class="fa-regular fa-calendar"></i> 12<sup>th</sup> Oct 2022</span>
              </p>
            </div>
          </div>
        </div>
        <div className="button-wrapper">
          <button className="button-component">View All Post</button>
        </div>
      </section>
      <section className="our-instagram">
        <div>
          <h1>Our Instagram</h1>
          <small>Follow our store on Instagram</small>
          <button>Follow Us</button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;