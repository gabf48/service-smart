"use client";

import { useMemo, useState } from "react";
import type { UserRow, RoleFilter } from "../_types/users";

export function useAdminUsersFilters(users: UserRow[]) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.email.toLowerCase().includes(search.toLowerCase());

      let matchesRole = true;

      switch (roleFilter) {
        case "admin":
          matchesRole = user.role === "admin";
          break;

        case "user":
          matchesRole = user.role === "user";
          break;

        case "2fa-enabled":
          matchesRole = user.two_factor_enabled === true;
          break;

        case "2fa-disabled":
          matchesRole = user.two_factor_enabled === false;
          break;

        default:
          matchesRole = true;
      }

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