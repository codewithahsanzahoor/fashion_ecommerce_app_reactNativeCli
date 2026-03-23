# Fashion E-commerce App (React Native CLI)

A modern fashion e-commerce application built using React Native CLI, featuring navigation, vector icons, and a clean project structure.

## Project Overview

- **Main Technologies:** React Native (0.84.1), React (19), React Navigation (v7), TypeScript, and Vector Icons.
- **Platform Support:** Android and iOS.
- **Project Structure:** Standard React Native CLI structure. Main app logic currently resides in `App.jsx`, with plans to expand into a modular `src/` directory.

## Getting Started

### Prerequisites

- Follow the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) for CLI.
- Ensure you have Node.js (>= 22.11.0) and Ruby (for Cocoapods) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd fashion_ecommerce_app_reactNativeCli
    ```

2.  **Install JavaScript dependencies:**
    ```bash
    npm install
    ```

3.  **Install iOS dependencies (macOS only):**
    ```bash
    cd ios
    bundle install
    bundle exec pod install
    cd ..
    ```

### Running the App

1.  **Start Metro Bundler:**
    ```bash
    npm start
    ```

2.  **Run on Android:**
    ```bash
    npm run android
    ```

3.  **Run on iOS:**
    ```bash
    npm run ios
    ```

## Development Commands

- **Start Metro:** `npm start`
- **Run Android:** `npm run android`
- **Run iOS:** `npm run ios`
- **Lint Code:** `npm run lint`
- **Test:** `npm test`

## Architecture & Conventions

- **Navigation:** Uses `@react-navigation/native` with a bottom tab layout configured in `App.jsx`.
- **UI & Icons:** Utilizes `react-native-vector-icons` (specifically FontAwesome).
- **Styling:** Primarily inline styles in components; follow project patterns as they emerge.
- **Code Style:** Strictly follows ESLint and Prettier rules as defined in `.eslintrc.js` and `.prettierrc.js`.
- **Type Safety:** TypeScript is configured but currently, main components use `.jsx`. Migrating to `.tsx` is recommended.

## Testing

- **Testing Framework:** Jest with `react-test-renderer`.
- **Location:** Tests are found in the `__tests__` directory.
- **Execution:** Run `npm test` to execute the suite.
