import './App.css';
import React, {useEffect} from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import {CardNumberElement} from '@stripe/react-stripe-js';
import StripeElement from './components/html/elements/StripeElement';
import ColaButton from './components/html/elements/ColaButton';
// import StripeElement from './components/html/elements/StripeElement';

function App() {

  // -------------------Cola buttons
  const [colaInfo, setColaInfo] = React.useState([])
  const [colaDetails, setColaDetails] = React.useState(false)


  const [posts, setPosts] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);
  const [colaPerPage, setColaPerPage] = React.useState(3);

  // Fetch for cola buttons
  async function fetchColaData () {
      try {
          // const response = await fetch ('https://colaco-vending-machine.herokuapp.com/cola/getAll');
          const response = await fetch ('http://localhost:5000/cola/getAll');
          const jsonData = await response.json();

          jsonData.cola.map(x => (
            x['display'] = true,
            x['details'] = false
            )
          )
          setColaInfo(jsonData.cola)
          const indexOfLastCola = currentPage * colaPerPage;
          const indexOfFirstCola = indexOfLastCola - colaPerPage;
          const currentPost = setColaInfo(jsonData.cola.slice(indexOfFirstCola, indexOfLastCola));
          console.log(jsonData.cola)
        } catch (err) {
          console.log(err)
      }
  }
  useEffect(() => {
      fetchColaData();
  }, [])

  // const indexOfLastCola = currentPage * colaPerPage;
  // const indexOfFirstCola = indexOfLastCola - colaPerPage;
  // const currentPost = setColaInfo(colaData.slice(indexOfFirstCola, indexOfLastCola));

  function detailsClick(id) {
    console.log("I am ehre to")
  }

  function clickCola (id) {
    setColaInfo(prevCola => {
      return prevCola.map((cola) => {
        if (cola.id !== id) {
          return {...cola, display:!cola.display}
        } else {
          setColaDetails(true)
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
    setColaDetails(false);
    fetchColaData();
  }

  const colaElement = colaInfo.map(cola => (
      <ColaButton
          key={cola.id}
          id={cola.id}
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


      <main className="container-fluid main-props position-relative">
        <div className="row justify-content-center m-5 padding-top">
          <div className="background-wall-stripe"></div>
          <div className="background-floor-trim"></div>
          <div className="background-floor"></div>
          {/* Vending Body */}
          <section className="col-md-12 col-lg-6 vending-body p-3">
            {/* Body */}
            <div class="vending-body-solid-backgound"></div>
            <div class="left-foot"></div>
            <div class="right-foot"></div>
            {/* Logo */}
            {/* <header className="container-fluid"> */}
              {/* <div className="row"> */}
                {/* <div className="col-6"> */}
                  {/* <h1 className="mt-3 company-name">ColaCo Vending</h1> */}
                {/* </div> */}
              {/* </div> */}
            {/* </header> */}


            {colaDetails &&
            <div className="text-shadow width-fit">
                <button className="buy-button" onClick={colaButtonReset}>Go back</button>
            </div>
            }

            <div className="row justify-content-between position-relative">
              <div className="col-9 ms-4">
                  <h1 className="mt-3 company-name">Pop-<span className="flicker">A</span>-Cola</h1>
                  <div className="row justify-content-around">
                    <div className="vending-window"></div>
                    <div className="vending-window-background"></div>
                    <div className="vending-output">
                      <p className="text-center">Push</p>
                    </div>
                    <div className=" vending-machine-row depth-shadow"></div>

            


                      {/* Colas */}
                      {colaElement}



                  </div>
              </div>

            <div className="col-2 cola-body-payment-panel">
              <div className="card-input depth-shadow"></div>
              <div className="coin-input depth-shadow"></div>
              <div className="coin-return depth-shadow"></div>
              <div className="display-screen depth-shadow"></div>
              <div className="card-reader depth-shadow">
                <p>Card</p>
              </div>
              <div className="coin-output depth-shadow"></div>

              <div className="selection-input">
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
                <div className="selection-button depth-shadow"></div>
              </div>
            </div>

            </div>
          </section>

          {colaDetails &&
            <section className=" col-10 col-md-3 me-3">
              <h2>Pay for cola</h2>

              {/* stripe */}
              <StripeElement />

            </section>
          }
        </div>
      </main>
      {/* <footer>
        <p>ColaCo All Rights Reserved</p>
      </footer> */}
    </>


  )

}

export default App;
