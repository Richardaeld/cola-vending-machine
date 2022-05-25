// Cola button for vending machine
export default function ColaButton (props) {

    

    return (
        <div class="col-3">
            {/* Header */}
            <h3>{props.name}</h3>
            {/* body */}
            <div>
                <div>
                    <span>Price: </span>
                    <span>${ props.price.toFixed(2)}</span>
                </div>
                <div>
                    <span>Amount Available: </span>
                    <span>{props.amount}</span>
                </div>
                <div>
                    <span>Description: </span>
                    <span>{props.details}</span>
                </div>
            </div>
            {/* Purchase Button */}
            <button>Buy now</button>
      </div>
    )
}