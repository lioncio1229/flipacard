import { Box, Paper, Button, styled } from "@mui/material";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

const StyledBox = styled(Box)`
  display: inline-block;
  transform-style: preserve-3d;
  width: 16rem;
  height: 2rem;
  position: relative;

  &.flip-enter-active {
    transform: rotateY(0deg);
    height: 2rem;
  }
  &.flip-enter-done {
    transform: rotateY(180deg);
    transition: transform 0.3s linear, height 0.3s linear;
    height: 12rem;
  }
  &.flip-exit-active {
    height: 12rem;
    transform: rotateY(180deg);
  }
  &.flip-exit-done {
    height: 2rem;
    transform: rotateY(0deg);
    transition: transform 0.3s linear, height 0.3s linear;
  }
`;

const Card = styled(Box)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

export default function FlipableButton() {
  const [flip, setFlip] = useState<boolean>(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ perspective: 800 }}>
      <CSSTransition in={flip} nodeRef={nodeRef} classNames="flip" timeout={0}>
        <StyledBox ref={nodeRef}>
          <Card>
            <Button
              size="large"
              variant="contained"
              onClick={() => setFlip(!flip)}
              sx={{
                border: "1px solid white",
              }}
              fullWidth
            >
              Play
            </Button>
          </Card>
          <Card sx={{ transform: "rotateY(180deg)" }}>
            <Paper elevation={3} sx={{ width: "100%", height: "100%" }}>
              <div onClick={() => setFlip(!flip)}>Hello World</div>
            </Paper>
          </Card>
        </StyledBox>
      </CSSTransition>
    </Box>
  );
}
