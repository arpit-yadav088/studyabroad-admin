"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useProductStore } from "@/store/productStore";

export default function ProductsPage() {
  const router = useRouter();

  const {
    products,
    total,
    page,
    loading,
    error,
    fetchProducts,
    searchProduct,
    filterByCategory,
  } = useProductStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const handleSearch = (value: string) => {
    setSearch(value);

    if (value.trim()) {
      setCategory("");
      searchProduct(value);
    } else {
      fetchProducts(1);
    }
  };

  const handleCategory = (value: string) => {
    setCategory(value);

    if (value) {
      setSearch("");
      filterByCategory(value);
    } else {
      fetchProducts(1);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Products
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <TextField
            label="Search products"
            placeholder="Search by product name..."
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            sx={{
              width: {
                xs: "100%",
                md: 400,
              },
            }}
          />

          <FormControl
            sx={{
              width: {
                xs: "100%",
                md: 240,
              },
            }}
          >
            <InputLabel id="category-label">
              Category
            </InputLabel>

            <Select
              labelId="category-label"
              value={category}
              label="Category"
              onChange={(event) =>
                handleCategory(event.target.value)
              }
            >
              <MenuItem value="">All Categories</MenuItem>

              <MenuItem value="beauty">Beauty</MenuItem>
              <MenuItem value="fragrances">Fragrances</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="groceries">Groceries</MenuItem>
              <MenuItem value="laptops">Laptops</MenuItem>
              <MenuItem value="mens-shirts">
                Men's Shirts
              </MenuItem>
              <MenuItem value="mens-shoes">
                Men's Shoes
              </MenuItem>
              <MenuItem value="mens-watches">
                Men's Watches
              </MenuItem>
              <MenuItem value="mobile-accessories">
                Mobile Accessories
              </MenuItem>
              <MenuItem value="motorcycle">
                Motorcycle
              </MenuItem>
              <MenuItem value="skin-care">
                Skin Care
              </MenuItem>
              <MenuItem value="smartphones">
                Smartphones
              </MenuItem>
              <MenuItem value="sports-accessories">
                Sports Accessories
              </MenuItem>
              <MenuItem value="sunglasses">
                Sunglasses
              </MenuItem>
              <MenuItem value="tablets">Tablets</MenuItem>
              <MenuItem value="tops">Tops</MenuItem>
              <MenuItem value="vehicle">Vehicle</MenuItem>
              <MenuItem value="womens-bags">
                Women's Bags
              </MenuItem>
              <MenuItem value="womens-dresses">
                Women's Dresses
              </MenuItem>
              <MenuItem value="womens-jewellery">
                Women's Jewellery
              </MenuItem>
              <MenuItem value="womens-shoes">
                Women's Shoes
              </MenuItem>
              <MenuItem value="womens-watches">
                Women's Watches
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Error */}
        {error && (
          <Typography
            color="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Typography>
        )}

        {/* Loading */}
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
        ) : products.length === 0 ? (
          /* Empty State */
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="text.secondary">
              No products found.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Product Grid */}
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid
                  key={product.id}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                  }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    {/* Image */}
                    <CardMedia
                      component="img"
                      image={product.thumbnail}
                      alt={product.title}
                      sx={{
                        height: 220,
                        objectFit: "contain",
                        bgcolor: "grey.100",
                        p: 2,
                      }}
                    />

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.title}
                      </Typography>

                      {/* Category */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {product.category}
                      </Typography>

                      {/* Rating */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Rating
                          value={product.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                        />

                        <Typography variant="body2">
                          {product.rating}
                        </Typography>
                      </Box>

                      {/* Price */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                        }}
                      >
                        ${product.price}
                      </Typography>

                      {/* Stock */}
                      <Typography
                        variant="body2"
                        color={
                          product.stock > 0
                            ? "success.main"
                            : "error.main"
                        }
                        sx={{ mb: 2 }}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </Typography>

                      {/* Details Button */}
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: "auto" }}
                        onClick={() =>
                          router.push(
                            `/products/${product.id}`
                          )
                        }
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {!search && !category && total > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                }}
              >
                <Pagination
                  count={Math.ceil(total / 10)}
                  page={page}
                  color="primary"
                  onChange={(_, newPage) => {
                    fetchProducts(newPage);
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}