"use client";

import { useEffect, useState } from "react";
import type { UserRow } from "../_types/users";
import { fetchUsers } from "../_utils/adminUsersApi";

export function useAdminUsersData() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await fetchUsers();

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    setUsers,
    loading,
    errorMsg,
    loadUsers,
  };
}