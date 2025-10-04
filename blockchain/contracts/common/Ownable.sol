// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {OnlyOwner, ZeroAddress} from "./Errors.sol";
import {Events} from "./Events.sol";

abstract contract Ownable is Events {
    address public owner;

    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner == address(0)) revert ZeroAddress();
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
