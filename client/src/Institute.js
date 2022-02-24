import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/instituteData/instituteDataActions";

function Institute() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.instituteData);
  // eslint-disable-next-line
  const getDetails = async () => {
    console.log(data);
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.contract !== null) {
      dispatch(fetchData(blockchain.account));
    } // eslint-disable-next-line
  }, [blockchain.contract, blockchain.account]);

  return <div>{data}</div>;
}

export default Institute;
