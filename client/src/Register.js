import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Layout from "./components/Layout";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

// let ContractKit = require("@celo/contractkit");

function Register() {
  const blockchain = useSelector((state) => state.blockchain);
  console.log(blockchain);
  const [formToggle, setFormToggle] = useState(false);
  // const [ID_ProofFile, setID_ProofFile] = useState(null);
  // const [marksheetFile, setMarksheetFile] = useState(null);
  const [ID_ProofUrl, setID_ProofUrl] = useState("/aadhar-placeholder.jpg");
  const [marksheetUrl, setMarksheetUrl] = useState(
    "/marksheet-placeholder.jpg"
  );
  const [profilePicUrl, setProfilePicUrl] = useState("/avatar.png");
  // const [urlArr, setUrlArr] = useState([]);
  let history = useHistory();

  const studentNameInputRef = useRef();
  const studentAddressInputRef = useRef();
  const studentPhoneInputRef = useRef();
  const studentAgeInputRef = useRef();

  const instituteNameInputRef = useRef();
  const instituteAddressInputRef = useRef();

  async function createinstitute() {
    var instituteName = instituteNameInputRef.current.value;
    var instituteAddress = instituteAddressInputRef.current.value;
    const receipt = await blockchain.contract.methods
      .addInstituteInfo(instituteName, instituteAddress)
      .send({
        from: blockchain.account,
      });
    console.log(receipt);

    // Call API to create institute
    // history.push("/institute");
  }

  async function retrieveMarksheet(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setMarksheetUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function retrieveID_Proof(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setID_ProofUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function retrieveProfilePic(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setProfilePicUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createstudent() {
    var studentName = studentNameInputRef.current.value;
    var studentAddress = studentAddressInputRef.current.value;
    var studentPhone = studentPhoneInputRef.current.value;
    var studentAge = studentAgeInputRef.current.value;

    console.log(ID_ProofUrl);
    console.log(marksheetUrl);
    console.log(profilePicUrl);

    const receipt = await blockchain.contract.methods
      .addStudentInfo(
        studentName,
        studentAddress,
        studentPhone,
        studentAge,
        ID_ProofUrl,
        marksheetUrl,
        profilePicUrl
      )
      .send({
        from: blockchain.account,
      });
    console.log(receipt);
    history.push("/student");

    // Call API to create student
  }

  return (
    <Layout>
      <section className="pt-2">
        {formToggle ? (
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between  align-items-center">
              <h1 className="fw-bold  ">Create an Institute</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle
                    ? "Create a Student account"
                    : "Create an Institute instead?"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group   my-4">
                  <label htmlFor="inputName" className="text-dark">
                    Name
                  </label>
                  <input
                    ref={instituteNameInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark  text-white  rounded focus-none"
                    id="inputName"
                    placeholder="College Name - Eg. XYZ Institute "
                  />
                </div>

                <div className="form-group   my-4">
                  <label htmlFor="inputName" className="text-dark">
                    Address
                  </label>
                  <input
                    ref={instituteAddressInputRef}
                    type="text"
                    className="p-3 d-flex bg-dark  text-white  rounded focus-none"
                    style={{ width: "100%" }}
                    id="inputAddress"
                    placeholder="ABC College Delhi"
                  />
                </div>
              </form>

              <div
                onClick={() => createinstitute()}
                className="mt-5 btn d-block btn-lg fw-bold btn-primary p-3"
              >
                Create Institute & Proceed ✅
              </div>
            </section>
          </div>
        ) : (
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <h1 className="fw-bold">Register a Student</h1>
              <div className="form-check form-switch mb-3">
                <button
                  onClick={() => setFormToggle(!formToggle)}
                  className="btn btn-outline-primary"
                  type="button"
                >
                  {formToggle
                    ? "Create a Student account"
                    : "Create an Institute instead?"}
                </button>
              </div>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group  my-4">
                  <label htmlFor="inputName" className="text-dark">
                    Name
                  </label>
                  <input
                    ref={studentNameInputRef}
                    type="text"
                    style={{ width: "100%" }}
                    className="p-3 d-flex bg-dark col-md-6 text-white  rounded focus-none"
                    id="inputName"
                    placeholder="student Name - Eg. Ram Kumar"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputPhone" className="text-dark">
                    Age
                  </label>
                  <input
                    ref={studentAgeInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark  text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAge"
                    placeholder="Age -19"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputAddress" className="text-dark">
                    Address
                  </label>
                  <input
                    ref={studentAddressInputRef}
                    type="text"
                    className={
                      "p-3 d-flex bg-dark  text-white rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputAddress"
                    placeholder="Address - Eg. #12, Street, City, State, Country"
                  />
                </div>

                <div className="form-group  my-4">
                  <label htmlFor="inputPhone" className="text-dark">
                    Phone
                  </label>
                  <input
                    ref={studentPhoneInputRef}
                    type="number"
                    className={
                      "p-3 d-flex bg-dark  text-white  rounded focus-none"
                    }
                    style={{ width: "100%" }}
                    id="inputPhone"
                    placeholder="Phone - Eg. +91-1234567890"
                  />
                </div>

                <div className="d-flex justify-content-start">
                  <div className="me-md-4">
                    <div>Upload Profile Pic</div>
                    <input
                      type="file"
                      className="form-control my-3 bg-dark text-white"
                      name="profilePic"
                      placeholder="Upload Profile Pic"
                      onChange={retrieveProfilePic}
                    />
                  </div>
                  <div className="me-md-4">
                    <div>Upload ID_Proof Card</div>
                    <input
                      type="file"
                      className="form-control my-3 bg-dark text-white"
                      name="ID_Proof"
                      placeholder="Upload ID_Proof"
                      onChange={retrieveID_Proof}
                    />
                  </div>

                  <div className="me-md-4">
                    <div>Upload Marksheet</div>
                    <input
                      type="file"
                      className="form-control my-3 bg-dark text-white"
                      name="marksheet"
                      onChange={retrieveMarksheet}
                    />
                  </div>
                </div>
              </form>

              <hr />

              <div className="d-flex justify-content-between mt-3">
                <div>
                  Your uploaded Profile Picture
                  <div className="card card-body my-3 me-md-3">
                    <img
                      src={profilePicUrl}
                      style={{ height: "300px" }}
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  Your uploaded ID_Proof image
                  <div className="card card-body my-3 me-md-3">
                    <img src={ID_ProofUrl} style={{ height: "300px" }} alt="" />
                  </div>
                </div>
                <div>
                  Your uploaded marksheet image
                  <div className="card card-body my-3 me-md-3">
                    <img
                      src={marksheetUrl}
                      style={{ height: "300px" }}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div
                onClick={() => createstudent()}
                className="mt-5 btn d-block btn-lg fw-bold btn-primary p-3"
              >
                Create Student & Proceed ✅
              </div>
            </section>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Register;
