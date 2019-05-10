import { action, autorun, computed, IReactionDisposer, observable } from "mobx"
import { range } from "ramda"
import { columnLength, rowLength } from "../config"
import { sample } from "../helpers/sample"
import { wait } from "../helpers/wait"
import { ColumnModel } from "../models/ColumnModel"
import { SlotModel } from "../models/SlotModel"
import { GameState, Team } from "../types"

const checkLine = (...slots: [SlotModel, SlotModel, SlotModel, SlotModel]) => {
  const firstSlot = slots[0]
  if (firstSlot.filledBy === "none") return

  if (slots.every(slot => slot.filledBy === firstSlot.filledBy))
    return firstSlot.filledBy
}

const wonState = {
  ai: "ai won" as const,
  player: "player won" as const
}

class GameStore {
  public readonly columns = range(0, rowLength).map(x => new ColumnModel(x))
  public readonly slots = this.columns.flatMap(column => column.slots)

  @observable
  public state: GameState = "ready"

  @observable
  public winner?: Team

  constructor() {
    this.startGame()
  }

  private disposeWinListener?: IReactionDisposer

  public startGame() {
    if (this.disposeWinListener) this.disposeWinListener()

    this.disposeWinListener = autorun(() => {
      const { winner } = this

      if (winner) {
        this.winner = winner
        this.state = wonState[winner]
        if (this.disposeWinListener) this.disposeWinListener()
      }
    })
  }

  @computed
  public get filledSlots() {
    return this.columns.flatMap(column => column.filledSlots)
  }

  private checkWinner() {
    const { columns } = this
    const slot = (x: number, y: number) => columns[x].slots[y]

    let winner: Team | undefined = undefined

    // down
    for (let x = 0; x < rowLength; x++) {
      for (let y = 0; y < columnLength - 3; y++) {
        const result = checkLine(
          slot(x, y),
          slot(x, y + 1),
          slot(x, y + 2),
          slot(x, y + 3)
        )

        if (result) winner = result
      }
    }

    // right
    for (let x = 0; x < rowLength - 3; x++) {
      for (let y = 0; y < columnLength; y++) {
        const result = checkLine(
          slot(x, y),
          slot(x + 1, y),
          slot(x + 2, y),
          slot(x + 3, y)
        )

        if (result) winner = result
      }
    }

    // down-right
    for (let x = 0; x < rowLength - 3; x++) {
      for (let y = 0; y < columnLength - 3; y++) {
        const result = checkLine(
          slot(x, y),
          slot(x + 1, y + 1),
          slot(x + 2, y + 2),
          slot(x + 3, y + 3)
        )

        if (result) winner = result
      }
    }

    // down-left
    for (let x = 0; x < rowLength - 3; x++) {
      for (let y = 3; y < columnLength; y++) {
        const result = checkLine(
          slot(x, y),
          slot(x + 1, y - 1),
          slot(x + 2, y - 2),
          slot(x + 3, y - 3)
        )

        if (result) winner = result
      }
    }

    if (winner) this.winner = winner
    return winner
  }

  @action
  public async fillColumn(column: ColumnModel) {
    if (this.state !== "ready") return

    const { success } = column.fill("player")
    if (!success) return
    let winner = this.checkWinner()
    if (winner) return

    this.state = "ai playing"
    await wait(1000)

    let randomColumn: ColumnModel | undefined = undefined
    do {
      randomColumn = sample(this.columns)
    } while (randomColumn.isFull)

    randomColumn.fill("ai")

    winner = this.checkWinner()
    if (winner) return
    this.state = "ready"
  }
}

export const gameStore = new GameStore()
