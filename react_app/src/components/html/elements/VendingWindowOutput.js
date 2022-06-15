import ColaButton from './ColaButton';
import ColaButtonDetails from './ColaButtonDetails';

export default function VendingWindowOutput (props) {

    // find opened cola element
    function findColaDetailsBool() {

        const colaNum = props.colaElement.length

        for (let i=0; i < colaNum; i++) {
            if (props.colaElement[i].props.details === true) {
                const jsonObj = {
                    "name": props.colaElement[i].props.name,
                    "amount":1,
                    "description":props.colaElement[i].props.description
                }
                return {
                    display: true,
                    cola: i,
                    element: props.colaElement[i].props,
                    jsonObj: jsonObj
                }
            }
        }
        return {display: false}
    }

    function colaButtonReset() {
        console.log("SETCOLA DETAILS")
        // props.setColaDetails(false)
        // return findColaDetailsBool(false);
        return;
    }

    return (
        <div className="col-9 ms-4">
            <h1 className="mt-3 company-name">Pop-<span className="flicker">A</span>-Cola</h1>
            <div className="row justify-content-around">
                {/* Vending machine window  */}
                <div className="vending-window">
                {findColaDetailsBool().display
                    ?   <div className="purchase-background">
                            <ColaButtonDetails
                                cola={findColaDetailsBool().element}
                                jsonObj={findColaDetailsBool().jsonObj}
                                colaButtonReset={colaButtonReset}
                            />
                        </div>
                    :   ""
                }

                </div>
                <div className="vending-window-background"></div>
                {/* Cola Outlet */}
                <div className="vending-output flex-center">
                    <p className="text-center">Push</p>
                </div>
                {/* Cola row */}
                {!findColaDetailsBool().display ?
                    <>
                        <div className=" vending-machine-row depth-shadow"></div>
                        {props.colaElement}
                    </>
                    : ""
                }
            </div>
        </div>
    )
}