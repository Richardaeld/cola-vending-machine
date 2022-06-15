import VendingWindowOutput from "./VendingWindowOutput"
import VendingSelectionPanel from "./VendingSelectionPanel"
import VendingMachineLegs from "./VendingMachineLegs"

export default function VendingMachingContainer (props) {

    // function clickCola (id) {
    //     props.setColaInfo(prevCola => {
    //       return prevCola.map((cola) => {
    //         if (cola.id !== id) {
    //           return {...cola, display:!cola.display}
    //         } else {
    //           props.setColaDetails(true)
    //           return {
    //             ...cola,
    //             details: true,
    //           };
    //         }
    //       })
    //     })
    //   }

    function colaButtonReset() {
    props.setColaDetails(false);
    props.fetchColaData();
    }

    // function noClick () {
    // console.log("I do nothing")
    // }

    return (
        <section className="col-11 col-sm-10 col-md-10 col-lg-9 col-xl-6 vending-body p-3">
            <VendingMachineLegs />

            {props.colaDetails &&
            <div className="text-shadow width-fit">
                <button className="buy-button" onClick={colaButtonReset}>Go back</button>
            </div>
            }

            <div className="row justify-content-between position-relative">

                {/* Vending Machine Header, Window, and Cola Output */}
                <VendingWindowOutput
                    colaElement={props.colaElement}
                    colaInfo={props.colaInfo}
                    clickCola={props.clickCola}
                    noClick={props.noClick}
                />

                {/* Vending machine payment and selection panel */}
                <VendingSelectionPanel />

            </div>
      </section>

    )
}