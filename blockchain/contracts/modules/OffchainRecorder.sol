// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {MarketStorage} from "../storage/MarketStorage.sol";
import {Order, OrderStatus} from "../common/Types.sol";
import {PriceZero, QtyZero, NotSeller} from "../common/Errors.sol";

abstract contract OffchainRecorder is MarketStorage {
    function recordOffchainSale(
        uint256 productId,
        address buyer,
        uint256 quantity,
        uint256 unitPriceWei,
        string calldata note
    ) public returns (uint256 orderId) {
        if (products[productId].seller != msg.sender && msg.sender != owner) revert NotSeller();
        if (quantity == 0) revert QtyZero();
        if (unitPriceWei == 0) revert PriceZero();

        uint256 total = unitPriceWei * quantity;

        orderId = ++nextOrderId;
        orders[orderId] = Order({
            id: orderId,
            productId: productId,
            buyer: buyer,
            seller: products[productId].seller,
            quantity: quantity,
            unitPriceWei: unitPriceWei,
            totalWei: total,
            status: OrderStatus.Recorded,
            placedAt: uint64(block.timestamp)
        });

        emit TransactionRecorded(
            orderId,
            productId,
            buyer,
            products[productId].seller,
            quantity,
            unitPriceWei,
            total,
            note
        );
    }
}
