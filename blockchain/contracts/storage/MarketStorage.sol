// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "../common/Ownable.sol";
import {ReentrancyGuard} from "../common/ReentrancyGuard.sol";
import {Product, Order, OrderStatus} from "../common/Types.sol";

abstract contract MarketStorage is Ownable, ReentrancyGuard {
    uint256 public nextProductId;
    uint256 public nextOrderId;
    uint96  public feeBps;       // 100 = 1%
    uint256 public feesAccrued;  // accumulated fees (wei)

    mapping(uint256 => Product) public products;
    mapping(uint256 => Order)   public orders;

    // receive ETH just in case
    receive() external payable {}
}
