// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {MarketStorage} from "../storage/MarketStorage.sol";

abstract contract FeeManager is MarketStorage {
    function setFeeBps(uint96 newFeeBps) public onlyOwner {
        require(newFeeBps <= 1000, "max 10%");
        feeBps = newFeeBps;
    }

    function withdrawFees(address payable to, uint256 amount) public onlyOwner nonReentrant {
        require(amount <= feesAccrued, "exceeds fees");
        feesAccrued -= amount;
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "withdraw failed");
    }
}
