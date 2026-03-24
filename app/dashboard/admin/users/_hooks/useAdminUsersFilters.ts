"use client";

import { useMemo, useState } from "react";
import type { RoleFilter, UserRow } from "../_types/users";

export function useAdminUsersFilters(users: UserRow[]) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !search || user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "all" ? true : user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  return {
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    filteredUsers,
  };
}