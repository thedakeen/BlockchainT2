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





:notebook: :black_nib: **Authors:**

**Abai Akylzhanuly,Daulet Kenges, Ansar Amanzholov** :top:
