import { useEffect, useState } from "react";
import bg1 from "../assets/images/home/bg-pages-vitodalessandro.jpg";
import Navbar from "../components/navbar";
import Cta from "../components/cta";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import FacebookFeed from "../components/FacebookFeed";
import { getSantoDelGiorno } from "../api/santo";
import { getFarmaciaTurno } from "../api/farmacie";
import Contact from "../components/contact";

export default function InfoUtili() {
  const [santoDelGiorno, setSantoDelGiorno] = useState("");
  const [farmaciaDiTurno, setFarmaciaDiTurno] = useState("");

  useEffect(() => {
    async function fetchSanto() {
      try {
        const data = await getSantoDelGiorno();
        const santo = data.data.find((s) => s.attributes.onomastico === true);
        setSantoDelGiorno(santo?.attributes?.nome || "—");
      } catch (err) {
        console.error("Errore caricamento santo del giorno:", err);
        setSantoDelGiorno("Non disponibile");
      }
    }

    async function fetchFarmacia() {
      try {
        const data = await getFarmaciaTurno();
        const farmacia = data.data[0]?.farmacia?.nome || "";
        const indirizzo = data.data[0]?.farmacia?.indirizzo || "";
        setFarmaciaDiTurno(`${farmacia} - ${indirizzo}`);
      } catch (err) {
        console.error("Errore caricamento farmacia di turno:", err);
        setFarmaciaDiTurno("Non disponibile");
      }
    }

    fetchSanto();
    fetchFarmacia();
  }, []);

  return (
    <>
      <Navbar
        navClass="navbar-nav mx-auto"
        socialClass="list-unstyled mb-0 mt-2 mt-sm-0 social-icon light-social-icon"
      />

      {/* HEADER */}
      <section
        className="bg-half d-table w-100"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-overlay"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="page-next-level">
                <h4 className="title text-white">Informazioni utili - Bitonto</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE PRINCIPALE */}
      <section className="section pt-5 mt-3">
        <div className="container">
          <div className="row align-items-start">
            {/* COLONNA SINISTRA */}
            <div className="col-12 col-lg-8">
              <div className="mb-5">
                <h5 className="mb-3">📦 Raccolta Rifiuti</h5>
                <p>
                  Servizio gestito da <strong>S.A.N.B. S.p.A.</strong><br />
                  <strong>Sito:</strong>{" "}
                  <a href="https://sanbspa.it/" target="_blank" rel="noreferrer">
                    www.sanbspa.it
                  </a><br />
                  <strong>Numero verde:</strong> 800 71 40 28
                </p>

                <hr className="my-4" />

                <h5 className="mb-3">🚔 Polizia Locale</h5>
                <p>
                  <strong>Indirizzo:</strong> Via Dossetti, Bitonto (BA)<br />
                  <strong>Telefono:</strong> 800 381 500<br />
                  <strong>Email:</strong>{" "}
                  <a href="mailto:protocollo.comunebitonto@pec.rupar.puglia.it">
                    protocollo.comunebitonto@pec.rupar.puglia.it
                  </a><br />
                  
                </p>

                <hr className="my-4" />

                <h5 className="mb-3">💡 Pubblica Illuminazione</h5>
                 <strong>Email:</strong>{" "}
                  <a href="mailto:segnalazioni.bitonto@citygreenlight.com">
                    segnalazioni.bitonto@citygreenlight.com
                  </a><br />
                <p>
                  Per segnalazioni guasti: <strong>800 642 120</strong><br />
                  Servizio attivo 24/7 - Gestore: <strong>CityGreenLight</strong>
                </p>

                <hr className="my-4" />

                <h5 className="mb-3">🚌 Trasporto Pubblico</h5>
                <p>
                  Gestito da <strong>Asv Miccolis</strong><br />
                  <strong>Sito:</strong>{" "}
                  <a href="https://www.busmiccolis.it/" target="_blank" rel="noreferrer">
                    www.busmiccolis.it
                  </a><br />
                  <strong>Email:</strong>{" "}
                    <a href="mailto:info@busmiccolis.it">
                      info@busmiccolis.it
                    </a><br />
                </p>

                <hr className="my-4" />

                <h5 className="mb-3">🏛️ Comune di Bitonto</h5>
                <p>
                  <strong>Sito ufficiale:</strong>{" "}
                  <a href="https://www.comune.bitonto.ba.it" target="_blank" rel="noreferrer">
                    www.comune.bitonto.ba.it
                  </a><br />
                  <strong>Indirizzo:</strong> Corso Vittorio Emanuele, Bitonto (BA)<br />
                  <strong>Telefono:</strong> 080 371 6102<br />
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@comune.bitonto.ba.it">
                    info@comune.bitonto.ba.it
                  </a><br />
                </p>

                <hr className="my-4" />

                {/* 🔹 SEZIONI DINAMICHE */}
                <h5 className="mb-3">📅 Santo del giorno</h5>
                <p>{santoDelGiorno || "Caricamento in corso..."}</p>

                <hr className="my-4" />

                <h5 className="mb-3">💊 Farmacia di turno</h5>
                <p>{farmaciaDiTurno || "Caricamento in corso..."}</p>
              </div>
            </div>

            {/* COLONNA DESTRA */}
            <div className="col-12 col-lg-4">
              <h5 className="mb-3">📢 Ultimi aggiornamenti</h5>
              <div style={{ position: "sticky", top: "120px" }}>
                <FacebookFeed />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA E FOOTER */}
      <section className="section">
        <Cta />
      </section>
    <div class="container mb-60">
        <Contact/>
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
}
