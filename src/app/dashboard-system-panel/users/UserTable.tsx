"use client";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination,
  Avatar,
  Badge,
} from "@roketid/windmill-react-ui";
import { useState } from "react";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isPremium: boolean;
  createdAt?: string | Date | null;
  amount?: number;
}

interface UserTableProps {
  users: User[];
  searchQuery?: string;
}

export default function UserTable({ users, searchQuery = "" }: UserTableProps) {
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;

  const filteredUsers = users.filter((user) =>
    (user.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * resultsPerPage,
    page * resultsPerPage
  );

  return (
    <TableContainer className="mb-8">
      <Table>
        <TableHeader>
          <tr>
            <TableCell>Client</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Avatar
                    className="hidden mr-3 md:block"
                    src={user.image ?? "/default-avatar.png"}
                    alt="User"
                  />
                  <div>
                    <p className="font-semibold">{user.name ?? "Unnamed User"}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user.email ?? "No email"}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">${user.amount?.toFixed(2) ?? "0.00"}</span>
              </TableCell>
              <TableCell>
                <Badge type={user.isPremium ? "success" : "neutral"}>
                  {user.isPremium ? "Premium" : "Free"}
                </Badge>
              </TableCell>
              <TableCell>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter>
        <Pagination
          totalResults={filteredUsers.length}
          resultsPerPage={resultsPerPage}
          onChange={setPage}
          label="Table navigation"
        />
      </TableFooter>
    </TableContainer>
  );
}
