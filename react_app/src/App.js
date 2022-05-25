import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react';
import ColaButton from './components/html/elements/ColaButton';


function App() {

  const [colaInfo, setColaInfo] = React.useState([])

  // Fetch for cola buttons
  async function fetchColaData () {
      try {
          const response = await fetch ('https://colaco-vending-machine.herokuapp.com/cola/getAll');
          const jsonData = await response.json();

          setColaInfo(jsonData.cola)
      } catch (err) {
          console.log(err)
      }
  }
  useEffect(() => {
      fetchColaData();
  }, [])

  const colaElement = colaInfo.map(cola => (
      <ColaButton
          key={cola.id}
          name={cola.name}
          price={cola.price}
          amount={cola.amount}
          details={cola.description}
      />
  ))

  // console.log("I am cola info", colaInfo)
  return (
    <>
      <header className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h1 className="mt-5 pt-5">ColaCo Vending</h1>
          </div>
        </div>
      </header>

      <main className="container-fluid">
        <div className="row justify-content-between">
          <section className="col-9">
            <h2>Buy a cola</h2>
            <div className="row justify-content-around">

              {/* Colas */}
              {colaElement}

            </div>
          </section>

          <section className="col-3">
            <h2>Pay for cola</h2>
          </section>
        </div>
      </main>
    </>


  )

}

export default App;
