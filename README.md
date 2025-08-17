# SMstore - E-commerce Platform Documentation

## Project Overview
SMstore is a modern e-commerce platform built using React + Vite + Typescript and styled using Tailwind CSS and ShadCN. It provides a seamless shopping experience with features like product browsing, cart management, and user authentication.

## Key Features

### Product Management
- Browse products by categories
- Search and filter products
- View product details and images
- Read and write product reviews

### Shopping Cart
- Add/remove products
- Adjust quantities
- View cart summary

### User Authentication
- Email/password login
- Social login options
- User profile management
- Order history

### Checkout Process
- Order checkout
- Order received through email



## Dependencies

### Core
- React - UI Library
- TypeScript - Type checking
- Vite - Build tool
- React Router - Navigation

### UI & Styling
- Tailwind CSS - Utility-first CSS
- shadcn/ui - Component library
- Lucide Icons - Icon set

### Others
- Fusejs - Dynamic search
- Emailjs - Order Confirmation



## Technology Stack

### TypeScript
- Catch errors during development
- Provide better code completion and documentation
- Enable more predictable refactoring
- Improve code maintainability

### React
- Functional components with Hooks
- Context API for state management
- React Router for navigation
- Custom hooks for reusable logic

### Tailwind CSS with shadcn/ui
- Consistent design system
- Responsive design out of the box
- Dark/light mode support
- Highly customizable components
- Built-in accessibility features



## Project setup Guide

### Create React App

#### Create react app with typescript and vite
npm create vite@latest SMstore --template react-ts

#### Navigate to the project directory
cd SMstore

#### Install dependencies
npm install

#### Run the development server
npm run dev

open http://localhost:5173 to access the application



### Github Setup

#### Initialize Git in the project folder
git init

#### Add remote repository
git remote add origin https://github.com/sudip-bhr/SMstore.git

#### Stage all files
git add .

#### Commit changes
git commit -m "Initial Commit"

#### Push to GitHub
git push -u origin main



### TypeScript Setup

#### Install typescript globally
npm install -g typescript

#### Add typescript to project

npm install --save-dev typescript

#### Initialize typescript
npx tsc --init

#### Compile typescript files manually
npx tsc



### Setup Tailwind

#### Install tailwindcss related packages
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

#### configure tailwind.config.js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"
],
theme: {
  extend: {},
},
plugins: [],

#### Add tailwind directives to src.index.css
@tailwind base;
@tailwind components;
@tailwind utilities;



### Shadcn/UI Setup

#### initialize shadcn-ui in the project
npx shadcn-ui@latest init

#### add component using shadcn CLI
npx shadcn-ui@latest add button (likewise other components)

#### Install other dependencies (routing, state management, icons, animations, dialogues, etc)

npm install react-router-dom @reduxjs/toolkit react-redux framer-motion lucide-react embla-carousel-react vaul sonner



## Project Structure

SMstore/
├── public/                         # Static assets served directly
│   ├── favicon.ico                 # Website favicon
│   ├── vite.svg                    # Vite logo
│   ├── robots.txt                  # Search engine instructions
│   └── assets/                     # Additional static assets
│
├── src/                            # Main source code
│   ├── assets/                     # Images and icons
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── ui/                     # shadcn/ui generated components
│   │   ├── Header.tsx              # Navigation header
│   │   ├── Footer.tsx              # Footer section
│   │   ├── ProductCard.tsx         # Product display card
│   │   ├── CartItem.tsx            # Shopping cart item
│   │   ├── LoadingSpinner.tsx      # Loading indicator
│   │   ├── ErrorBoundary.tsx       # Error handling
│   │   └── ThemeProvider.tsx       # Dark/Light theme management
│   │
│   ├── context/                    # React Context providers
│   │   ├── AuthContext.tsx         # Authentication state
│   │   ├── CartContext.tsx         # Cart state
│   │   └── ProductContext.tsx      # Product data state
│   │
│   ├── lib/                        # Utilities and helpers
│   │   ├── utils.ts                # Common helper functions
│   │   ├── api.ts                  # API client and requests
│   │   └── constants.ts            # App-wide constants
│   │
│   ├── pages/                      # Application pages
│   │   ├── Products.tsx            # Product listing
│   │   ├── ProductDetail.tsx       # Single product view
│   │   ├── Cart.tsx                # Cart page
│   │   ├── Checkout.tsx            # Checkout flow
│   │   ├── Auth.tsx                # Login/Signup page
│   │   ├── Profile.tsx             # User profile
│   │   └── NotFound.tsx            # 404 page
│   │
│   ├── App.tsx                     # Main App component
│   ├── main.tsx                    # Application entry point
│   ├── index.css                   # Global styles
│   └── vite-env.d.ts               # TypeScript declarations
│
├── node_modules/                   # Installed npm dependencies
│
├── package.json                    # Project dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS config
├── components.json                 # shadcn/ui config
├── eslint.config.js                # ESLint config
├── postcss.config.js               # PostCSS config
└── .gitignore                      # Git ignore rules


# SMstore
