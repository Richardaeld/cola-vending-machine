import VendingWindowOutput from "./VendingWindowOutput"
import VendingSelectionPanel from "./VendingSelectionPanel"
import VendingMachineLegs from "./VendingMachineLegs"

export default function VendingMachingContainer (props) {

    return (
        <section className="col-11 col-sm-10 col-md-10 col-lg-9 col-xl-6 vending-body p-3">
            <VendingMachineLegs />

            <div className="row justify-content-between position-relative">

                {/* Vending Machine Header, Window, and Cola Output */}
                <VendingWindowOutput
                    colaElement={props.colaElement}
                    colaInfo={props.colaInfo}
                    clickCola={props.clickCola}
                    noClick={props.noClick}
                    setColaDetails={props.setColaDetails()}
                    // colaButtonReset={colaButtonReset()}
                />

                {/* Vending machine payment and selection panel */}
                <VendingSelectionPanel />

            </div>
      </section>

    )
}