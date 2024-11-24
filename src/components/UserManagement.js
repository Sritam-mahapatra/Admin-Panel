import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const initialUsers = [
  { id: 1, name: "Priyanka Senapati", email: "psenapati441@gamil.com", role: "Admin", status: "active", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Example", email: "example@gmail.com", role: "Editor", status: "active", permissions: ["Read", "Write"] },
  
];

const roles = [
  { name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { name: "Editor", permissions: ["Read", "Write"] },
  { name: "Viewer", permissions: ["Read"] },
];

export function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("Please fill in all fields.");
      return;
    }
    
    if (
      users.some(
        (user) => user.email.toLowerCase() === newUser.email.toLowerCase() && user.id !== (editingUser?.id || 0)
      )
    ) {
      alert("Email must be unique.");
      return;
    }
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? { ...newUser, id: editingUser.id } : user));
      setEditingUser(null);
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1, status: "active" }]);
    }
    setNewUser({});
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
    ));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const toggleUserSelection = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const bulkDeleteUsers = () => {
    setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      user.status.toLowerCase().includes(searchLower)
    );
  });

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const paginatedUsers = filteredUsers.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

    
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-md"
        />
        <button
          onClick={() => { setEditingUser(null); setNewUser({}); }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add User
        </button>
      </div>

      
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">
              <input
                type="checkbox"
                onChange={(e) => setSelectedUsers(e.target.checked ? users.map(user => user.id) : [])}
              />
            </th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Permissions</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className={editingUser?.id === user.id ? "bg-yellow-100" : ""}>
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                />
              </td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.permissions.join(", ")}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleToggleStatus(user.id)}
                  className={`px-2 py-1 rounded ${user.status === "active" ? "bg-green-500" : "bg-red-500"} text-white`}
                >
                  {user.status}
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <ReactPaginate
        pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-4 space-x-2"
        activeClassName="bg-blue-500 text-white px-3 py-1 rounded"
        pageClassName="px-3 py-1 border rounded"
        previousLabel="<"
        nextLabel=">"
        disabledClassName="opacity-50"
      />

      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">{editingUser ? "Edit User" : "Add New User"}</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name || ""}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email || ""}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <select
            value={newUser.role || ""}
            onChange={(e) => {
              const selectedRole = roles.find(role => role.name === e.target.value);
              setNewUser({ ...newUser, role: selectedRole.name, permissions: selectedRole.permissions });
            }}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a role</option>
            {roles.map(role => (
              <option key={role.name} value={role.name}>{role.name}</option>
            ))}
          </select>
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {editingUser ? "Save Changes" : "Add User"}
          </button>
        </div>
      </div>

      
      <button
        onClick={bulkDeleteUsers}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        disabled={selectedUsers.length === 0}
      >
        Delete Selected
      </button>
    </div>
  );
}
