export default function ColaButtonDetails (props) {

    async function RemoveOneCola () {
        try {
            // const response = await fetch(`https://colaco-vending-machine.herokuapp.com/restrict/user/buyCola/${props.id}`)
            const response = await fetch(`http://localhost:5000/restrict/user/buyCola/${props.cola.id}`)
            const jsonData = await response.json();

            console.log(jsonData)

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="">
            {/* name */}
            <div class={props.cola.amount > 0 ? "cola-header flex-center" : "cola-out-stock-header out-of-stock-swing flex-center"}>
                <h3 className={props.cola.amount > 0 ? "cola-name text-center mb-0 cola-header-text" : "cola-name text-center mb-0"}>
                    {props.cola.amount > 0 ? props.cola.name : "Out Of Stock"}
                </h3>
            </div>

            {/* in-stock */}
            <div className="text-center flex-around cola-button-text">
                <span className="d-block">{props.cola.amount > 0 ? "In stock" : "Out of Stock"} </span>
            </div>

            {/* Price */}
            <div className="text-center mt-2 mb-4 flex-around cola-button-text">
                <span className="d-block">${ props.cola.price.toFixed(2)}</span>
            </div>

            <div className="text-center mt-2 mb-4 flex-around">
                <span>{props.cola.description}</span>
            </div>

            {/* Will be real button */}
            <div className="buy-button-position w-100">
                <button className="buy-button mb-4 px-4 py-1 text-shadow">Buy now</button>
            </div>

            {/* Proof of concept */}
            <div className="buy-button-position  w-100">
                <a className="buy-button mb-4 px-4 py-1 text-shadow"
                    href={`data:text/json;charset=utf-8, ${encodeURIComponent(
                        JSON.stringify(props.jsonObj)
                        )}`}
                        download={props.jsonObj.name + '.json'}
                        >
                    {`Download ${props.jsonObj.name}`}
                </a>
            </div>

            {/* Proof of concept */}
            <div className="buy-button-position  w-100">
                <button className="buy-button mb-4 px-4 py-1 text-shadow" onClick={RemoveOneCola}>Cola Decrement</button>
            </div>
        </div>
    )
}