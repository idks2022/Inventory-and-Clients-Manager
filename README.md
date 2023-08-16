# InventoryAndClients-Manager
React &amp; Redux with Firestore database -  web app to manage retail's inventory and customers.

Technologies Used: 

-React

  Used as the primary UI library to build and manage components.  
  
-Redux

  Acts as the central state management solution.
  
  Actions and reducers are employed to handle state changes in a predictable way.
  
-Firebase Firestore

  Firestore serves as the primary database, storing collections of products, customers, and purchases.
  
  Real-time data fetching is implemented using Firestore's onSnapshot listener to immediately reflect changes in the UI.
  
-Tailwind CSS

  A utility-first CSS framework used to style the application.
  
  Ensuring a consistent look across various device sizes.
  

Project Structure:

-Components

  DataFetcher: A wrapper component responsible for setting up real-time listeners to Firestore collections and dispatching changes to the Redux store.
  
-Redux Store

  Actions and reducers handle the fetching and storing of products, customers, and purchases.
  
  Real-time updates ensure that the app's state is always in sync with the latest data in Firestore.
  
  
Effective Build Practices:

-Real-time Data Sync: By using Firestore's onSnapshot listener, the application achieves real-time data synchronization, immediately reflecting any changes in the database on the UI.

-State Management: Redux provides a single source of truth for the app's state, ensuring consistency and making state-related bugs easier to trace and fix.

-Error Handling: With structured error handling, any issues during data operations are promptly logged and managed.

-Modular Code: Components and utilities are built modularly, allowing for easier maintenance, and scalability.

-Modular Styling with Tailwind: Tailwind CSS allows for rapid and consistent styling of components without bloating the codebase. Its utility-first approach ensures that styles are reusable and maintainable.

