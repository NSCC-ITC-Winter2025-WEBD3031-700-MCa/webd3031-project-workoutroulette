// app/dashboard-system-panel/users/UserTable.tsx
"use client"

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
import { useState, useEffect } from "react";

interface UserTableProps {
  id: string;
  name?: string | null;
  image?: string | null;
  isPremium: boolean;
  emailVerified?: string | Date | null;
  createdAt?: string | Date | null; // if you add this to the model
}


export default function UserTable({ users }: UserTableProps) {
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;

  const paginatedUsers = users.slice(
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
          {paginatedUsers.map((user, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Avatar className="hidden mr-3 md:block" src={user.image ?? "/default-avatar.png"} alt="User Profile Picture" />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm">${user.amount}</span>
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
          totalResults={users.length}
          resultsPerPage={resultsPerPage}
          onChange={setPage}
          label="Table navigation"
        />
      </TableFooter>
    </TableContainer>
  );
}
