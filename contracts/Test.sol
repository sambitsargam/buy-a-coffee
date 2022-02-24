// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

//pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;
 
contract Test {
    // Paitent Structure here 
    struct paitent {           
        string name;
        string addres;
        uint phoneNo;
        string bloodGroup;
        uint treatmentcount;
        uint [] treatmentId;
        uint[] doctors;
     }
    
    mapping (uint => uint ) type_user;//check if user type_user
    mapping (uint => paitent ) p_info;//mapping from id to patient struct
    mapping (address => uint) public addresstoId;//mapping from address to id
    uint[] public ids;
    address[] public addresses;
 
  
    //register patient
    function addPatientInfo (uint id, string memory _name, string memory _addres,uint _phoneNo ,string memory _bloodGroup) public  {
        require(type_user[id]==0 && addresstoId[msg.sender]==0); 
        p_info[id].name = _name;
        p_info[id].addres = _addres;
        p_info[id].phoneNo = _phoneNo;
        p_info[id].bloodGroup = _bloodGroup;
        type_user[id] = 1; 
        addresstoId[msg.sender] = id;
        ids.push(id);
        addresses.push(msg.sender);
    }

    function getPatientInfo(uint  id) public view returns(string memory name , string memory addres,uint phoneNo ,string memory bloodGroup ,uint[]memory,uint[]memory){
        require(type_user[id]==1 && addresstoId[msg.sender]==id);
        return(p_info[id].name, p_info[id].addres, p_info[id].phoneNo, p_info[id].bloodGroup,p_info[id].treatmentId,p_info[id].doctors);
    }

    function addDoctor_Patient(uint did,uint pid) public {
        require(type_user[pid]==1 && addresstoId[msg.sender]==pid);
        p_info[pid].doctors.push(did);
        d_info[did].patients.push(pid);
    }
       
//Doctor starts here
     struct doctor{
        uint doc_id;
        string name;
        string practice_type;
        string area_of_expertize;
        uint phone_no;
        string Address;
        uint[] patients;
    }
    
    mapping(uint=>doctor) d_info;
  
    //Register Doctor
    function addDoctor(uint doc_id,string memory _name,string memory _practice_type,string memory _area_of_expertize,uint _phoneNo,string memory _Address) public {
        require(type_user[doc_id]==0 || addresstoId[msg.sender]==0);
        // calldata uint[] x; 
        d_info[doc_id].name = _name;
        d_info[doc_id].practice_type = _practice_type;
        d_info[doc_id].area_of_expertize = _area_of_expertize;
        d_info[doc_id].phone_no= _phoneNo;
        d_info[doc_id].Address= _Address;
        type_user[doc_id]=2;
        addresstoId[msg.sender] = doc_id;
        ids.push(doc_id);
        addresses.push(msg.sender);
    }
 
    function getDoctorInfo(uint _d_id) public view returns (string memory,string memory,string memory ,uint,string memory,uint[]memory){
        uint val = addresstoId[msg.sender];
        require(type_user[val]==2 || type_user[val]==1 ); 
        return( d_info[_d_id].name,d_info[_d_id].practice_type,d_info[_d_id].area_of_expertize,d_info[_d_id].phone_no,d_info[_d_id].Address,d_info[_d_id].patients);
    }


    function getPatientInfo_Doc(uint pid,uint docid) public view returns(string memory name , string memory addres,uint phoneNo ,string memory bloodGroup){
        require(type_user[pid]==1);
        bool x=false;
        for (uint i=0; i<p_info[pid].doctors.length; i++) {
        if(i==docid)
        {
        x=true;
        break;
        }
    }
        require(x);
        return(p_info[pid].name, p_info[pid].addres, p_info[pid].phoneNo, p_info[pid].bloodGroup);
    }
       

    // Treatment Structure here 
    struct treatment {
        uint patient_id;
        uint doctor_id;
        string diagnosis;
        string medicine;
        uint bill;
        bool paid;
    }
    
    mapping(uint=>treatment) t_info;
                
    function TreatPatient(uint patient_id,string memory diagnosis,uint bill,string memory medicine) public  returns (uint){
        uint did = addresstoId[msg.sender];
        require(type_user[patient_id]==1 || type_user[did]==2 );
        p_info[patient_id].treatmentcount+=1;
        uint _tid = p_info[patient_id].treatmentcount;
        t_info[_tid].patient_id = patient_id;
        t_info[_tid].doctor_id = did;
        t_info[_tid].diagnosis = diagnosis;
        t_info[_tid].bill = bill;
        t_info[_tid].medicine = medicine;
        p_info[patient_id].treatmentId.push(_tid); 
        return _tid;
    }


    function paymentStatus(uint pid,uint tid) public{
        require(type_user[pid]==1 && addresstoId[msg.sender]==pid);
        t_info[tid].paid = true;
    }

    
    function getTreatmentDetails(uint _tid) public view returns (uint p_id,uint d_id,string memory diagnosis,uint bill,string memory medicine) {    
        return (t_info[_tid].patient_id,t_info[_tid].doctor_id,t_info[_tid].diagnosis,t_info[_tid].bill,t_info[_tid].medicine);
    }
        
//Identify 
    function Identify() public view returns (uint val) {
        uint No = addresstoId[msg.sender];
        if(type_user[No]==0){
            return(0);
        }
        else 
            return(type_user[No]);
    }
}
 
 
 
 
 
 
 
 
 
 
 
