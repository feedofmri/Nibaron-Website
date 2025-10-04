// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

abstract contract Events {
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    event ProductListed(
        uint256 indexed productId,
        address indexed seller,
        string  name,
        string  unit,
        uint256 unitPriceWei,
        uint256 qty
    );

    event ProductUpdated(
        uint256 indexed productId,
        uint256 unitPriceWei,
        uint256 availableQty,
        bool    active
    );

    event OrderPlaced(
        uint256 indexed orderId,
        uint256 indexed productId,
        address indexed buyer,
        address seller,
        uint256 quantity,
        uint256 unitPriceWei,
        uint256 totalWei,
        uint96  feeBps
    );

    event OrderCompleted(
        uint256 indexed orderId,
        address indexed buyer,
        address indexed seller,
        uint256 paidToSeller,
        uint256 fee
    );

    event OrderRefunded(uint256 indexed orderId, address indexed buyer, uint256 refundWei);
    event OrderCancelled(uint256 indexed orderId);

    event TransactionRecorded(
        uint256 indexed orderId,
        uint256 indexed productId,
        address indexed buyer,
        address seller,
        uint256 quantity,
        uint256 unitPriceWei,
        uint256 totalWei,
        string  note
    );
}
