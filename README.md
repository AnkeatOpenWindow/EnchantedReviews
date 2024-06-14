<!-- REPLACE ALL THE [USERNAME] TEXT WITH YOUR GITHUB PROFILE NAME & THE [PROJECTNAME] WITH THE NAME OF YOUR GITHUB PROJECT -->

<!-- Repository Information & Links-->
<br />

<!-- HEADER SECTION -->
<h5 align="center" style="padding:0;margin:0;">Anke Du Raan</h5>
<h5 align="center" style="padding:0;margin:0;">221202</h5>
<h6 align="center">DV 300</h6>
</br>
<p align="center">

  <a href="https://github.com/AnkeatOpenWindow/EnchantedReviews.git">
    <img src="./assets/Logo.png" alt="Logo" width="140" >
  </a>
  
  <h3 align="center">EnchantedReviews</h3>

  <p align="center">
    The app that allows a users to write a review on anything that has genre of fiction  <br>
      <a href="https://github.com/AnkeatOpenWindow/EnchantedReviews.git"><strong>Explore the docs »</strong></a>
   <br />
   <br />
   <a href="path/to/demonstration/video">View Demo</a>
    ·
</p>
<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Project Description](#project-description)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [How to install](#how-to-install)
* [Features and Functionality](#features-and-functionality)
* [Concept Process](#concept-process)
   * [Ideation](#ideation)
   * [Wireframes](#wireframes)
   * [User-flow](#user-flow)
* [Development Process](#development-process)
   * [Implementation Process](#implementation-process)
        * [Highlights](#highlights)
        * [Challenges](#challenges)
   * [Reviews and Testing](#peer-reviews)
        * [Feedback from Reviews](#feedback-from-reviews)
        * [Unit Tests](#unit-tests)
   * [Future Implementation](#peer-reviews)
* [Final Outcome](#final-outcome)
    * [Mockups](#mockups)
    * [Video Demonstration](#video-demonstration)
* [Conclusion](#conclusion)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

<!--PROJECT DESCRIPTION-->
## About the Project
<!-- header image of project -->
<img src="./assets/Logo.png" alt="Logo" width="140" >

### Project Description

This app allows users to login or create an account where they'll be able to view current competitions that are going on. Once a users taps on a competion they are taken to the competiion screen where they can see the items, like books or online games, that that can write a review on and post it so that everyone else with an account can see. Then users can like what review they like and the review with the most links gets a crest next to the username of the person who wrote that review.

### Built With

* [React Native](https://reactnative.dev/)
* [Node.js](https://nodejs.org/en)
* [React](https://react.dev/)
* [Firebase](https://firebase.google.com/)
* [Expo go](https://docs.expo.dev/)

<!-- GETTING STARTED -->
<!-- Make sure to add appropriate information about what prerequesite technologies the user would need and also the steps to install your project on their own mashines -->
## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure that you have the latest version of [Node.js](https://nodejs.org/en) installed on your machine.

### How to install

### Installation
Here are a couple of ways to clone this repo:

1. Clone Repository </br>
Run the following in the command-line to clone the project:
   ```sh
   git clone https://github.com/AnkeatOpenWindow/EnchantedReviews.git
   ```
2. Navigate to the Project Directory
Once the repository is cloned, navigate into the project directory:
   ```sh
   cd EnchantedReviews
   ```
3. Install Dependencies </br>
Run the following in the command-line to install all the required dependencies:
   ```sh
   npm install
   ```
4. Install React Native CLI
If you haven't already, you need to install the React Native CLI globally
   ```sh
   npm install -g react-native-cli
   ```
5. Start the Expo Development Server
Start the Expo development server by running:
   ```sh
   expo start
   ```
6: Running the App with Expo Go

  6.1 Download and install the Expo Go app from the App Store (iOS) or Google Play Store (Android) on your mobile device.
  
  6.2 Open the Expo Go app on your device.
  
  6.3 In the Expo Dev Tools in your browser, you will see a QR code. Scan this QR code using the Expo Go app.
  
  * For iOS: Use the camera app to scan the QR code.
  * For Android: Use the built-in QR code scanner in the Expo Go app.
  * The app should now load and run on your device.

<!-- FEATURES AND FUNCTIONALITY-->
<!-- You can add the links to all of your imagery at the bottom of the file as references -->
## Features and Functionality

### Feature 1: Login or create an account

If the users is new they can create an account by in the sign up screen or they can login with their email and password if they have an account

<div style="display: flex; justify-content: space-between;">
  <img src="./assets/Mockups/2.png" alt="Image 2" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/3.png" alt="Image 3" width="300">
</div>

### Feature 2: View current competitions

On the home screen all current competions, with the name, time it starts and ends, will shown. When they tap on the competition it will taken them to the competition screen where the instructions are given with the items, for exmaple books, on which the users can write reviews on.

<div style="display: flex; justify-content: space-between;">
  <img src="./assets/Mockups/4.png" alt="Image 3" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/5.png" alt="Image 4" width="300">
</div>

### Feature 3: Voting for reviews on an item

If the user taps on the heart icon of the review it will add a vote to the review. There is a filter added to allow users to view either the the reviews basied off the number of votes, with the most being at the top or the latest. The review with the most votes will have a crest next to the username of the person who wrote the review. However a user can only for for a review ones and not for any reviews they have written.

<div style="display: flex; justify-content: space-between;">
  <img src="./assets/Mockups/6.png" alt="Image 5" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/7.png" alt="Image 6" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/8.png" alt="Image 6" width="300">
</div>

### Feature 4: Writing you own review.

If the user taps on the plus con icon they will be rirected to the screen where they can write their own review and post it. Which will then show along side the other reviews.

<img src="./assets/Mockups/9.png" alt="Image 7" width="300">


### Feature 5: Edit you profile image.

On the settings screen the user can view their username, email and profile image. If the user had just created an account their profile image will be the default image that has been preset. But if the user taps on the "Pick an image from your camara roll" button it will allow the user to pick the image they want. Once the image has been selected the "Save image" button that image will be saved as their profile image and display where the default profile image was before.

<img src="./assets/Mockups/10.png" alt="Image 8" width="300">


<!-- CONCEPT PROCESS -->
<!-- Briefly explain your concept ideation process -->
## Concept Process

Baised on the brief requirements we had to choose an app that involved around a competition theme of our choosing. As such I choose a competion where users can write reviews on any items that has a genre of fictional.  

### Wireframes

<div style="display: flex; justify-content: space-between; align-items: flex-start;">
  <img src="./assets/Wireframes/Splash.png" alt="Image 5" height="300" style="margin-right: 10px;">
  <img src="./assets/Wireframes/Login.png" alt="Image 6" height="300" style="margin-right: 10px;">
  <img src="./assets/Wireframes/Regester.png" alt="Image 6" height="300">
</div>
<br>
<div style="display: flex; justify-content: space-between; align-items: flex-start;">
  <img src="./assets/Wireframes/Home.png" alt="Image 6" height="300" style="margin-right: 10px;">
  <img src="./assets/Wireframes/Competition.png" alt="Image 6" height="300" style="margin-right: 10px;">
  <img src="./assets/Wireframes/Review1.png" alt="Image 5" height="300">
</div>
<br>
<div style="display: flex; justify-content: space-between; align-items: flex-start;">
  <img src="./assets/Wireframes/Review2.png" alt="Image 6" height="300" style="margin-right: 10px;">
  <img src="./assets/Wireframes/Own.png" alt="Image 6" height="300" style="margin-right: 10px;">
  <img src="./assets/Wireframes/Profile.png" alt="Image 6" height="300" style="margin-right: 10px;">
</div>

<!-- DEVELOPMENT PROCESS -->
## Development Process

The `Development Process` is the technical implementations and functionality done in the frontend and backend of the application.

### Implementation Process
<!-- stipulate all of the functionality you included in the project -->

* When a user signs up/create an account their email, password and username is saved to authentication and to firestore database
* Show all the competions a user can visit and take part in
* Show a leader board to show who had the most votes
* Show all the items a user can write a review on
* Allow a user to be able to write a review and save it to firestore database

#### Highlights
<!-- stipulated the highlight you experienced with the project -->
* See who is in the lead with the help of live data from firestore.
* See the voting update with the help of live data.

#### Challenges
<!-- stipulated the challenges you faced with the project and why you think you faced it or how you think you'll solve it (if not solved) -->
* Struged to get the imapge picket to work and save the image to firestore cloud and have it saved to the user who uploaded the image but manged to fix the bug.
* Struggled to get the heart icon to change color when tapped and when tapped again to up and down vote.
* Struggled to get the up and down voting.

### Reviews & Testing
<!-- stipulate how you've conducted testing in the form of peer reviews, feedback and also functionality testing, like unit tests (if applicable) -->
* Tested using dummy users.
* Got feedback from my lecturer 

### Future Implementation
<!-- stipulate functionality and improvements that can be implemented in the future. -->

* Future 1: count down on the home screen for each of the competion to show when a competion is going to end or begin.

<!-- MOCKUPS -->
## Final Outcome

### Mockups

<div style="display: flex; justify-content: space-between;">
  <img src="./assets/Mockups/1.png" alt="Image 5" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/2.png" alt="Image 6" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/3.png" alt="Image 6" width="300">
</div>
<br>
<div style="display: flex; justify-content: space-between;">
  <img src="./assets/Mockups/4.png" alt="Image 6" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/5.png" alt="Image 6" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/6.png" alt="Image 5" width="300">
</div>
<br>
<div style="display: flex; justify-content: space-between;">
  <img src="./assets/Mockups/7.png" alt="Image 6" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/8.png" alt="Image 6" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/9.png" alt="Image 6" width="300" style="margin-right: 10px;">
  <img src="./assets/Mockups/10.png" alt="Image 6" width="300">
</div>

<!-- VIDEO DEMONSTRATION -->
### Video Demonstration

To see a run through of the application, click below:

<a href="https://drive.google.com/file/d/1UusvSPGxn4X1b71fbkst5Yv45hw0IzYY/view?usp=sharing">
  <img src="./assets/Mockups/1.png" alt="Demo Video" width="300">
</a>

<!-- AUTHORS -->
## Authors

* **Anke Du Raan** - [AnkeatOpenWindow](https://github.com/AnkeatOpenWindow)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.\

<!-- LICENSE -->
## Contact

* **Anke Du Raan** - [anke12345du@gmail.com](anke12345du@gmail.com)
* **Project Link** - [https://github.com/AnkeatOpenWindow/EnchantedReviews](https://github.com/AnkeatOpenWindow/EnchantedReviews.git)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
<!-- all resources that you used and Acknowledgements here -->
* [React Native documentation](https://reactnative.dev/docs/environment-setup)
* [Expo go documentation](https://docs.expo.dev/)
* [ChatGPT](https://openai.com/index/chatgpt/)
* [Firestore documentation](https://firebase.google.com/docs/firestore)


<!-- MARKDOWN LINKS & IMAGES -->
[image1]: /path/to/image.png
[image2]: /path/to/image.png
[image3]: /path/to/image.png
[image4]: /path/to/image.png
[image5]: /path/to/image.png
[image6]: /path/to/image.png
[image7]: /path/to/image.png
[image8]: /path/to/image.png
[image9]: /path/to/image.png
[image10]: /path/to/image.png
