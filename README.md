# FLICKFINDER

**FLICKFINDER** is a modern, user-friendly mobile application built with React Native that enables users to discover and explore movies. Integrated with the OMDB API, FLICKFINDER allows users to browse movies by category, view detailed movie information, and save their favorite movies. The app is designed to provide a seamless experience across both Android and iOS devices.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Scripts](#scripts)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Overview

FLICKFINDER leverages React Native and Expo to build a cross-platform mobile application, focusing on ease of use and fast access to movie data. By integrating with the OMDB API, users can explore movies by category, view movie details, and manage their favorite movies. The app ensures a smooth and responsive user experience.

## Features

- **Browse Movies by Category**: Easily explore movies across various genres like Action, Comedy, Drama, etc.
- **Movie Details**: View detailed information about movies, including the plot, actors, release date, and ratings.
- **Favorites Management**: Save and manage your favorite movies for quick access.
- **Responsive UI**: Optimized for both Android and iOS platforms with a responsive layout.
- **Real-Time Data Fetching**: Fetches data from the OMDB API to ensure up-to-date information.

## Prerequisites

To run the project locally, ensure the following dependencies are installed:

- **Node.js** (v14.x or higher) - [Download here](https://nodejs.org/)
- **Expo CLI** - Install globally via npm:
  ```bash
  npm install -g expo-cli
  ```
- **Android/iOS Device** - Either use a physical device or an emulator to run the app.

## Installation

### Clone the repository:
```bash
git clone https://github.com/didulabhanuka/flickfinder.git
```

### Navigate into the project directory:
```bash
cd flickfinder
```

### Install the project dependencies:
```bash
npm install
```

## Configuration

### OMDB API Key

FLICKFINDER uses the OMDB API to fetch movie data. You need to register for an API key and replace the placeholder in the `services/omdbApi.js` file.

1. Sign up for an API key at [OMDB API](http://www.omdbapi.com/).
2. In the `services/omdbApi.js` file, replace the current API key with your own:
   ```js
   const API_KEY = 'your-api-key'; // Replace with your OMDB API key
   ```

## Usage

After configuring the API key, you can start the development server and run the app.

### To start the Expo development server:
```bash
npm start
```

## Testing

This project is set up for manual testing. The following actions should be tested:

- **Movie Data Fetching**: Ensure the app correctly fetches movie details from the OMDB API.
- **Favorites Functionality**: Verify that users can add and remove movies from their favorites list.
- **Navigation**: Test that navigation between the app screens is smooth and intuitive.
- **UI Responsiveness**: Confirm the UI is responsive and adjusts correctly on various screen sizes and orientations.

## Scripts

The following npm scripts are available:

- **`npm start`**: Starts the development server with Expo.
- **`npm run android`**: Builds and runs the app on an Android emulator or connected device.
- **`npm run ios`**: Builds and runs the app on an iOS simulator or connected device.
- **`npm run web`**: Runs the app in a web browser for testing.

## License

This project is licensed under the **BSD 3-Clause License**. See the [LICENSE](LICENSE) file for more details.

## Contributing

We welcome contributions to improve **FLICKFINDER**! If you find a bug or have suggestions for new features, please follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

Please ensure your code follows the project's coding conventions and includes appropriate tests, if applicable.

## Acknowledgments

- **OMDB API** - For providing the movie data that powers the application. ([OMDB API](http://www.omdbapi.com/))
- **React Native** - For enabling the creation of cross-platform mobile apps. ([React Native](https://reactnative.dev/))
- **Expo** - For simplifying the development process and providing a rich set of tools. ([Expo](https://expo.dev/))
- **React Navigation** - For providing navigation features within the app. ([React Navigation](https://reactnavigation.org/))

---
