import { motion, AnimatePresence } from "framer-motion";

import { Link, useLocation } from "react-router-dom";

export default function Layout(props) {
  const location = useLocation();

  function Header() {
    return (
      <motion.div
        initial={{ opacity: 0.9, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            marginTop: "-30px",
            paddingTop: "60px",
            paddingBottom: "30px",
          }}
          className={`fixed-top shadow px-md-4 px-3 d-flex justify-content-between align-items-center pl-md-5 pl-4 ${
            location.pathname === "/register" ? "bg-dark" : "bg-black"
          } `}
        >
          <div className="d-flex col-12 align-items-center justify-content-between">
            <Link
              to="/"
              style={{ fontSize: "2em" }}
              className="navbar-brand fw-bold text-white me-md-5  me-3"
            >
              <img src="/logo192.png" height="60px" alt="" srcSet="" />
              <span style={{ marginLeft: "15px" }}>passport-ed</span>
            </Link>

            <h5 className="text-white p-3">
              Hassle Free DMS on the Blockchain
            </h5>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <Header />
      <AnimatePresence>
        <motion.div
          id="page-content"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 2.5 }}
          style={{ paddingTop: "6vh" }}
          className={
            props.contained ? "container overflow-hidden" : "overflow-hidden"
          }
        >
          {props.children}

          <div className="text-center py-3">
            <div className="p-3">
              {/* <div className="fw-bold">Built with ❤️ by Star Labs Devs</div> */}
              <div className="p">@fabianferno @surbhitagrawal</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
