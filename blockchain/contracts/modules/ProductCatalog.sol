// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {MarketStorage} from "../storage/MarketStorage.sol";
import {Product} from "../common/Types.sol";
import {PriceZero, QtyZero, NotSeller} from "../common/Errors.sol";

abstract contract ProductCatalog is MarketStorage {
    function listProduct(
        string calldata name,
        string calldata unit,
        uint256 unitPriceWei,
        uint256 qty
    ) public returns (uint256 productId) {
        if (unitPriceWei == 0) revert PriceZero();
        if (qty == 0) revert QtyZero();

        productId = ++nextProductId;
        products[productId] = Product({
            seller: msg.sender,
            name: name,
            unit: unit,
            unitPriceWei: unitPriceWei,
            availableQty: qty,
            active: true
        });

        emit ProductListed(productId, msg.sender, name, unit, unitPriceWei, qty);
    }

    function updateProduct(
        uint256 productId,
        uint256 newUnitPriceWei,
        uint256 newAvailableQty,
        bool active
    ) public {
        Product storage p = products[productId];
        if (p.seller != msg.sender) revert NotSeller();
        if (newUnitPriceWei == 0) revert PriceZero();

        p.unitPriceWei = newUnitPriceWei;
        p.availableQty = newAvailableQty;
        p.active = active;

        emit ProductUpdated(productId, newUnitPriceWei, newAvailableQty, active);
    }

    function productInfo(uint256 productId) public view returns (
        address seller, string memory name, string memory unit, uint256 unitPriceWei, uint256 availableQty, bool active
    ) {
        Product storage p = products[productId];
        return (p.seller, p.name, p.unit, p.unitPriceWei, p.availableQty, p.active);
    }
}
