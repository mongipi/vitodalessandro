import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";

const santoDelGiorno = "San Sisto II";
const farmaciaDiTurno = "Farmacia Centrale, Via Roma 45";

export default function BottomBanner() {
  const [visible, setVisible] = useState(true);
  const [showSanto, setShowSanto] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSanto((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Banner visibile */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.5 }}
            className="position-fixed bottom-0 start-0 end-0 bg-light text-dark py-4 px-4 z-50 shadow d-flex flex-column flex-sm-row justify-content-between align-items-center text-center text-sm-start"
            style={{ zIndex: 1080 }}
          >
            <div className="fs-5">
              {showSanto ? (
                <>
                  <strong>Santo del giorno:</strong> {santoDelGiorno}
                </>
              ) : (
                <>
                  <strong>Farmacia di turno:</strong> {farmaciaDiTurno}
                </>
              )}
            </div>
            <button
              onClick={() => setVisible(false)}
              className="btn btn-sm btn-outline-success mt-3 mt-sm-0 ms-sm-4"
              aria-label="Chiudi"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
        {!visible && (
            <button
            className="position-fixed bottom-0 end-0 mb-5 me-3 bg-light border shadow btn-circle d-flex align-items-center justify-content-center"
            onClick={() => setVisible(true)}
            aria-label="Mostra informazioni"
            >
            <i
                className="mdi mdi-information-outline"
                style={{
                fontSize: "1.7rem",
                color: "#25b865",
                }}
            ></i>
            </button>
        )}

    </>
  );
}
