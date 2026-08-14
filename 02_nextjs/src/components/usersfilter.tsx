"use client";

type User = {
  id: number;
  name: string;
  username: string;
};

import { useState } from "react";

export default function UsersFilter({ users }: { users: User[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id} className="border-b border-gray-300 py-2">
              {user.name} ({user.username})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
