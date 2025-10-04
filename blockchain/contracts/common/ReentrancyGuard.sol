// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Reentrancy} from "./Errors.sol";

abstract contract ReentrancyGuard {
    uint256 private _status;

    modifier nonReentrant() {
        if (_status == 1) revert Reentrancy();
        _status = 1;
        _;
        _status = 0;
    }
}
