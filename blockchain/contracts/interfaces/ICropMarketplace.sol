// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ICropMarketplace {
    // product
    function listProduct(string calldata name, string calldata unit, uint256 unitPriceWei, uint256 qty)
        external returns (uint256 productId);

    function updateProduct(uint256 productId, uint256 newUnitPriceWei, uint256 newAvailableQty, bool active) external;

    function productInfo(uint256 productId) external view returns (
        address seller, string memory name, string memory unit, uint256 unitPriceWei, uint256 availableQty, bool active
    );

    // quotes
    function quote(uint256 productId, uint256 quantity)
        external view returns (uint256 total, uint256 fee, uint256 payAmount);

    // escrow flow (ETH)
    function buy(uint256 productId, uint256 quantity) external payable returns (uint256 orderId);
    function buyerConfirmReceived(uint256 orderId) external;
    function sellerCancel(uint256 orderId) external;
    function adminRefund(uint256 orderId) external;

    // off-chain record (no ETH)
    function recordOffchainSale(
        uint256 productId,
        address buyer,
        uint256 quantity,
        uint256 unitPriceWei,
        string calldata note
    ) external returns (uint256 orderId);

    // fees
    function setFeeBps(uint96 newFeeBps) external;
    function withdrawFees(address payable to, uint256 amount) external;
}
