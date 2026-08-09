"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { getUsers, getProducts } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();

  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [usersData, productsData] = await Promise.all([
          getUsers(1, 0),
          getProducts(1, 0),
        ]);

        setUsersCount(usersData.total);
        setProductsCount(productsData.total);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // Loading state
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            Dashboard
          </Typography>

          <Typography color="text.secondary">
            Welcome to the Study Abroad Admin Dashboard
          </Typography>
        </Box>

        {/* Statistics */}
        <Grid container spacing={3}>
          {/* Users */}
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
          >
            <Card
              sx={{
                height: "100%",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Total Users
                    </Typography>

                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {usersCount}
                    </Typography>
                  </Box>

                  <PeopleIcon
                    sx={{
                      fontSize: 55,
                      opacity: 0.7,
                    }}
                  />
                </Box>

                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => router.push("/users")}
                >
                  View Users
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Products */}
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
          >
            <Card
              sx={{
                height: "100%",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Total Products
                    </Typography>

                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {productsCount}
                    </Typography>
                  </Box>

                  <ShoppingBagIcon
                    sx={{
                      fontSize: 55,
                      opacity: 0.7,
                    }}
                  />
                </Box>

                <Button
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => router.push("/products")}
                >
                  View Products
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: 4,
            }}
          >
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  Quick Actions
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mb: 2 }}
                  onClick={() => router.push("/users")}
                >
                  Manage Users
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => router.push("/products")}
                >
                  Manage Products
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}