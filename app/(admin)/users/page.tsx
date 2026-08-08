"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Pagination,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useUserStore } from "@/store/userStore";

export default function UsersPage() {
  const router = useRouter();

  const {
    users,
    total,
    page,
    loading,
    error,
    fetchUsers,
    searchUser,
    deleteUserData,
  } = useUserStore();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const handleSearch = (value: string) => {
    setSearch(value);
    searchUser(value);
  };

  const handleDelete = async (
    id: number,
    firstName: string,
    lastName: string,
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${firstName} ${lastName}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUserData(id);
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Users
            </Typography>

            <Typography color="text.secondary">
              Manage and view all users
            </Typography>
          </Box>

          <Chip
            label={`${total} Total Users`}
            color="primary"
            variant="outlined"
          />
        </Box>

        {/* Search */}
        <TextField
          label="Search users"
          placeholder="Search by name..."
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
          fullWidth
          sx={{
            mb: 3,
            maxWidth: 500,
          }}
        />

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Table */}
        <Paper
          elevation={2}
          sx={{
            overflow: "hidden",
          }}
        >
          {loading ? (
            <Box
              sx={{
                minHeight: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : users.length === 0 ? (
            <Box
              sx={{
                minHeight: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">No users found.</Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>User</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Email</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Gender</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Phone</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Company</strong>
                    </TableCell>

                    <TableCell align="right">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover>
                      {/* User */}
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            src={user.image}
                            alt={`${user.firstName} ${user.lastName}`}
                          >
                            {user.firstName?.[0]}
                          </Avatar>

                          <Box>
                            <Typography fontWeight={600}>
                              {user.firstName} {user.lastName}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                              @{user.username}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* Email */}
                      <TableCell>{user.email}</TableCell>

                      {/* Gender */}
                      <TableCell>
                        <Chip
                          label={user.gender}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>

                      {/* Phone */}
                      <TableCell>{user.phone}</TableCell>

                      {/* Company */}
                      <TableCell>{user.company?.name || "—"}</TableCell>

                      {/* Actions */}
                      <TableCell align="right">
                        <Stack
                          direction="row"
                          spacing={0.5}
                          justifyContent="flex-end"
                        >
                          <Tooltip title="View Details">
                            <IconButton
                              color="primary"
                              onClick={() => router.push(`/users/${user.id}`)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit User">
                            <IconButton
                              color="secondary"
                              onClick={() =>
                                router.push(`/users/${user.id}/edit`)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete User">
                            <IconButton
                              color="error"
                              onClick={() =>
                                handleDelete(
                                  user.id,
                                  user.firstName,
                                  user.lastName,
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Pagination */}
        {!search && total > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Pagination
              count={Math.ceil(total / 10)}
              page={page}
              color="primary"
              onChange={(_, newPage) => {
                fetchUsers(newPage);
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
