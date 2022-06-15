import React, {useEffect, useLayoutEffect, useState} from 'react';
import ColaButton from './../elements/ColaButton';
import VendingMachingContainer from './../elements/VendingMachineContainer';
import IndexBackground from './../elements/IndexBackground';



export default function Home (props) {

  // -------------------Cola buttons
  const [colaInfo, setColaInfo] = React.useState([])
  const [colaDetails, setColaDetails] = React.useState(false)


  const [posts, setPosts] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1);
  const [colaPerPage, setColaPerPage] = React.useState(3);

  useEffect(() => {
    console.log("colaperpageT", colaPerPage)
    setColaPerPage(2)
    fetchColaData();

    console.log("colaperpageB", colaPerPage)
}, [])


  // Fetch for cola buttons
  async function fetchColaData () {
      try {


          // await setColaPerPage(2)
          // await console.log("---colaperpageB", colaPerPage)

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

  // const [loginData, setLoginData] = React.useState([])
  const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || initValue);

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
  }

    return (
        <>

            <div className="row justify-content-center m-5 padding-top">
                <h1>
                    <a href="login">login</a>
                </h1>
                <h1>
                    <a href="register">Register</a>
                </h1>
                <h1>
                    <a href="register1">Register1</a>
                </h1>
              <IndexBackground />
              <VendingMachingContainer
                colaElement={colaElement}
                colaInfo={colaInfo}
                setColaInfo={setColaInfo}
                colaDetails={colaDetails}
                setColaDetails={setColaDetails}
                fetchColaData={fetchColaData}
              />

              {colaDetails &&
                <section className=" col-10 col-md-3 me-3">
                  {/* <Login /> */}
                  {/* <Register /> */}
                </section>
              }
            </div>
            <footer className="colaco-footer">
              <p>ColaCo All Rights Reserved</p>
            </footer>
        </>
    )
}