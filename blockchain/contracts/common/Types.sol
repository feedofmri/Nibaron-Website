// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

enum OrderStatus {
    None,
    Placed,
    Completed,
    Refunded,
    Cancelled,
    Recorded // off-chain record
}

struct Product {
    address seller;
    string  name;          // e.g., "Rice (BR-28)"
    string  unit;          // e.g., "kg", "sack"
    uint256 unitPriceWei;  // price per unit
    uint256 availableQty;  // remaining units
    bool    active;
}

struct Order {
    uint256 id;
    uint256 productId;
    address buyer;
    address seller;
    uint256 quantity;
    uint256 unitPriceWei;
    uint256 totalWei;
    OrderStatus status;
    uint64  placedAt;
}
