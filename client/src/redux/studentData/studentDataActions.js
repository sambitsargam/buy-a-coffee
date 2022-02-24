// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      console.log(store.getState().blockchain.contract);

      let studentData = await store
        .getState()
        .blockchain.contract.methods.getStudentInfo()
        .call();

      let n = await store
        .getState()
        .blockchain.contract.methods.institutecount()
        .call();

      // console.log(n);
      let instituteData = {};

      for (var i = 0; i < n; i++) {
        let det = await store
          .getState()
          .blockchain.contract.methods.getInstituteInfo_Students(1000 + i)
          .call();
        instituteData[1000 + i] = det;
      }

      console.log(studentData);
      console.log(instituteData);

      var univData = studentData[4].map((univId) => instituteData[univId]);

      studentData = {
        loading: false,
        name: studentData[0],
        address: studentData[1],
        phone: studentData[2],
        age: studentData[3],
        univData,
        ID_Proof: studentData[5],
        marksheet: studentData[6],
        profilePic: studentData[7],
      };

      instituteData = {
        ...instituteData,
      };

      dispatch(fetchDataSuccess({ studentData, instituteData }));
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
