import { rgba } from "polished"
import React from "react"
import styled from "styled-components"

interface ColumnProps {
  x: number
  onClick: () => void
}

export const Column = (props: ColumnProps) => {
  const { x, onClick } = props

  return <Container x={x} onClick={onClick} />
}

const Container = styled.button<Pick<ColumnProps, "x">>`
  grid-column: ${props => props.x + 1};
  grid-row: 1/-1;
  border: none;
  border-radius: 50px;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  z-index: 2;

  &:hover,
  &.focus-visible {
    background-color: ${rgba("white", 0.05)};
  }
`
