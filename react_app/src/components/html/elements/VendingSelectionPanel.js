import VendingSelectionPanelButton from './VendingSelectionPanelButton';
import React from 'react';
export default function VendingSelectionPanel (props) {

    // Creates the selection pad keys
    let rangeNum = []
    for(let key=0; key<36; key++) {
        rangeNum.push({key})
    }

    const  selectionButtonElement = rangeNum.map(x => (
        <VendingSelectionPanelButton
            key={x.key}
        />
    ))

    return (
        <>
            {/* Vending machine payment and selection panel */}
            <div className="col-2 cola-body-payment-panel flex-center">
              <div className="card-input depth-shadow"></div>
              <div className="coin-input depth-shadow"></div>
              <div className="coin-return depth-shadow"></div>
              <div className="display-screen depth-shadow"></div>
              <div className="card-reader flex-center depth-shadow">
                <p>Card</p>
              </div>
              <div className="coin-output depth-shadow"></div>

              <div className="selection-input">
                {selectionButtonElement}
              </div>
        </div>
        </>
    )

}
