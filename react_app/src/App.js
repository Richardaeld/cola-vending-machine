import logo from './logo.svg';
import './App.css';

function App() {


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
