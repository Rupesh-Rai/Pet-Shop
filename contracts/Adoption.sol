// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Adoption {
    address[16] public adopters;

    struct Pet {
        string name;
        uint8 age;
        string breed;
    }

    Pet[16] public pets;

    // Adopting a pet
    function adopt(uint256 petId) public returns (uint256) {
        require(petId >= 0 && petId <= 15);

        adopters[petId] = msg.sender;

        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }

    // Set a pet's details
    function setPet(uint256 petId, string memory name, uint8 age, string memory breed) public {
        require(petId >= 0 && petId <= 15);

        pets[petId] = Pet(name, age, breed);
    }

    // Get a pet's details
    function getPet(uint256 petId) public view returns (string memory, uint8, string memory) {
        require(petId >= 0 && petId <= 15);

        Pet memory pet = pets[petId];
        return (pet.name, pet.age, pet.breed);
    }
}
