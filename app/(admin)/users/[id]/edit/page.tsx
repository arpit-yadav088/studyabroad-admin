"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { getUserById, updateUser } from "@/lib/api";
import { User } from "@/types/user";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });

  // =========================
  // Fetch User
  // =========================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const id = String(params.id);

        const data = await getUserById(id);

        setUser(data);

        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          age: String(data.age || ""),
          gender: data.gender || "",
        });
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

  // =========================
  // Handle Input Change
  // =========================

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // Submit Form
  // =========================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const id = String(params.id);

      const updatedUser = await updateUser(id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        age: Number(formData.age),
        gender: formData.gender,
      });

      setUser(updatedUser);

      setSuccess("User updated successfully!");

      setTimeout(() => {
        router.push(`/users/${id}`);
      }, 1000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update user"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Loading
  // =========================

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

  // =========================
  // User Not Found
  // =========================

  if (!user) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">
          {error || "User not found"}
        </Typography>

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

  // =========================
  // Main UI
  // =========================

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Back Button */}

      <Button
        variant="outlined"
        sx={{ mb: 3 }}
        onClick={() => router.push(`/users/${user.id}`)}
      >
        ← Back to User
      </Button>

      <Paper
        elevation={2}
        sx={{
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        {/* Heading */}

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Edit User
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Update user information
        </Typography>

        {/* Error */}

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        {/* Success */}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
          >
            {success}
          </Alert>
        )}

        {/* Form */}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            {/* First Name */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Last Name */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Email */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Phone */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Age */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Gender */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Buttons */}

            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() =>
                    router.push(`/users/${user.id}`)
                  }
                  disabled={saving}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}