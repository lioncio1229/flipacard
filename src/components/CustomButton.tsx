import { styled, Button } from "@mui/material";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  borderRadius: "2rem",
  boxShadow: "0 4px 0 rgba(0, 0, 0, 0.25)",
  fontWeight: 700,
  cursor: "pointer",
}));

export default CustomButton;
