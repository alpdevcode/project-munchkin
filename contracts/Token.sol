pragma solidity ^0.8.9;

import '../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol';
import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';
import '../node_modules/@openzeppelin/contracts/utils/Address.sol';
import '../node_modules/@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '../node_modules/@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import '../node_modules/@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';

contract Munchkin is Context, IERC20, Ownable {

}