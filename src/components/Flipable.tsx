import { useRef, forwardRef } from "react";
import { Box, styled } from "@mui/material";
import { CSSTransition } from "react-transition-group";

type FlipableProps = {
  flip: boolean;
  front: JSX.Element;
  back: JSX.Element;
  hideAt?: number;
  width?: number | string;
  height?: number | string;
};

export type Ref = HTMLElement;

const StyledBox = styled(Box)`
  transform-style: preserve-3d;
  position: relative;
  height: 100%;
  width: 100%;

  &.flip-enter-active {
    transform: rotateY(0deg);
  }
  &.flip-enter-done {
    transform: rotateY(180deg);
    transition: transform 0.3s linear;
  }
  &.flip-exit-active {
    transform: rotateY(180deg);
  }
  &.flip-exit-done {
    transform: rotateY(0deg);
    transition: transform 0.3s linear;
  }
`;

const Card = styled(Box)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const Flipable = forwardRef<Ref, FlipableProps>(
  ({ flip, front, back, width = "8rem", height = "8rem", hideAt = 0 }, ref) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
      <Box ref={ref} width={width} height={height} sx={{ perspective: 800 }}>
        <CSSTransition
          in={flip}
          nodeRef={nodeRef}
          classNames="flip"
          timeout={hideAt}
        >
          <StyledBox ref={nodeRef}>
            <Card>{front}</Card>
            <Card sx={{ transform: "rotateY(180deg)" }}>{back}</Card>
          </StyledBox>
        </CSSTransition>
      </Box>
    );
  }
);

export default Flipable;
