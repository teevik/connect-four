import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { Column } from "../components/Column"
import { Disc } from "../components/Disc"
import { Slot } from "../components/Slot"
import { ColumnModel } from "../models/ColumnModel"
import { SlotModel } from "../models/SlotModel"
import { gameStore } from "../stores/gameStore"
import { breakpoints, colors } from "../styling/constants"

const generateDiscKey = (slot: SlotModel) => `disc-${slot.x}-${slot.y}`
const generateSlotKey = (slot: SlotModel) => `slot-${slot.x}-${slot.y}`
const generateColumnKey = (column: ColumnModel) => `column-${column.x}`

export const Board = () => {
  const discs = useObserver(() =>
    gameStore.filledSlots.map(slot => (
      <Disc
        key={generateDiscKey(slot)}
        x={slot.x}
        y={slot.y}
        team={slot.filledBy}
      />
    ))
  )

  const slots = gameStore.slots.map(slot => (
    <Slot key={generateSlotKey(slot)} x={slot.x} y={slot.y} />
  ))

  const columns = gameStore.columns.map(column => (
    <Column
      key={generateColumnKey(column)}
      x={column.x}
      onClick={() => gameStore.fillColumn(column)}
    />
  ))

  return (
    <Container>
      {discs}
      {slots}
      {columns}
    </Container>
  )
}

const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);

  padding: var(--board-padding);
  background-image: linear-gradient(
      to bottom,
      ${colors.background} 0%,
      ${colors.background} 100%
    ),
    linear-gradient(to bottom, ${colors.board} 0%, ${colors.board} 100%);
  background-clip: content-box, padding-box;

  border-radius: 4px;

  @media ${breakpoints.mobile} {
    --board-padding: 2px;
  }

  @media ${breakpoints.desktop} {
    --board-padding: 5px;
  }
`
