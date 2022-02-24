import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { connect } from "./redux/blockchain/blockchainActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  var history = useHistory();

  const rd = async () => {
    console.log("clicked");
    if (!blockchain.loading) {
      console.log("inside");
      let t = await blockchain.contract.methods.Identify().call();

      switch (t) {
        case "0":
          history.push("/register");
          break;
        case "1":
          history.push("/student");
          break;
        case "2":
          history.push("/institute");
          break;
        default:
          history.push("/");
          break;
      }
    }
  };

  useEffect(() => {
    console.log("called");
    dispatch(connect());
  }, [dispatch]);

  return (
    <Layout>
      <div className="d-md-none d-block" style={{ paddingTop: "200px" }}></div>
      <div className="container">
        <div
          style={{ minHeight: "60vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div>
            <div className="d-md-flex align-items-center justify-content-center">
              <img src="/logo192.png" alt="" srcSet="" />
              <div className="ms-3 pb-3 d-md-flex flex-md-column align-items-start justify-content-center">
                <h1 style={{ fontSize: "5rem" }} className="fw-bold text-dark">
                  passport-ed
                </h1>
                <h6 className="w-75">Admission process made hassle free.</h6>
                <button
                  className="btn btn-lg btn-primary fw-bold my-3"
                  onClick={() => rd()}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <h5 className="py-5 text-end my-5">
          Powered by the <span className="fw-bold">Celo Network</span>
        </h5>

        <div className="d-md-flex align-items-center vh-100 justify-content-center my-5 container">
          <div className="col-md-5 mx-md-5">
            <img
              src="https://media0.giphy.com/media/H2yMYCqdjVncIUuKPM/giphy.gif?cid=ecf05e47s7swwfwem06b07dm7xnr8g8h6ym6p1gxhevppre0&rid=giphy.gif&ct=s"
              className="img-fluid"
              alt=""
              srcSet=""
            />
          </div>
          <div className="col-md-7 mt-5 mt-md-0">
            <h1 className="fw-bold w-75">
              Addmission process made hassle free.
            </h1>
            <p>
              "passport-ed" aims to be the passport for your educational details
              and document management system. "passport-ed" aims to provide a
              platform for students to upload their ID proofs and marksheets to
              apply for addmision to various universities.
            </p>
          </div>
        </div>

        <div className="d-md-flex align-items-center justify-content-center my-5 container">
          <div className="col-md-7 mt-5 mt-md-0">
            <h1 className="fw-bold w-75">Decentralized DMS</h1>
            <p>
              Only the institutes authorised by the student can access their
              data and documents. The platform is completely decentralised and
              built on Celo network.
            </p>
          </div>
          <div className="col-md-5 mx-md-5">
            <img src="passport-ed.svg" className="img-fluid" alt="" srcSet="" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
