// constants
import Web3 from "web3";
import test2 from "../../contract/Test2.json";
let ContractKit = require("@celo/contractkit");
// log

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

// eslint-disable-next-line
const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

// eslint-disable-next-line
const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        var kit = ContractKit.newKitFromWeb3(web3);
        const accounts = await kit.web3.eth.getAccounts();
        kit.defaultAccount = accounts[0];
        const contract = new kit.web3.eth.Contract(
          test2,
          "0x36586c6293CEd2640445181d3Eac23dBd550Bed5"
          // "0x3f02D2c276994a4224147d4eb12A1C0126a0Ce66"
          // "0x5B7CE6d7a9457094c80Ab50C3aEFE937780e9F14"
          // "0x9800Edb37E120f463f205CB98821f4b1fcd5E04c"
        );

        const t = await contract.methods.Identify().call();
        const id = await contract.methods.addresstoId(accounts[0]).call();
        var user = "";
        switch (t) {
          case "0":
            user = "new";
            break;
          case "1":
            user = "patient";
            break;
          case "2":
            user = "doctor";
            break;
          default:
            user = "new";
            break;
        }

        dispatch(
          connectSuccess({
            account: accounts[0],
            id: id,
            contract: contract,
            web3: web3,
            user: user,
          })
        );
      } catch (error) {
        console.log(`⚠️ ${error}.`);
      }
    } else {
      console.log("⚠️ Please install the CeloExtensionWallet.");
    }
  };
};

// export const updateAccount = (account) => {
//   return async (dispatch) => {
//     dispatch(updateAccountRequest({ account: account }));
//     dispatch(fetchData(account));
//   };
// };
