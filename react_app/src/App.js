import './App.css';
import React, {useEffect} from 'react';
import ColaButton from './components/html/elements/ColaButton';
import {CardElement} from '@stripe/react-stripe-js';
import {CardNumberElement} from '@stripe/react-stripe-js';

function App() {

  // -------------------Cola buttons
  const [colaInfo, setColaInfo] = React.useState([])
  const [colaBack, setColaBack] = React.useState(false)

  // Fetch for cola buttons
  async function fetchColaData () {
      try {
          const response = await fetch ('https://colaco-vending-machine.herokuapp.com/cola/getAll');
          const jsonData = await response.json();

          jsonData.cola.map(x => (
            x['display'] = true,
            x['details'] = false
            )
          )
          setColaInfo(jsonData.cola)
          console.log(jsonData.cola)
        } catch (err) {
          console.log(err)
      }
  }
  useEffect(() => {
      fetchColaData();
  }, [])

  function detailsClick(id) {
    console.log("I am ehre to")
  }

  function clickCola (id) {
    setColaInfo(prevCola => {
      return prevCola.map((cola) => {
        if (cola.id !== id) {
          return {...cola, display:!cola.display}
        } else {
          setColaBack(true)
          return {
            ...cola,
            details: true,
          };
        }
      })
    })
  }

  function noClick () {
    console.log("I do nothing")
  }

  function colaButtonReset() {
    setColaBack(false);
    fetchColaData();
  }

  const colaElement = colaInfo.map(cola => (
      <ColaButton
          key={cola.id}
          name={cola.name}
          price={cola.price}
          amount={cola.amount}
          description={cola.description}
          details={cola.details}
          display={cola.display}
          click={() => clickCola(cola.id)}
          noClick={() => noClick(cola.id)}
      />
  ))

  // -------------------Cola Details



  // console.log("I am cola info", colaInfo)
  return (
    <>
      <header className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-10 text-start">
            <h1 className="mt-5 pt-5 company-name">ColaCo Vending</h1>
          </div>
        </div>
      </header>

      <main className="container-fluid">
        <div className="row justify-content-end">
          <section className="col-12 cola-container">
            {/* <h2>Click to Buy</h2> */}
            {colaBack &&
            <div className="text-shadow width-fit">
                <button className="buy-button" onClick={colaButtonReset}>Go back</button>
            </div>
            }
            <div className="row justify-content-around">


              {/* Colas */}
              {colaElement}

            </div>
          </section>

          <section className="col-3 me-3">
            <h2>Pay for cola</h2>
            {/* stripe */}
            <span>
              <CardElement/>
              {/* <CardNumberElement/> */}
            </span>
          </section>
        </div>
      </main>
    </>


  )

}

export default App;
