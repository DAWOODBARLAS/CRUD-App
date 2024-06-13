import React from "react";

function CredentialsTable({ credentialsList, handleEdit, handleDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th className="control input">Name</th>
          <th className="control input">Email</th>
          <th className="control input">Password</th>
          <th className="control input">Role</th>
          <th className="control input">Actions</th>
        </tr>
      </thead>
      <tbody>
        {credentialsList.map((credentials, index) => (
          <tr key={index}>
            <td className="control input">{credentials.name}</td>
            <td className="control input">{credentials.email}</td>
            <td className="control input">{credentials.password}</td>
            <td className="control input">{credentials.role}</td>
            <td className="control input">
              <button onClick={() => handleEdit(index)} className="button">
                Edit
              </button>
              <button onClick={() => handleDelete(index)} className="button">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CredentialsTable;

