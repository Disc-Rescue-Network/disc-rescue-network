import React from 'react';

interface PopupVerifyProps {
  closePopupVerify: () => void;
  claimDisc: () => void;
}

interface PopupSurrenderProps {
  closePopupSurrender: () => void;
  surrenderDiscConfirm: () => void;
}

export function PopupVerify({ closePopupVerify, claimDisc }: PopupVerifyProps) {
  return (
    <div className="popup" style={{ flexDirection: 'column' }}>
      <div className="popup-content popup-claim-disc" id="popup-verify-content" style={{ margin: 'unset !important' }}>
        <span className="close" id="close" onClick={closePopupVerify}>&times;</span>
        <h2 style={{ fontSize: '3rem', marginTop: '10px', marginBottom: '10px' }}>
          Verify Your <span className="fw-light">INFO</span>
        </h2>
        <div className="verify-info claim-disc">
          <div className="box-content-disc d-flex flex-column">
            <div className="verify-row">
              <label>Pickup Date:</label>
              <span id="verifyPickupDate" className="fw-light"></span>
            </div>
            <div className="verify-row">
              <label id="pickupLocationLabel">Pickup Location:</label>
              <span id="verifyPickupLocation" className="fw-light"></span>
            </div>
            <div className="verify-row">
              <label id="communicationMethodLabel"></label>
              <span id="verifyContactInfoForRelease" className="fw-light"></span>
            </div>
          </div>

          <div className="verify-row" id="discInfoVerify" style={{ color: 'var(--primary-black) !important', width: '65%', maxWidth: '400px' }}>
            {/* disc info will be populated here */}
          </div>
        </div>
        <div id="loading-bar" className="loading-bar"></div>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-2 mb-2" style={{ flexDirection: 'column', width: '90%', maxWidth: '450px', background: 'transparent', justifyContent: 'flex-start', margin: 'auto', paddingBottom: '50px' }}>
        <button className="stepbutton text-white mt-2 mb-3" onClick={claimDisc}>
          Perfect! Give me my disc back!
        </button>
        <button className="rememberbtn fw-light" style={{ width: '80%', maxWidth: '450px' }} onClick={closePopupVerify}>
          Need to adjust some pickup information
        </button>
      </div>
    </div>
  );
}

export function PopupSurrender({ closePopupSurrender, surrenderDiscConfirm }: PopupSurrenderProps) {
  return (
    <div className="popup" style={{ flexDirection: 'column' }}>
      <div className="popup-content" id="popup-surrender-content" style={{ margin: 'unset !important' }}>
        <span className="close" id="close" onClick={closePopupSurrender}>&times;</span>
        <h2>
          You are about to <span className="redText">Surrender</span> Your Disc
        </h2>
        <p>
          Hi There! Surrendering your disc is just like a donation. This disc
          can be sold by the course to raise funds for things like new tee pads,
          new baskets or general maintenance.
        </p>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-2 mb-2" style={{ flexDirection: 'column', width: '90%', maxWidth: '450px', background: 'transparent', justifyContent: 'flex-start', margin: 'auto', paddingBottom: '50px' }}>
        <button className="stepbutton red text-white mt-2 mb-3 no-border" onClick={surrenderDiscConfirm} style={{ fontSize: '1rem' }}>
          Yes, please donate my disc to the course!
        </button>
        <button className="rememberbtn fw-light blue no-border-1" style={{ width: '80%', maxWidth: '450px', fontWeight: '400 !important' }} onClick={closePopupSurrender}>
          Sorry, I want my disc back
        </button>
      </div>
    </div>
  );
}
