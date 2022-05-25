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

          console.log(jsonData.cola)
          setColaInfo(jsonData.cola)
      } catch (err) {
          console.log(err)
      }
  }
  useEffect(() => {
      fetchColaData();
  }, [])

  const colaElement = colaInfo.map(cola => {
      <ColaButton
          key={cola.id}
          name={cola.name}
          price={cola.price}
          amount={cola.amount}
          details={cola.details}
      />
  })

  return (

    <>
      <header class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 text-center">
            <h1 class="mt-5 pt-5">ColaCo Vending</h1>
          </div>
        </div>
      </header>

      <main class="container-fluid">
        <div class="row justify-content-between">
          <section class="col-9">
            <h2>Buy a cola</h2>
            <div class="row justify-content-around">

              {/* Cola Template */}
              {colaElement}



            </div>
          </section>
          <section class="col-3">
            <h2>Pay for cola</h2>

          </section>
        </div>
      </main>
    </>


  )

}

export default App;
