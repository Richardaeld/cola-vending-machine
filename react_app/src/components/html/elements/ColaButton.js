import ColaButtonDetails from "./ColaButtonDetails"

// Cola button for vending machine
export default function ColaButton (props) {

    const styles = {
        display: props.display ? "flex" : "none",
        // backgroundColor: "red;"
    }

    // const jsonObj = {
    //     "name": props.name,
    //     "amount":1,
    //     "description":props.description
    // }

    console.log(props.id)


    

    return (

            <div className={(!props.details ? "col-6 col-md-3 position-relative" : "col-12 col-md-12 position-relative")} style={styles} onClick={props.details ? props.noClick : props.click}>
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
                    {/* {props.details &&
                        <ColaButtonDetails 
                            price={props.price}
                            id={props.id}
                            details={props.details}
                            amount={props.amount}
                            name={props.name}
                            jsonObj={jsonObj}
                        />
                    } */}
                </div>
        </div>


    )
}