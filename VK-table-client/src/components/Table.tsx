import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOCAL_API_URL } from "../environment";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: "active" | "inactive";
  position: string;
  salary: number;
  address: string;
  phone: string;
  skills: string[];
}

export default function Table({ className = "" }: { className?: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const response = await axios.get(`${LOCAL_API_URL}/users`);
      const allUsers = response.data;

      const uniqueUsers = allUsers.reduce((acc: User[], current: User) => {
        const isDuplicate = acc.some((user) => user.id === current.id);
        if (!isDuplicate) {
          return [...acc, current];
        }
        return acc;
      }, []);

      const alreadyLoadedCount = users.length;
      const remainingUsers = uniqueUsers.slice(alreadyLoadedCount);
      const usersToAdd = remainingUsers.slice(0, 5);

      if (usersToAdd.length === 0) {
        setHasMore(false);
        return;
      }

      setUsers((prev) => {
        const newUsers = [...prev, ...usersToAdd];
        return newUsers.filter(
          (user, index, self) =>
            index === self.findIndex((u) => u.id === user.id),
        );
      });
      setHasMore(alreadyLoadedCount + usersToAdd.length < uniqueUsers.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [hasMore, loading, users.length]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${LOCAL_API_URL}/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLoadMore = () => {
    if (!hasMore || loading) return;
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (initialLoad) {
    return (
      <div className="flex justify-center py-8 text-slate-700 dark:text-slate-300">
        Loading initial data...
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Таблица пользователей
        </h1>
        <button
          onClick={() => navigate("/add-user")}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-white transition-colors hover:cursor-pointer hover:bg-emerald-600 dark:bg-emerald-800 dark:hover:bg-emerald-700"
        >
          Добавить нового пользователя
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white dark:bg-slate-800">
          <thead className="bg-gray-100 dark:bg-slate-700">
            <tr>
              {[
                "ID",
                "Name",
                "Email",
                "Age",
                "Position",
                "Salary",
                "Address",
                "Phone",
                "Skills",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-slate-700 dark:text-slate-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-700/50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-800 dark:text-slate-200">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {user.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-800 dark:text-slate-200">
                  {user.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-800 dark:text-slate-200">
                  ${user.salary}
                </td>
                <td className="max-w-xs truncate px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {user.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                  {user.phone}
                </td>
                <td className="max-w-xs px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {user.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 hover:cursor-default dark:bg-blue-900 dark:text-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800 hover:cursor-default dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 hover:cursor-default dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate(`/edit-user/${user.id}`)}
                      className="text-blue-500 hover:cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:cursor-pointer hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loading || !hasMore}
            className={`rounded-lg bg-slate-200 px-4 py-2 transition-colors hover:cursor-pointer hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 ${
              loading || !hasMore ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {!hasMore && users.length > 0 && (
        <div className="mt-4 text-center text-slate-500 dark:text-slate-400">
          No more users to load
        </div>
      )}
    </div>
  );
}
