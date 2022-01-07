// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transactions {
  uint256 transactionCount;

  event Transfer(address from, address receiver, uint256 amount, string message, uint256 timestamp, string keyword);

  // properties of an object
  struct TransferStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  // an array to store all of our transactions

  // we name it transactions
  // we also say what type, which are our "TransferStruct" - transactions
  // our array will be an array of objects
  TransferStruct [] transactions;

  function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
    transactionCount += 1;
    // here we are adding a list of all transactions
    transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

    // with emit, we are making the actual transfer
    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
  }

  function getAllTransactions() public view returns(TransferStruct[] memory) {
    // return transactions;
  }

  function getTransactionCount() public view returns(uint256) {
    return transactionCount;

  }
}
