import ColaButton from './ColaButton';

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

    return (
        <div className="col-9 ms-4">
            <h1 className="mt-3 company-name">Pop-<span className="flicker">A</span>-Cola</h1>
            <div className="row justify-content-around">
                {/* Vending machine window  */}
                <div className="vending-window"></div>
                <div className="vending-window-background"></div>
                {/* Cola Outlet */}
                <div className="vending-output">
                    <p className="text-center">Push</p>
                </div>
                {/* Cola row */}
                <div className=" vending-machine-row depth-shadow"></div>
                {props.colaElement}
            </div>
        </div>
    )
}