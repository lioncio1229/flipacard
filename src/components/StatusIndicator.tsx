import { Typography } from "@mui/material";

export default function StatusIndicator({
  name,
  value,
  nameSize = "1rem",
  valueSize = "1rem",
}: {
  name: string;
  value: string;
  nameSize?: number | string;
  valueSize?: number | string;
}) {
  return (
    <div>
      <Typography
        fontSize={nameSize}
        variant="caption"
        color="secondary"
        fontWeight={700}
      >{`${name} : `}</Typography>
      <Typography
        fontSize={valueSize}
        variant="caption"
        color="primary"
        fontWeight={700}
      >
        {value}
      </Typography>
    </div>
  );
}
