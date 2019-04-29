import { useObserver } from "mobx-react-lite"
import { rgba } from "polished"
import React from "react"
import styled from "styled-components"
import { gameStore } from "../stores/gameStore"
import { GameState } from "../types"

const stateTexts: Record<GameState, string> = {
  ready: "Your turn!",
  "ai playing": "AI is playing...",
  "ai won": "The AI won!",
  "player won": "You won!"
}

export const GameInfo = () => {
  const state = useObserver(() => gameStore.state)
  const stateText = stateTexts[state]

  return <Container>{stateText}</Container>
}

const Container = styled.footer`
  color: ${rgba("white", 0.7)};
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-top: 10px;
`
