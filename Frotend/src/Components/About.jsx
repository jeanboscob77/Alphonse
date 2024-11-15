import React,{useEffect} from 'react';
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';


const AboutUs = () => {


  useEffect(() => {
    AOS.init({
      duration: 1200,  // Duration of the animation (in milliseconds)
      offset: 100,     // Offset from the top when animation should trigger
      once: false,
      mirror: true      // Whether animation should happen only once
    });
  }, []);



  return (
    <section className="about-us py-5 bg-light margin-top">
      <Helmet>
        <title>about Info Tech Scholars Ltd</title>
        </Helmet>
      <div className="container pt-5">
        <h1 className="text-center mb-4">About Us</h1>

        <section className="who-we-are mb-5" data-aos='fade-up'>
          <h2 className="text-primary">Who We Are</h2>
          <p>
          NFO TECH SCHOLARS LTD is company dedicated to supporting students and individuals 
          across different educational levels by providing up-to-date information on scholarships,
           financial aid, study loans, and job opportunities in Rwanda and abroad. Our expertise lies 
           in guiding clients through their application processes and offering a 
           range of technology-driven services that empower the Rwandan community in
            their journey toward achieving personal and professional goals.

          </p>
        </section>

        <section className="mission mb-5" data-aos='fade-left'>
          <h2 className="text-primary">Our Mission</h2>
          <p>
          To empower Rwandans by delivering accessible and reliable services that connect
           them to educational and career opportunities, ultimately contributing to individual 
           success and community growth.

          </p>
        </section>

        <section className="what-we-do mb-5" data-aos='zoom-in'>
          <h2 className="text-primary">What We Do</h2>
          <ul className="list-group">
            <li className="list-group-item"><strong>University Applications & Matching:</strong> Helping students apply to universities and matching them to the best institutions based on their academic performance.</li>
            <li className="list-group-item"><strong>Job & Visa Applications:</strong> Guiding individuals through the process of applying for jobs and visas.</li>
            <li className="list-group-item"><strong>Irembo Services:</strong> Assisting with accessing essential government services through the Irembo platform.</li>
            <li className="list-group-item"><strong>Document Design & Formulation:</strong> Providing expertly designed CVs, certificates, logos, and flyers.</li>
            <li className="list-group-item"><strong>Academic Career Guidance:</strong> Offering personalized advice to students on their academic and career choices.</li>
            <li className="list-group-item"><strong>Application Platforms & Assistance:</strong> Supporting individuals in navigating and using various application platforms.</li>
            <li className="list-group-item"><strong>Technological Services:</strong> A host of other services aimed at enhancing technological solutions for personal and business use.</li>
          </ul>
        </section>

        <section className="vision mb-5" data-aos='slide-up'>
          <h2 className="text-primary">Our Vision</h2>
          <p>
          To be a trusted leader in bridging opportunities and technology, helping Rwandans realize their potential through innovative support and personalized guidance.

          </p>
        </section>

        <section className="why-choose-us mb-5" data-aos='flip-left'>
          <h2 className="text-primary">Why Choose Us?</h2>
          <p>
          Choose INFO TECH SCHOLARS LTD for dedicated, expert assistance in navigating educational and career pathways. We provide timely updates, expert application support, and We offer an extensive selection of tech services crafted to simplify your journey toward success.
          </p>
        </section>

        <section className="get-in-touch text-center" data-aos='slide-right'>
          <h2 className="text-primary">Get in Touch</h2>
          <p>
            For more information or to explore how we can help you, please reach out to us. We're here to assist you every step of the way.
          </p>
        </section>
      </div>
    </section>
  );
}

export default AboutUs;
