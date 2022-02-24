import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/Layout";

import { fetchData } from "./redux/studentData/studentDataActions";

function Student() {
  const [bid, setBid] = useState(0);
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const profileData = useSelector((state) => state.studentData);
  const availableUnivs = useSelector((state) => state.instituteData);

  // const getDetails = async () => {
  //   console.log(profileData);
  // };

  const addInstitute = async () => {
    const t = await blockchain.contract.methods.addInstitute_Student(bid).send({
      from: blockchain.account,
    });
    console.log(t);
    dispatch(fetchData());
  };

  // eslint-disable-next-line
  const getInstituteDetails = async () => {
    // eslint-disable-next-line
    const list = await blockchain.contract.methods
      .addInstitute_Student(bid)
      .send({
        from: blockchain.account,
      });
    dispatch(fetchData());
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.contract !== null) {
      dispatch(fetchData(blockchain.account));
    }

    // eslint-disable-next-line
  }, [blockchain.contract, blockchain.account]);

  return (
    <Layout>
      <div className="container mb-5" style={{ marginTop: "100px" }}>
        {!profileData.info ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="container">
            <div className="m-3 rounded card card-body bg-black">
              <div className="d-md-flex d-block">
                <div className="m-4 col-md-4 d-flex align-items-center justify-content-center">
                  <img
                    src={
                      profileData.info.profilePic === null
                        ? "/avatar.png"
                        : profileData.info.profilePic
                    }
                    style={{ borderRadius: "100%" }}
                    className="img-fluid "
                    alt=""
                    srcSet=""
                  />
                </div>
                <div className="col-md-8 col-12 d-md-flex align-items-center justify-content-center">
                  <div className="text-secondary text-start m-5">
                    <div>
                      <h6>Student</h6>
                      <h3 className="fw-bold text-primary">
                        {profileData.info.name}
                      </h3>
                    </div>
                    <div className="my-2">
                      <h6>Address</h6>
                      <h3 className="fw-bold text-primary">
                        {profileData.info.address}
                      </h3>
                    </div>
                    <div>
                      <h6>Phone</h6>
                      <h3 className="fw-bold text-primary">
                        {profileData.info.phone}
                      </h3>
                    </div>
                    <div>
                      <h6>Universities you've applied</h6>
                      <h3 className="fw-bold text-primary">
                        {profileData.info.univData === null ? (
                          <div>
                            <h3>No university applied yet</h3>
                          </div>
                        ) : (
                          <div>
                            {profileData.info.univData.map((item, index) => (
                              <div key={index}>
                                <h3 className="fw-bold">
                                  {index + 1}. {item[0]}, {item[1]}
                                </h3>
                              </div>
                            ))}
                          </div>
                        )}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <h6 className="text-start pb-3">Available Documents</h6>

            <div className="d-flex justify-content-start align-items-center">
              <a
                href={profileData.info.ID_Proof}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-black mx-3"
              >
                <img
                  src={profileData.info.ID_Proof}
                  alt=""
                  style={{ height: "400px" }}
                  srcSet=""
                />
              </a>
              <a
                href={profileData.info.marksheet}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-black mx-3"
              >
                <img
                  src={profileData.info.marksheet}
                  alt=""
                  style={{ height: "400px" }}
                  srcSet=""
                />
              </a>
            </div>
          </div>
        )}

        <hr />

        <h6 className="text-start pb-3">Available Institutes</h6>

        {!availableUnivs.info ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="container text-white">
            <div className="d-md-flex">
              {Object.keys(availableUnivs.info.instituteData).map(
                (item, index) => (
                  <div
                    key={index}
                    className="m-3 rounded card card-body bg-black"
                  >
                    <p className="text-secondary p">Institute Id: #{item}</p>
                    <h3>
                      {
                        Object.values(availableUnivs.info.instituteData)[
                          index
                        ][0]
                      }
                    </h3>
                    <h5>
                      {
                        Object.values(availableUnivs.info.instituteData)[
                          index
                        ][1]
                      }
                    </h5>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <h6 className="pb-3 mt-5">Add Institute to User with ID</h6>
        <div className="input-group-append">
          <input
            type="number"
            className="bg-dark form-control text-white rounded"
            value={bid}
            onChange={(e) => setBid(e.target.value)}
          />
          <button
            type="button"
            className="mt-2 btn btn-primary d-block fw-bold text-center"
            onClick={addInstitute}
            style={{ width: "100%" }}
          >
            Add
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Student;
