import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseContext, FirebaseProvider,Context } from "./store/Context"; 
import { auth, db, storage } from "./firebase/config";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <FirebaseProvider>
    <Context>

      <App />
    
    </Context>
  
  </FirebaseProvider>,
  document.getElementById("root")
);
