// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import {ILendingPool} from "./interfaces/ILendingPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Liquidator {
    ILendingPool private immutable lendingPool;

    constructor(address _lendingPool) {
        lendingPool = ILendingPool(_lendingPool);
    }

    function liquidation(
        address collateralAsset,
        address debtAsset,
        address user,
        uint256 debtToCover
    ) internal returns (uint256) {
        (, , , , , uint256 healthFactor) = lendingPool.getUserAccountData(user);

        // check health factor
        require(healthFactor < 1 ether, "health factor too high");

        approveToken(debtAsset, address(lendingPool), debtToCover);
        lendingPool.liquidationCall(
            collateralAsset,
            debtAsset,
            user,
            debtToCover,
            false
        );
        uint256 amountOut = IERC20(collateralAsset).balanceOf(address(this));
        return amountOut;
    }

    function approveToken(
        address token,
        address to,
        uint256 amountIn
    ) internal {
        require(IERC20(token).approve(to, amountIn), "approve failed");
    }
}
