import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { colors } from "../styling/constants"
import { Board } from "./Board"
import { GameFooter } from "./GameFooter"
import { GameHeader } from "./GameHeader"

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <GameHeader />
        <Board />
        <GameFooter />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: min-content;
  justify-content: center;
  align-items: center;
  align-content: center;
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

  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  body {
    font-family: "Montserrat", sans-serif;
  }
`
