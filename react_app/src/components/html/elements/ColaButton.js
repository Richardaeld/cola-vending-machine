// Cola button for vending machine
import React, {useEffect} from 'react';

export default function ColaButton (props) {

    const [colaInfo, setColaInfo] = React.useState([])

    async function fetchColaData () {
        try {
            const response = await fetch ('https://colaco-vending-machine.herokuapp.com/cola/getAll');
            const jsonData = await response.json();

            console.log(jsonData.cola)
            setColaInfo(jsonData.cola)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchColaData();
    }, [])


    return (
        <div class="col-3">
        {/* header */}
        <h3>Fizz</h3>
        {/* body */}
        <div>
          <div>
            <span>Price </span>
            <span>$1.00</span>
          </div>
          <div>
            <span>Amount Available </span>
            <span>100</span>
          </div>
          <div>
            <span>Description </span>
            <span>An effervescent fruity experience with hints of grape and coriander.</span>
          </div>
        </div>
        {/* buy button */}
        <button>Buy now</button>
      </div>
    )
}