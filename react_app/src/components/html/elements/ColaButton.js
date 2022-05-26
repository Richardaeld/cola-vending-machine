// Cola button for vending machine
export default function ColaButton (props) {



    const styles = {
        display: props.display ? "flex" : "none",
    }

    // console.log(" btosadhf", props.details)

    return (
        <>

            <div class="col-6 col-md-3 flex-stretch reduce-9" style={styles} onClick={props.details ? props.noClick : props.click}>
                {/* body */}
                <div className="cola-template-container row justify-content-center">
                    {/* Header */}
                    <div class="cola-header flex-center">
                        <h3 className="cola-name text-center py-3 px-3 mb-0 cola-header-text">{props.name}</h3>
                    </div>
                    <div className="text-center flex-around">
                        <span className="d-block">{props.amount > 0 ? "In stock" : "Out of Stock"} </span>
                    </div>
                    <div className="text-center mt-2 mb-4 flex-around">
                        <span className="d-block">${ props.price.toFixed(2)}</span>
                    </div>

                    {props.details &&
                                <div className="text-center mt-2 mb-4 flex-around">
                                    <span>{props.description}</span>
                                </div>
                    }

                    {/* Purchase Button */}
                    {props.details &&
                        <div className="buy-button-position  w-100">
                            <button className="buy-button mb-4 px-4 py-1 text-shadow">Buy now</button>
                        </div>
                    }
                </div>
        </div>
      </>

    )
}