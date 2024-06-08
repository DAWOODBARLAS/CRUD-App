import React, { useRef, useState } from "react";
import CredentialsTable from "./CredentialsTable";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [credentialsList, setCredentialsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the index of item being edited

  function handleSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    if (!email || !password || !name) {
      return; // Prevent adding empty rows
    }

    if (editIndex !== null) {
      // If editIndex is not null, it means we're editing an existing item
      const updatedList = [...credentialsList];
      updatedList[editIndex] = { email, password, name };
      setCredentialsList(updatedList);
      setEditIndex(null); // Reset editIndex after editing
    } else {
      // If editIndex is null, it means we're adding a new item
      setCredentialsList((prevList) => [...prevList, { email, password, name }]);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
    nameRef.current.value = "";
  }

  function handleEdit(index) {
    const itemToEdit = credentialsList[index];
    emailRef.current.value = itemToEdit.email;
    passwordRef.current.value = itemToEdit.password;
    nameRef.current.value = itemToEdit.name;
    setEditIndex(index);
  }

  function handleDelete(index) {
    setCredentialsList((prevList) => prevList.filter((_, i) => i !== index));
  }

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
            <input
              id="password"
              type="password"
              name="password"
              ref={passwordRef}
              required
            />
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
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

// ///API Releated
// import React, { useRef, useState } from "react";
// import CredentialsTable from "./CredentialsTable";

// // Simulated API functions
// const API = {
//   fetchCredentials: () => {
//     const savedCredentials = localStorage.getItem("credentials");
//     return savedCredentials ? JSON.parse(savedCredentials) : [];
//   },
//   createCredentials: (newCredentials) => {
//     const credentialsList = API.fetchCredentials();
//     credentialsList.push(newCredentials);
//     localStorage.setItem("credentials", JSON.stringify(credentialsList));
//     return credentialsList;
//   },
//   updateCredentials: (index, editedCredentials) => {
//     const credentialsList = API.fetchCredentials();
//     credentialsList[index] = editedCredentials;
//     localStorage.setItem("credentials", JSON.stringify(credentialsList));
//     return credentialsList;
//   },
//   deleteCredentials: (index) => {
//     const credentialsList = API.fetchCredentials();
//     credentialsList.splice(index, 1);
//     localStorage.setItem("credentials", JSON.stringify(credentialsList));
//     return credentialsList;
//   },
// };

// export default function Login() {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const nameRef = useRef();
//   const [credentialsList, setCredentialsList] = useState(
//     API.fetchCredentials()
//   );

//   function handleSubmit(event) {
//     event.preventDefault();

//     const email = emailRef.current.value;
//     const password = passwordRef.current.value;
//     const name = nameRef.current.value;

//     if (!email || !password || !name) {
//       return; // Prevent adding empty rows
//     }

//     const newCredentials = { email, password, name };

//     // Call the simulated API to create new credentials
//     const updatedCredentialsList = API.createCredentials(newCredentials);
//     setCredentialsList(updatedCredentialsList);

//     // Clear the input fields
//     emailRef.current.value = "";
//     passwordRef.current.value = "";
//     nameRef.current.value = "";
//   }

//   function handleEdit(index, editedCredentials) {
//     // Call the simulated API to update credentials
//     const updatedCredentialsList = API.updateCredentials(
//       index,
//       editedCredentials
//     );
//     setCredentialsList(updatedCredentialsList);
//   }

//   function handleDelete(index) {
//     // Call the simulated API to delete credentials
//     const updatedCredentialsList = API.deleteCredentials(index);
//     setCredentialsList(updatedCredentialsList);
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <h2>Login</h2>

//         <div className="control-row">
//           <div className="control no-margin">
//             <label htmlFor="name">Name</label>
//             <input id="name" type="text" name="name" ref={nameRef} />
//           </div>
//           <div className="control no-margin">
//             <label htmlFor="email">Email</label>
//             <input id="email" type="email" name="email" ref={emailRef} />
//           </div>

//           <div className="control no-margin">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               name="password"
//               ref={passwordRef}
//             />
//           </div>
//         </div>

//         <p className="form-actions">
//           <button type="submit" className="button">
//             ADD
//           </button>
//         </p>
//       </form>

//       {credentialsList.length > 0 && (
//         <CredentialsTable
//           credentialsList={credentialsList}
//           handleEdit={handleEdit}
//           handleDelete={handleDelete}
//         />
//       )}
//     </div>
//   );
// }
