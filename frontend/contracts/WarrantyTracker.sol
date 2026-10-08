//sheikh wasimuddin CSEIOT 61 lab 10 mini project on WarrantyTracker
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WarrantyTracker {

    address public admin;

    struct Product {
        string productId;
        string productName;
        string manufacturer;
        address owner;
        uint256 registrationDate;
        uint256 warrantyExpiry;
        bool registered;
    }

    mapping(string => Product) private products;

    event ProductRegistered(
        string productId,
        string productName,
        address owner,
        uint256 warrantyExpiry
    );

    event OwnershipTransferred(
        string productId,
        address oldOwner,
        address newOwner
    );

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "Only admin can perform this action"
        );
        _;
    }

    function registerProduct(
        string memory _productId,
        string memory _productName,
        string memory _manufacturer,
        uint256 _warrantyMonths
    ) public onlyAdmin {

        require(
            !products[_productId].registered,
            "Product already registered"
        );

        require(
            _warrantyMonths > 0,
            "Warranty must be greater than zero"
        );

        uint256 expiry =
            block.timestamp +
            (_warrantyMonths * 30 days);

        products[_productId] = Product({
            productId: _productId,
            productName: _productName,
            manufacturer: _manufacturer,
            owner: msg.sender,
            registrationDate: block.timestamp,
            warrantyExpiry: expiry,
            registered: true
        });

        emit ProductRegistered(
            _productId,
            _productName,
            msg.sender,
            expiry
        );
    }

    function getProduct(
        string memory _productId
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            address,
            uint256,
            uint256,
            bool
        )
    {
        require(
            products[_productId].registered,
            "Product not found"
        );

        Product memory p = products[_productId];

        return (
            p.productId,
            p.productName,
            p.manufacturer,
            p.owner,
            p.registrationDate,
            p.warrantyExpiry,
            p.registered
        );
    }

    function isWarrantyActive(
        string memory _productId
    )
        public
        view
        returns (bool)
    {
        require(
            products[_productId].registered,
            "Product not found"
        );

        return
            block.timestamp <
            products[_productId].warrantyExpiry;
    }

    function transferOwnership(
        string memory _productId,
        address _newOwner
    )
        public
    {
        require(
            products[_productId].registered,
            "Product not found"
        );

        require(
            products[_productId].owner == msg.sender,
            "Only current owner can transfer"
        );

        require(
            _newOwner != address(0),
            "Invalid new owner"
        );

        address oldOwner =
            products[_productId].owner;

        products[_productId].owner =
            _newOwner;

        emit OwnershipTransferred(
            _productId,
            oldOwner,
            _newOwner
        );
    }
}