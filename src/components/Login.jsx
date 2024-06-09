import React, { useRef, useState, useEffect } from "react";
import CredentialsTable from "./CredentialsTable";
import { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "../firebase";

export default function Login() {
  // Create references for the input fields to easily access their values
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  
  // State to hold the list of credentials fetched from Firebase
  const [credentialsList, setCredentialsList] = useState([]);
  
  // State to track the index of the credential currently being edited
  const [editIndex, setEditIndex] = useState(null);

  // Reference to the "credentials" collection in Firebase
  const credentialsCollection = collection(db, "credentials");

  // Fetch credentials from Firebase when the component mounts
  useEffect(() => {
    fetchCredentialsFromFirebase();
  }, []);

  // Function to fetch credentials from Firebase and update the state
  const fetchCredentialsFromFirebase = async () => {
    const querySnapshot = await getDocs(credentialsCollection);
    const fetchedCredentials = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCredentialsList(fetchedCredentials);
  };

  // Function to add new credentials to Firebase
  const createCredentialsOnFirebase = async (newCredentials) => {
    await addDoc(credentialsCollection, newCredentials);
    fetchCredentialsFromFirebase();
  };

  // Function to update existing credentials in Firebase
  const updateCredentialsOnFirebase = async (id, updatedCredentials) => {
    const docRef = doc(db, "credentials", id);
    await updateDoc(docRef, updatedCredentials);
    fetchCredentialsFromFirebase();
  };

  // Function to delete credentials from Firebase
  const deleteCredentialsFromFirebase = async (id) => {
    const docRef = doc(db, "credentials", id);
    await deleteDoc(docRef);
    fetchCredentialsFromFirebase();
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Get values from the input fields
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    // Prevent submission if any field is empty
    if (!email || !password || !name) {
      return;
    }

    // Create a new credentials object
    const newCredentials = { email, password, name };

    // If editing, update the existing credentials; otherwise, create new credentials
    if (editIndex !== null) {
      const id = credentialsList[editIndex].id;
      updateCredentialsOnFirebase(id, newCredentials);
      setEditIndex(null); // Reset editIndex after editing
    } else {
      createCredentialsOnFirebase(newCredentials);
    }

    // Clear the input fields after submission
    emailRef.current.value = "";
    passwordRef.current.value = "";
    nameRef.current.value = "";
  };

  // Function to handle editing of credentials
  const handleEdit = (index) => {
    const itemToEdit = credentialsList[index];
    emailRef.current.value = itemToEdit.email;
    passwordRef.current.value = itemToEdit.password;
    nameRef.current.value = itemToEdit.name;
    setEditIndex(index);
  };

  // Function to handle deletion of credentials
  const handleDelete = (index) => {
    const id = credentialsList[index].id;
    deleteCredentialsFromFirebase(id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editIndex !== null ? 'Edit' : 'Login'}</h2>

        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" ref={nameRef} required />
          </div>
          <div className="control no-margin">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" ref={emailRef} required />
          </div>

          <div className="control no-margin">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" ref={passwordRef} required />
          </div>
        </div>

        <p className="form-actions">
          <button type="submit" className="button">
            {editIndex !== null ? 'SAVE' : 'ADD'}
          </button>
        </p>
      </form>

      {credentialsList.length > 0 && (
        <CredentialsTable
          credentialsList={credentialsList}
          handleEdit={handleEdit} // Pass handleEdit function to CredentialsTable
          handleDelete={handleDelete} // Pass handleDelete function to CredentialsTable
        />
      )}
    </div>
  );
}
