// Cola button for vending machine
export default function ColaButton (props) {

    const styles = {
        display: props.display ? "flex" : "none",
        // backgroundColor: "red;"
    }

    const jsonObj = {
        "name": props.name,
        "amount":1,
        "description":props.description
    }

    console.log(props.id)


    async function RemoveOneCola () {
        try {
            // const response = await fetch(`https://colaco-vending-machine.herokuapp.com/restrict/user/buyCola/${props.id}`)
            const response = await fetch(`http://localhost:5000/restrict/user/buyCola/${props.id}`)
            const jsonData = await response.json();

            console.log(jsonData)

        } catch (err) {
            console.error(err);
        }
    }

    return (

            <div className={(!props.details ? "col-6 col-md-3 position-relative" : "col-12 col-md-12 position-relative purchase-background")} style={styles} onClick={props.details ? props.noClick : props.click}>
            {/* <div class="col-6 col-md-3 flex-stretch reduce-9" style={styles}> */}
            <div className={(props.details ? "" : "cola-holder")}></div>
                {/* body */}
                {/* <div className="cola-template-container row justify-content-center"> */}
                <div className="row justify-content-center cola-container">
                    {/* Name */}
                    <div class={props.amount > 0 ? "cola-header flex-center" : "cola-out-stock-header out-of-stock-swing flex-center"}>
                        <h3 className={props.amount > 0 ? "cola-name text-center mb-0 cola-header-text" : "cola-name text-center mb-0"}>
                            {props.amount > 0 ? props.name : "Out Of Stock"}
                        </h3>
                    </div>


                    {/* Purchase Button */}
                    {props.details &&
                        <div className="details-background">
                            {/* in-stock */}
                            <div className="text-center flex-around cola-button-text">
                                <span className="d-block">{props.amount > 0 ? "In stock" : "Out of Stock"} </span>
                            </div>

                            {/* Price */}
                            <div className="text-center mt-2 mb-4 flex-around cola-button-text">
                                <span className="d-block">${ props.price.toFixed(2)}</span>
                            </div>

                            {props.details &&
                                        <div className="text-center mt-2 mb-4 flex-around">
                                            <span>{props.description}</span>
                                        </div>
                            }

                            {/* Will be real button */}
                            <div className="buy-button-position w-100">
                                <button className="buy-button mb-4 px-4 py-1 text-shadow">Buy now</button>
                            </div>

                            {/* Proof of concept */}
                            <div className="buy-button-position  w-100">
                                <a className="buy-button mb-4 px-4 py-1 text-shadow"
                                    href={`data:text/json;charset=utf-8, ${encodeURIComponent(
                                        JSON.stringify(jsonObj)
                                        )}`}
                                        download={props.name + '.json'}
                                        >
                                    {`Download ${props.name}`}
                                </a>
                            </div>

                            {/* Proof of concept */}
                            <div className="buy-button-position  w-100">
                                <button className="buy-button mb-4 px-4 py-1 text-shadow" onClick={RemoveOneCola}>Cola Decrement</button>
                            </div>
                        </div>
                    }
                </div>
        </div>


    )
}