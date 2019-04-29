import React from "react"
import styled from "styled-components"
import { colors } from "../styling/constants"

interface SlotProps {
  x: number
  y: number
}

export const Slot = (props: SlotProps) => {
  const { x, y } = props

  return <Container x={x} y={y} />
}

const Container = styled.div<Pick<SlotProps, "x" | "y">>`
  grid-column: ${props => props.x + 1};
  grid-row: ${props => props.y + 1};
  width: 9vw;
  height: 9vw;
  min-width: 35px;
  min-height: 35px;
  max-width: 70px;
  max-height: 70px;
  background: radial-gradient(
    circle,
    transparent,
    transparent calc(69% - var(--board-padding)),
    ${colors.board} calc(69% - var(--board-padding) + 1px)
  );
  z-index: 1;
`
