pragma solidity >=0.4.21 <0.6.0;

contract Template {
    uint number;

    function setNumber(uint _number) public {
        number = _number;
    }

    function getNumber() external view returns (uint){
        return number;
    }

    function ping() external view returns (uint) {
        return 42;
    }
}
