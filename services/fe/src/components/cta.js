import React from "react";
import { Link } from "react-router-dom";
import bg from '../assets/images/hiremevito.png'

import { FiChevronDown } from '../assets/icons/vander'

export default function Cta({ containerClass }) {
    return (
        <div className={containerClass}>
            <div
                className="rounded-pill py-5"
                style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center' }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div
                            className="col-12 text-center wow animate__animated animate__fadeInUp"
                            data-wow-delay=".1s"
                        >
                            <h4 className="text-light title-dark">
                               Segnalazioni, suggerimenti o proposte?
                            </h4>
                            <p className="text-white-50 mx-auto mt-4 para-desc">
                               Hai una proposta di miglioramento, un suggerimento o hai notato qualcosa da segnalare?
                                Il tuo contributo è prezioso — contattami, sarò felice di ascoltarti.
                            </p>
                            <div className="mt-4">
                                <Link to="/collaboriamo" className="btn btn-primary mouse-down">
                                    Contattami <FiChevronDown className="fea icon-sm" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}