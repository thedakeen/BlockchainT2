// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DAAToken is ERC20 {
    address public admin;
    address public receiver;
    address public sender;

    constructor() ERC20("AITU-DAA-Token", "DAA") {
        uint256 initialSupply = 200 * (10**decimals());
        _mint(msg.sender, initialSupply);
        admin = msg.sender;
    }

    event TransferInfo(
        address indexed from,
        address indexed to,
        uint256 value,
        uint256 timestamp
    );

    uint256 public latestTransferTimestamp;

    function transfer(address recipient, uint256 amount)
        public
        override
        returns (bool)
    {
        bool success = super.transfer(recipient, amount);
        if (success) {
            sender = msg.sender;
            receiver = recipient;
            uint256 timestamp = block.timestamp;
            emit TransferInfo(msg.sender, recipient, amount, timestamp);
            latestTransferTimestamp = timestamp;
        }
        return success;
    }

    function latestTransferHumanReadable()
        external
        view
        returns (string memory)
    {
        return _timestampToString(latestTransferTimestamp);
    }

    function _timestampToString(uint256 timestamp)
        internal
        pure
        returns (string memory)
    {
        uint256 hour = (timestamp / 3600) % 24;
        uint256 minute = (timestamp / 60) % 60;

        return
            string(
                abi.encodePacked(
                    "Latest transfer timestamp: ",
                    _uint2str(hour),
                    ":",
                    _uint2str(minute)
                )
            );
    }

    function _uint2str(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function getTransactionSender() public view returns (address) {
        return sender;
    }

    function getTransactionReceiver() public view returns (address) {
        return receiver;
    }
}
