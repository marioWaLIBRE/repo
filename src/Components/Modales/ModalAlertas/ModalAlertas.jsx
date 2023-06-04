import React from 'react'

import "./modalalertas.css"

const ModalAlertas = ({children, open, close}) => {
    return (
        <section className={`modalAlert_section_dad ${open && "modalAlert_section_dad_active"}`}>
            <div className="modalAlert_section">
                <h3 className="modalAlert_h3">
                    CryptoProgram says:
                </h3>
                <div className="modalAlert_children">
                    {children}
                </div>
                <button className="modalAlert_button" onClick={close}>
                    OK
                </button>
            </div>
        </section>
    )
}

export default ModalAlertas