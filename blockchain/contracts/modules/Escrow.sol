// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {MarketStorage} from "../storage/MarketStorage.sol";
import {Order, OrderStatus} from "../common/Types.sol";
import {InactiveProduct, BadQuantity, WrongValue, NotBuyer, NotSeller, NotPlaced, NotCancellable, NotRefundable} from "../common/Errors.sol";

abstract contract Escrow is MarketStorage {
    function _quote(uint256 productId, uint256 quantity)
        internal
        view
        returns (uint256 total, uint256 fee)
    {
        total = products[productId].unitPriceWei * quantity;
        fee = (total * feeBps) / 10_000;
    }

    function quote(uint256 productId, uint256 quantity)
        public
        view
        returns (
            uint256 total,
            uint256 fee,
            uint256 payAmount
        )
    {
        (total, fee) = _quote(productId, quantity);
        payAmount = total + fee;
    }

    function buy(uint256 productId, uint256 quantity)
        public
        payable
        nonReentrant
        returns (uint256 orderId)
    {
        if (!products[productId].active) revert InactiveProduct();
        if (quantity == 0 || quantity > products[productId].availableQty)
            revert BadQuantity();

        (uint256 total, uint256 fee) = _quote(productId, quantity);
        if (msg.value != total + fee) revert WrongValue();

        // reserve stock
        products[productId].availableQty -= quantity;

        orderId = ++nextOrderId;
        orders[orderId] = Order({
            id: orderId,
            productId: productId,
            buyer: msg.sender,
            seller: products[productId].seller,
            quantity: quantity,
            unitPriceWei: products[productId].unitPriceWei,
            totalWei: total,
            status: OrderStatus.Placed,
            placedAt: uint64(block.timestamp)
        });

        emit OrderPlaced(
            orderId,
            productId,
            msg.sender,
            products[productId].seller,
            quantity,
            products[productId].unitPriceWei,
            total,
            feeBps
        );
    }

    function buyerConfirmReceived(uint256 orderId) public nonReentrant {
        if (orders[orderId].status != OrderStatus.Placed) revert NotPlaced();
        if (msg.sender != orders[orderId].buyer) revert NotBuyer();

        orders[orderId].status = OrderStatus.Completed;

        uint256 fee = (orders[orderId].totalWei * feeBps) / 10_000;
        uint256 toSeller = orders[orderId].totalWei;

        if (feeBps > 0) {
            feesAccrued += fee; // fee remains in contract balance
        }

        (bool ok, ) = payable(orders[orderId].seller).call{value: toSeller}("");
        require(ok, "pay seller failed");

        emit OrderCompleted(
            orderId,
            orders[orderId].buyer,
            orders[orderId].seller,
            toSeller,
            fee
        );
    }

    function sellerCancel(uint256 orderId) public nonReentrant {
        if (orders[orderId].status != OrderStatus.Placed)
            revert NotCancellable();
        if (msg.sender != orders[orderId].seller) revert NotSeller();

        orders[orderId].status = OrderStatus.Cancelled;

        // restore stock
        products[orders[orderId].productId].availableQty += orders[orderId]
            .quantity;

        uint256 fee = (orders[orderId].totalWei * feeBps) / 10_000;
        uint256 refund = orders[orderId].totalWei + fee;

        (bool ok, ) = payable(orders[orderId].buyer).call{value: refund}("");
        require(ok, "refund failed");

        emit OrderCancelled(orderId);
        emit OrderRefunded(orderId, orders[orderId].buyer, refund);
    }

    function adminRefund(uint256 orderId) public onlyOwner nonReentrant {
        if (orders[orderId].status != OrderStatus.Placed)
            revert NotRefundable();

        orders[orderId].status = OrderStatus.Refunded;

        // restore stock
        products[orders[orderId].productId].availableQty += orders[orderId]
            .quantity;

        uint256 fee = (orders[orderId].totalWei * feeBps) / 10_000;
        uint256 refund = orders[orderId].totalWei + fee;

        (bool ok, ) = payable(orders[orderId].buyer).call{value: refund}("");
        require(ok, "refund failed");

        emit OrderRefunded(orderId, orders[orderId].buyer, refund);
    }
}
