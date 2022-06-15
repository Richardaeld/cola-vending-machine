import ColaButtonDetails from "./ColaButtonDetails"

// Cola button for vending machine
export default function ColaButton (props) {

    const styles = {
        display: props.display ? "flex" : "none",
    }

    console.log(props.id)


    

    return (

            <div className={(!props.details ? "col-6 col-md-3 position-relative" : "col-12 col-md-12 position-relative")} style={styles} onClick={props.details ? props.noClick : props.click}>
            <div className={(props.details ? "" : "cola-holder")}></div>
                {/* body */}
                <div className="row justify-content-center cola-container">
                    {/* Name */}
                    <div class={props.amount > 0 ? "cola-header flex-center" : "cola-out-stock-header out-of-stock-swing flex-center"}>
                        <h3 className={props.amount > 0 ? "cola-name text-center mb-0 cola-header-text" : "cola-name text-center mb-0"}>
                            {props.amount > 0 ? props.name : "Out Of Stock"}
                        </h3>
                    </div>

                </div>
        </div>
    )
}