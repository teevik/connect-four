import { rgba } from "polished"
import React from "react"
import styled from "styled-components"
import { RefreshIcon } from "../icons/RefreshIcon"
import { gameStore } from "../stores/gameStore"

export const GameHeader = () => {
  return (
    <Container>
      <IconButton onClick={() => gameStore.startGame()}>
        <RefreshIcon />
      </IconButton>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${rgba("white", 0.7)};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${rgba("white", 0.9)};
  }
`
