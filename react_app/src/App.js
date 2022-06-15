// import './App.css';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import {CardNumberElement} from '@stripe/react-stripe-js';
import StripeElement from './components/html/elements/StripeElement';
import VendingMachingContainer from './components/html/elements/VendingMachineContainer';
import IndexBackground from './components/html/elements/IndexBackground';
import ColaButton from './components/html/elements/ColaButton';
// import Register from './components/html/structure/Register'
// import Login from './components/html/structure/Login'
// import StripeElement from './components/html/elements/StripeElement';
import {Routes, Route, Outlet} from 'react-router-dom';

import Register from './components/html/structure/Register';
import Login from './components/html/structure/Login';
import Layout from './components/html/structure/Layout';
import RequireAuth from './components/html/elements/RequireAuth';
import Home from './components/html/structure/Home'

function App() {

//   // -------------------Cola buttons
//   const [colaInfo, setColaInfo] = React.useState([])
//   const [colaDetails, setColaDetails] = React.useState(false)


//   const [posts, setPosts] = React.useState([])
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const [colaPerPage, setColaPerPage] = React.useState(3);

//   useEffect(() => {
//     console.log("colaperpageT", colaPerPage)
//     setColaPerPage(2)
//     fetchColaData();

//     console.log("colaperpageB", colaPerPage)
// }, [])


//   function useWindowSize() {
//     const [windowSize, setWindowSize] = useState([0,0]);
//     useLayoutEffect(() => {
//       function updateWindowSize() {
//         setWindowSize([window.innerWidth, window.innerHeight]);
//         console.log(window.innerWidth, colaPerPage)

//         if(window.innerWidth < 770 && colaPerPage == 3) {
//           console.log("trigger")
//           console.log("colaperpageT", colaPerPage)
//           setColaPerPage(2)
//           fetchColaData();
//           console.log("colaperpageB", colaPerPage)
//           // fetchColaData()
//         } else {
//           console.log("no trigger")
//           console.log("colaperpageT", colaPerPage)
//           setColaPerPage(3)
//           fetchColaData();
//           console.log("colaperpageB", colaPerPage)
//           // fetchColaData()



//         }
//       }
//       window.addEventListener('resize', updateWindowSize);
//       updateWindowSize();


//       return () => window.removeEventListener('resize', updateWindowSize);
//     }, []);
//     return windowSize;
//   }

//   useWindowSize()

//   // if (useWindowSize()[0] < 770 && colaPerPage == 3) {
//   //   setColaPerPage(2)
//   // } else {
//   //   setColaPerPage(3)
//   // }





//   // Fetch for cola buttons
//   async function fetchColaData () {
//       try {


//           // await setColaPerPage(2)
//           // await console.log("---colaperpageB", colaPerPage)

//           // const response = await fetch ('https://colaco-vending-machine.herokuapp.com/cola/getAll');
//           const response = await fetch ('http://localhost:5000/cola/getAll');
//           const jsonData = await response.json();

//           jsonData.cola.map(x => (
//             x['display'] = true,
//             x['details'] = false
//             )
//           )
//           setColaInfo(jsonData.cola)
//           const indexOfLastCola = currentPage * colaPerPage;
//           const indexOfFirstCola = indexOfLastCola - colaPerPage;
//           const currentPost = setColaInfo(jsonData.cola.slice(indexOfFirstCola, indexOfLastCola));
//           console.log(jsonData.cola)
//         } catch (err) {
//           console.log(err)
//       }
//   }

//   // useEffect(() => {
//   //     fetchColaData();
//   // }, [])

//   // const indexOfLastCola = currentPage * colaPerPage;
//   // const indexOfFirstCola = indexOfLastCola - colaPerPage;
//   // const currentPost = setColaInfo(colaData.slice(indexOfFirstCola, indexOfLastCola));

//     function clickCola (id) {
//       setColaInfo(prevCola => {
//         return prevCola.map((cola) => {
//           if (cola.id !== id) {
//             return {...cola, display:!cola.display}
//           } else {
//             setColaDetails(true)
//             return {
//               ...cola,
//               details: true,
//             };
//           }
//         })
//       })
//     }

//     function noClick () {
//     console.log("I do nothing")
//     }

//   const colaElement = colaInfo.map(cola => (
//     <ColaButton
//         key={cola.id}
//         id={cola.id}
//         name={cola.name}
//         price={cola.price}
//         amount={cola.amount}
//         description={cola.description}
//         details={cola.details}
//         display={cola.display}
//         click={() => clickCola(cola.id)}
//         noClick={() => noClick(cola.id)}
//     />
//   ))

//   // const [loginData, setLoginData] = React.useState([])
//   const useLocalStorage = (key, initValue) => {
//     const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || initValue);

//     useEffect(() => {
//       localStorage.setItem(key, JSON.stringify(value));
//     }, [key, value])

//     return [value, setValue];
//   }

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home />} />
        

        {/* <Route element={<RequireAuth />}> */}
          {/* protected */}
        {/* </Route> */}
      </Route>
    </Routes>

      {/* <main className="container-fluid main-props position-relative">
        <div className="row justify-content-center m-5 padding-top">
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
              <Login />
              <Register />
            </section>
          }
        </div>
        <footer className="colaco-footer">
          <p>ColaCo All Rights Reserved</p>
        </footer>
      </main> */}
    </>
  )
}

export default App;
