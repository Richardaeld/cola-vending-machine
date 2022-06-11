import './App.css';
import React, {useEffect} from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import {CardNumberElement} from '@stripe/react-stripe-js';
import StripeElement from './components/html/elements/StripeElement';
import VendingMachingContainer from './components/html/elements/VendingMachineContainer';
import ColaButton from './components/html/elements/ColaButton';
import VendingSelectionPanel from './components/html/elements/VendingSelectionPanel';
import VendingSelectionPanelButton from './components/html/elements/VendingSelectionPanelButton';
import VendingWindowOutput from './components/html/elements/VendingWindowOutput';
import IndexBackground from './components/html/elements/IndexBackground';

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

  return (
    <>


      <main className="container-fluid main-props position-relative">
        <div className="row justify-content-center m-5 padding-top">
          <IndexBackground />
          <VendingMachingContainer
            colaInfo={colaInfo}
            setColaInfo={setColaInfo}
            colaDetails={colaDetails}
            setColaDetails={setColaDetails}
            fetchColaData={fetchColaData}
          />

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
