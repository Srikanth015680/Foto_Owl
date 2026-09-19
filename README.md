
# Gallery App

A React Native mobile application built with **Expo, TypeScript, Zustand, AsyncStorage, and React Navigation**.

This project was developed as part of the **React Native Intern Assignment**.

The application demonstrates user authentication, local session persistence, centralized state management, API integration, image search and filtering, infinite scrolling, favorites, image details, image downloading, image sharing, profile management, and dark mode.

The main focus of the project is to keep the application **clean, maintainable, reusable, type-safe, and easy to understand** while covering the requirements of the assignment.

---

## Table of Contents

- [Features](#features)
- [Assignment Requirements](#assignment-requirements)
- [Tech Stack](#tech-stack)
- [Application Flow](#application-flow)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Session Persistence](#session-persistence)
- [Image Gallery](#image-gallery)
- [Search](#search)
- [Filter](#filter)
- [Pagination](#pagination)
- [Favorites](#favorites)
- [Image Details](#image-details)
- [Image Download](#image-download)
- [Image Sharing](#image-sharing)
- [Profile](#profile)
- [Dark Mode](#dark-mode)
- [State Management](#state-management)
- [AsyncStorage](#asyncstorage)
- [Custom Hooks](#custom-hooks)
- [Reusable Components](#reusable-components)
- [API Integration](#api-integration)
- [Error Handling](#error-handling)
- [Pull-to-Refresh](#pull-to-refresh)
- [Validation](#validation)
- [Testing](#testing)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [APK Build](#apk-build)
- [Assumptions and Design Decisions](#assumptions-and-design-decisions)
- [Bonus Features](#bonus-features)
- [Code Quality](#code-quality)
- [Assignment Requirement Coverage](#assignment-requirement-coverage)
- [Project Checks](#project-checks)
- [Submission](#submission)
- [Future Improvements](#future-improvements)
- [Conclusion](#conclusion)

---

# Features

The application provides the following features:

### Authentication

- User registration
- Login
- Local credential validation
- Form validation
- Session persistence
- Logout

### Gallery

- Picsum Photos API integration
- Image thumbnails
- Author name
- Image ID
- Search by author
- A-M / N-Z filtering
- Infinite scrolling
- Pull-to-refresh
- Loading state
- Error handling

### Favorites

- Add images to favorites
- Remove images from favorites
- Persistent favorites
- Dedicated Favorites screen
- Search inside favorites

### Image Details

- Full-size image
- Author name
- Image ID
- Download image
- Share image link

### Profile

- View user information
- Edit profile
- Update profile information
- Save changes
- Logout

### Additional Features

- Dark mode
- Debounced search
- Reusable components
- Custom hooks
- Unit testing
- Native image sharing
- Native device gallery saving
- Duplicate API request protection

---

# Assignment Requirements

This project was developed to satisfy the requirements of the React Native Intern Assignment.

The assignment requires an application that supports:

1. User registration
2. User login
3. Session persistence
4. Image gallery
5. Search
6. Filtering
7. Favorites
8. Image details
9. Image downloading
10. Profile management
11. Logout
12. Local data persistence
13. Centralized state management

The project also implements several optional bonus features.

---

# Tech Stack

| Area                 | Technology              |
| -------------------- | ----------------------- |
| Framework            | React Native            |
| Development Platform | Expo                    |
| Language             | TypeScript              |
| Navigation           | React Navigation        |
| State Management     | Zustand                 |
| Local Storage        | AsyncStorage            |
| API                  | Picsum Photos           |
| Image Component      | Expo Image              |
| File System          | Expo File System        |
| Device Gallery       | Expo Media Library      |
| Sharing              | Expo Sharing            |
| Testing              | Jest                    |
| Expo Testing         | jest-expo               |
| Styling              | React Native StyleSheet |

---

# Application Flow

The application follows this general flow:

```text
                         ┌──────────────────┐
                         │   Application    │
                         └────────┬─────────┘
                                  │
                         ┌────────▼─────────┐
                         │ Session Check    │
                         └────────┬─────────┘
                                  │
                   ┌──────────────┴──────────────┐
                   │                             │
             Not Logged In                  Logged In
                   │                             │
          ┌────────▼────────┐          ┌─────────▼─────────┐
          │ Authentication  │          │   Main App        │
          │                 │          │                   │
          │ Login           │          │ Home              │
          │ Register        │          │ Favorites         │
          │                 │          │ Profile           │
          └─────────────────┘          └───────────────────┘
```
