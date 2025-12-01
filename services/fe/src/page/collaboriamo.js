import { useState } from "react";
import emailjs from "emailjs-com";

import bg1 from "../assets/images/home/bg-pages-vitodalessandro.jpg";
import Navbar from "../components/navbar";
import Cta from "../components/cta";
import Contact from "../components/contact";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import FacebookFeed from "../components/FacebookFeed";

export default function Collaboriamo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const { name, email, subject, comments } = formData;

    emailjs
      .send(
        "service_0afnsl8",
        "template_n04x6lh",
        { name, email, subject, comments },
        "r2n5DXQ3z_n-qfS41"
      )
      .then(
        () => {
          alert("Messaggio inviato con successo!");
          setFormData({ name: "", email: "", subject: "", comments: "" });
        },
        () => {
          alert("Si è verificato un errore nell'invio del messaggio.");
        }
      );
  };

  return (
    <>
      <Navbar
        navClass="navbar-nav mx-auto"
        socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon"
      />

      <section
        className="bg-half d-table w-100"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundPosition: "center",
        }}
      >
        <div className="bg-overlay bg-overlay"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="page-next-level">
                <h4 className="title text-white">Collaboriamo</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 SEZIONE PRINCIPALE */}
      <section className="section pt-5 mt-3">
        <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-lg-12 text-center">
                    <p className="text-muted fs-6">
                      Qui chi crede nel potere delle idee e nella forza della collaborazione può dare voce ai propri pensieri. Che tu abbia un’idea, un progetto, una proposta o anche solo un’osservazione, questo è il posto giusto per condividerla. Ogni contributo, grande o piccolo, conta: insieme possiamo costruire una città più attenta, equa e sostenibile.
                    </p>
                </div>
            </div>
          <div className="row align-items-start">
            {/* 🔸 Colonna sinistra: contatti sopra, form sotto */}
            <div className="col-12 col-lg-8">
              <form onSubmit={sendEmail}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <input
                      name="name"
                      id="name"
                      type="text"
                      className="form-control border rounded"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nome :"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <input
                      name="email"
                      id="email"
                      type="email"
                      className="form-control border rounded"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email :"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <input
                      name="subject"
                      id="subject"
                      className="form-control border rounded"
                      onChange={handleChange}
                      value={formData.subject}
                      placeholder="Oggetto :"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <textarea
                      name="comments"
                      id="comments"
                      rows="4"
                      className="form-control border rounded"
                      onChange={handleChange}
                      value={formData.comments}
                      placeholder="Messaggio :"
                    ></textarea>
                  </div>

                  <div className="col-12 text-end">
                    <button
                      type="submit"
                      id="submit"
                      name="send"
                      className="btn btn-primary"
                    >
                      Invia Messaggio
                    </button>
                  </div>
    
                </div>
              </form>
              <div className="my-5">
                    <Contact />
              </div>
            </div>

            {/* 🔸 Colonna destra: feed Facebook */}
            <div className="col-12 col-lg-4">
              <h5 className="mb-3">Ultimi aggiornamenti</h5>
              <div style={{ position: "sticky", top: "120px" }}>
                <FacebookFeed />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <Cta />
      </section>

      <Footer />
      <ScrollTop />
    </>
  );
}
