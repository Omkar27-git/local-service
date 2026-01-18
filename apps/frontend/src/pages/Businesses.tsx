import { Box, Typography, Paper, Button } from "@mui/material";

const Businesses = () => {
  // mock data for now (backend later)
  const businesses = [
    { id: 1, name: "Omkar Plumbing", category: "Plumbing" },
    { id: 2, name: "QuickFix Electric", category: "Electrical" }
  ];

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography fontSize={22} fontWeight={700}>
          Businesses
        </Typography>

        <Button variant="contained">Add Business</Button>
      </Box>

      {businesses.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            No businesses added yet
          </Typography>
        </Paper>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            md: "repeat(3, 1fr)"
          }}
          gap={3}
        >
          {businesses.map((b) => (
            <Paper
              key={b.id}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}
            >
              <Typography fontWeight={600}>
                {b.name}
              </Typography>

              <Typography
                fontSize={13}
                color="text.secondary"
              >
                {b.category}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </>
  );
};

export default Businesses;
