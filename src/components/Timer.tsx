import { memo } from "react";
import { Box } from "@mui/material";
import Countdown, { zeroPad } from "react-countdown";
import StatusIndicator from "./StatusIndicator";

type TimerProps = {
  duration: number;
  onComplete?: () => void;
};

const Timer = memo(({ duration, onComplete }: TimerProps) => {
  if (duration > 59 * 60 * 1000) {
    throw new Error("The duration only accept time that is less than an hour");
  }

  return (
    <Countdown
      date={Date.now() + duration}
      zeroPadTime={2}
      onComplete={() => onComplete?.()}
      renderer={({ minutes, seconds, total }) => (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <StatusIndicator
              name="Remaining Time"
              value={` ${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`}
              nameSize="0.8rem"
              valueSize="0.8rem"
            />
          </Box>
          <Box
            sx={{
              height: "0.58rem",
              bgcolor: "#fff",
              boxShadow: "0 1px 2px 1px rgb(0, 0, 0, 0.2) inset",
              borderRadius: "2rem",
            }}
          >
            <Box
              sx={{
                height: "100%",
                bgcolor: "primary.main",
                borderRadius: "2rem",
                width: `${100 - (total / duration) * 100}%`,
                transition: "width 0.7s",
              }}
            ></Box>
          </Box>
        </>
      )}
    />
  );
});

export default Timer;
