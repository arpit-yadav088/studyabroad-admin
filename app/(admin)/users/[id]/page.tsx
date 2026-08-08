
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { getUserById } from "@/lib/api";
import { User } from "@/types/user";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const id = String(params.id);

        const data = await getUserById(id);

        setUser(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch user"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => router.push("/users")}
        >
          Back to Users
        </Button>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>User not found.</Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => router.push("/users")}
        >
          Back to Users
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{ mb: 3 }}
        onClick={() => router.push("/users")}
      >
        ← Back to Users
      </Button>

      {/* User Header */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Avatar
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            sx={{
              width: 100,
              height: 100,
            }}
          />

          <Box>
            <Typography variant="h4" fontWeight={700}>
              {user.firstName} {user.lastName}
            </Typography>

            <Typography color="text.secondary">
              @{user.username}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              {user.email}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Personal Information */}
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 3 }}
        >
          Personal Information
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">
              First Name
            </Typography>

            <Typography fontWeight={600}>
              {user.firstName}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">
              Last Name
            </Typography>

            <Typography fontWeight={600}>
              {user.lastName}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">
              Age
            </Typography>

            <Typography fontWeight={600}>
              {user.age}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">
              Gender
            </Typography>

            <Typography fontWeight={600}>
              {user.gender}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">
              Email
            </Typography>

            <Typography fontWeight={600}>
              {user.email}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary">
              Phone
            </Typography>

            <Typography fontWeight={600}>
              {user.phone}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Address */}
      {user.address && (
        <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 3 }}
          >
            Address
          </Typography>

          <Typography>
            {user.address.address}
          </Typography>

          <Typography>
            {user.address.city}, {user.address.state}
          </Typography>

          <Typography>
            {user.address.postalCode}
          </Typography>

          <Typography>
            {user.address.country}
          </Typography>
        </Paper>
      )}

      {/* Company */}
      {user.company && (
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ mb: 3 }}
          >
            Company
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography color="text.secondary">
                Company Name
              </Typography>

              <Typography fontWeight={600}>
                {user.company.name}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography color="text.secondary">
                Department
              </Typography>

              <Typography fontWeight={600}>
                {user.company.department}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography color="text.secondary">
                Job Title
              </Typography>

              <Typography fontWeight={600}>
                {user.company.title}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}
