
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import { getProductById } from "@/lib/api";
import { Product } from "@/types/product";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const id = String(params.id);

        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
          onClick={() => router.push("/products")}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Product not found.</Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => router.push("/products")}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        variant="outlined"
        sx={{ mb: 3 }}
        onClick={() => router.push("/products")}
      >
        ← Back to Products
      </Button>

      <Paper
        elevation={2}
        sx={{
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "350px 1fr",
            },
            gap: 4,
          }}
        >
          {/* Product Image */}
          <Box>
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={{
                width: "100%",
                height: 350,
                objectFit: "contain",
                borderRadius: 2,
                bgcolor: "grey.100",
              }}
            />
          </Box>

          {/* Product Information */}
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              {product.title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {product.description}
            </Typography>

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              ${product.price}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Category:</strong>{" "}
              {product.category}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Rating:</strong>{" "}
              {product.rating}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Stock:</strong>{" "}
              {product.stock}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Brand:</strong>{" "}
              {product.brand || "N/A"}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>SKU:</strong>{" "}
              {product.sku || "N/A"}
            </Typography>

            {product.discountPercentage !== undefined && (
              <Typography sx={{ mb: 1 }}>
                <strong>Discount:</strong>{" "}
                {product.discountPercentage}%
              </Typography>
            )}

            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => router.push("/products")}
            >
              Back to Products
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

