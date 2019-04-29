import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { colors } from "../styling/constants"
import { Board } from "./Board"
import { GameInfo } from "./GameInfo"

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Board />
        <GameInfo />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${colors.background};
`

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Montserrat", sans-serif;
  }
`
