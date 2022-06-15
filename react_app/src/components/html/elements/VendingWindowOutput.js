import ColaButton from './ColaButton';
import ColaButtonDetails from './ColaButtonDetails';

export default function VendingWindowOutput (props) {

    // const colaElement = props.colaInfo.map(cola => (
    //     <ColaButton
    //         key={cola.id}
    //         id={cola.id}
    //         name={cola.name}
    //         price={cola.price}
    //         amount={cola.amount}
    //         description={cola.description}
    //         details={cola.details}
    //         display={cola.display}
    //         click={() => props.clickCola(cola.id)}
    //         noClick={() => props.noClick(cola.id)}
    //     />
    // ))


    // console.log("Im cola element", props.colaElement[0].props.details)

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

    // console.log("Im a find", findColaDetailsBool().display)
    // console.log("Im a find", findColaDetailsBool().cola)
    // console.log("Im a find", findColaDetailsBool().element)

    // console.log("Im a find", findColaDetailsBool())

    // console.log("Im a find", findColaDetailsBool().element.price)

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
                                // price={findColaDetailsBool().element.price}
                                // id={findColaDetailsBool().element.id}
                                // description={findColaDetailsBool().element.description}
                                // details={findColaDetailsBool().element.details}
                                // amount={findColaDetailsBool().element.amount}
                                // name={findColaDetailsBool().element.name}
                                jsonObj={findColaDetailsBool().jsonObj}
                            />
                        </div> 
                    :   ""
                }

                </div>
                {/* {props.colaElement.details ? : <h1>alksjf;lasjd;fsakjdf;lkasjd</h1>} */}
                <div className="vending-window-background"></div>
                {/* Cola Outlet */}
                <div className="vending-output flex-center">
                    <p className="text-center">Push</p>
                </div>
                {/* Cola row */}
                <div className=" vending-machine-row depth-shadow"></div>
                {props.colaElement}
            </div>
        </div>
    )
}