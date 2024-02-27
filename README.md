# Social Network  :shipit:
This our project is a social network web application developed using Node.js, Express and MongoDB. The project includes a registration and login system, as well as user profile and friends management functionality.

## Key features:
Registration and Login to the System:
>The /user/register page provides the ability to register a new user with a name, email and password.
>>The /user/login page is for logging in to the system. If the login attempt fails, appropriate errors are displayed.

![image](https://github.com/Ababananas/README.md/assets/147140948/003b37bb-1e13-4549-a180-7b611ad1eb5d)

![image](https://github.com/Ababananas/README.md/assets/147140948/89dae3a8-4a0f-4dff-bde1-0b0306549f2e)

We have also created a User Profile:

>Once a user has successfully logged in, they can manage their profile on the /user/profile page.
>Profile features include changing avatar, setting/changing wallet and viewing friends information.

![image](https://github.com/Ababananas/README.md/assets/147140948/83558a71-ebb3-482e-bf45-95c0e2db26d1)

*Wallet*

![image](https://github.com/Ababananas/README.md/assets/147140948/01c50c32-9a43-4b8e-8a89-7f38604c4b44)

**Friends:**

>The /user/friends page provides the user with the ability to manage their friends list.
>The user can send and accept friendship requests, as well as view the current list of friends and requests.

![image](https://github.com/Ababananas/README.md/assets/147140948/9020be9d-988c-4bbb-b4d7-f0f27deb369c)

### Technology:

>Node.js and Express: Our application is developed using server side on Node.js with Express framework to handle HTTP requests.
>MongoDB: MongoDB database is used to store data about users and their friends.
>Bcrypt: To securely hash user passwords during registration and verify passwords at login.

#### Routes:

 >Routes have also been added to the Social Network application to handle various requests.
 >Below is the code of the routes implemented using Express.js:

![image](https://github.com/Ababananas/README.md/assets/147140948/52f8f571-e7ae-4485-9039-016a18044fb7)

>These routes allow users to interact with the app, login, register, manage their profile, send friend requests, and more.

##### Models:

>This code provides a convenient interface for interacting with user data in our MongoDB database.

![image](https://github.com/Ababananas/README.md/assets/147140948/09bf7e01-4069-48e0-94f4-fbf27dbe6af4)

Data Structure:

>UserSchema defines a user data structure using Mongoose.Schema.
>Included are fields for name, email, password hash, wallet address, friend list and friend request list.
>timestamps: true includes automatic timestamps createdAt and updatedAt.
>Model:
>UserModel is created based on the UserSchema data schema using mongoose.model.
>The model represents a collection of users in the MongoDB database.
>Export:
>The user model is exported for use in other parts of the application.

**Validator** 
>We added a validator for registering a new user (registerValidator). Also, we used the multer library to handle the loading of the user's avatar. Here's how these components can interact in the context of our project:

***Registering a new user:***

>When submitting the registration form data, registerValidator will validate that the email, password length, username length, and avatar link format (if specified) are correct.
>>If the data passes validation, it can be sent to the server for registration processing.
>>>Uploading the user's avatar:
After successful registration, when the user already has an identifier (userId), avatar upload becomes available.
When uploading an avatar, multer uses the storage settings defined in our code to save the file in the avatars subfolder of the uploads directory with a filename containing the userId and a file extension.

![image](https://github.com/Ababananas/README.md/assets/147140948/4eca7444-8d07-4ba2-82aa-6e2408c4e3a8)


![image](https://github.com/Ababananas/README.md/assets/147140948/19040377-3c39-4437-af34-6d5d6eb37a56)

>This allows us to use validators to check data at check-in and middleware to handle avatar uploads in our Express routes.

## About our NFT Project
We have created ERC-20 and also non-combustible NFT ERC-721.

**ERC-20**

![image](https://github.com/thedakeen/BlockchainT2/assets/147140948/f5cd2a1c-2ef3-4ad3-89da-074f82db464d)
![image](https://github.com/thedakeen/BlockchainT2/assets/147140948/5c08fba1-561c-4164-b1a6-c88ee1a4b71e)
![image](https://github.com/thedakeen/BlockchainT2/assets/147140948/21eb57ef-2108-4836-b050-5ee7931fe1e4)

**ERC-721**

![image](https://github.com/thedakeen/BlockchainT2/assets/147140948/3f85b71c-da1b-4e13-9014-80cd600fb4d5)


### Scripts
>The main function is an asynchronous function and serves as the entry point to the script.
It uses ethers.getSigners() to retrieve the deployer's subscriber object (presumably the first account).
>>Deployment Contract:
It registers the address of the deployer account.
ethers.getContractFactory("DAAToken") and ("TopWeb3NFT") is used to get the smart contract factory of "DAAToken" and "TopWeb3NFT".
DAAToken.deploy() is called to deploy the contract, and the deployed contract instance is stored in the daaToken variable.
>>>Logging the deployment information:
Finally, the script logs the deployment information, in particular the address where the "DAAToken" and "TopWeb3NFT" contract is deployed.
>>>>Error handling:
The script uses the .then() block to terminate the process with code 0 (success) if there are no errors.
If an error occurs, it logs it, sets the process exit code to 1 (indicating an error), and terminates.
>>>>>Execution:
The main function is called and the process exit code is set depending on the success or failure of the deployment.
This script is suitable for deploying the "DAAToken" and "TopWeb3NFT" contract using the Hardhat framework

![image](https://github.com/thedakeen/BlockchainT2/assets/147140948/68520029-f069-4150-8c66-b7d25999ef44)
:eyes:
![image](https://github.com/thedakeen/BlockchainT2/assets/147140948/f67f8f24-a05e-4030-9ebe-bc1e284671e3)

**Smart-contracts:**
>For smart contracts, we used ABI (Application Binary Interface) for a smart contract called "TopWeb3NFT", "DAAToken" written in Solidity. The contract includes various functions and events to manage NFTs (Non-Fungible Tokens) on the Ethereum blockchain.
>>The contract defines three events: "Approval," "Transfer," and "TransferInfo." These events are triggered during specific actions in the contract and can be used for logging and external notification.

**Test script for a smart contract named "Lock"**
>This script defines a set of tests for the deployment and functionality of the "Lock" smart contract.
The script uses various helper functions and libraries from Hardhat, such as time to handle time-related operations, loadFixture to configure fixtures, expect and chai for assertions.
>>Fixture Setup:
The deployOneYearLockFixture function is defined to set up and deploy the "Lock" contract with specific parameters, such as the lock duration, locked amount, etc.
The fixture uses the loadFixture function from Hardhat to snapshot the state and reset the Hardhat Network in every test.
>>>Deployment Tests:
Three tests check if the deployment of the "Lock" contract sets the correct unlock time, owner, and successfully receives and stores the funds to lock.
An additional test checks if the contract fails deployment when the unlock time is not in the future.
>>>>Withdrawal Tests:
Validation tests check that withdrawals revert with the correct error messages in different scenarios (too soon, called from another account, and successful withdrawal after the unlock time).
An event test checks if the "Withdrawal" event is emitted with the correct arguments.
A transfer test checks if the funds are transferred to the owner upon successful withdrawal.

![image](https://github.com/thedakeen/BlockchainT2/assets/147140948/33d81fe1-ecab-49b0-b8b4-6949486ab806)
![image](https://github.com/thedakeen/BlockchainT2/assets/147140948/c007d4db-d550-4691-a544-dad3caef339a)
![image](https://github.com/thedakeen/BlockchainT2/assets/147140948/d3da6f14-4955-44d3-a9af-c95a16faf1d3)


>NFT holders in your system have unique privileges such as the ability to create posts, leave comments and interact in the community. The interesting thing is that NFT holders are automatically given additional NFTs when they reach a certain level of activity, such as making 5 friends :couple: in the system. This is a way of encouraging participation and expanding the community through interaction with NFT holders. :yum:

![image_2024-02-25_23-12-28](https://github.com/thedakeen/BlockchainT2/assets/147140948/4d242314-e15f-4a7a-81b7-118d8b0fc014)
![image_2024-02-25_23-12-55](https://github.com/thedakeen/BlockchainT2/assets/147140948/c98c2a76-daf5-452c-ba4e-e45aaab67f03)
![image_2024-02-25_23-13-50](https://github.com/thedakeen/BlockchainT2/assets/147140948/36b63668-8f4b-4179-b7b3-dc83b45f0520)









:notebook: :black_nib: **Authors:**

**Abai Akylzhanuly,Daulet Kenges, Ansar Amanzholov** :top:
