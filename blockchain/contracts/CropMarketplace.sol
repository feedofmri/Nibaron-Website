// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ICropMarketplace} from "./interfaces/ICropMarketplace.sol";
import {ProductCatalog} from "./modules/ProductCatalog.sol";
import {Escrow} from "./modules/Escrow.sol";
import {FeeManager} from "./modules/FeeManager.sol";
import {OffchainRecorder} from "./modules/OffchainRecorder.sol";

contract CropMarketplace is
    ProductCatalog,
    Escrow,
    FeeManager,
    OffchainRecorder
{
}
