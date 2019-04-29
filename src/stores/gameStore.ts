import { action, computed, observable } from "mobx"
import { range } from "ramda"
import { rowLength } from "../config"
import { sample } from "../helpers/sample"
import { wait } from "../helpers/wait"
import { ColumnModel } from "../models/ColumnModel"
import { GameState } from "../types"

class GameStore {
  public readonly columns = range(0, rowLength).map(x => new ColumnModel(x))
  public readonly slots = this.columns.flatMap(column => column.slots)

  @observable
  public state: GameState = "ready"

  @computed
  public get filledSlots() {
    return this.columns.flatMap(column => column.filledSlots)
  }

  @action
  public async fillColumn(column: ColumnModel) {
    if (this.state !== "ready") return

    const { success } = column.fill("player")
    if (!success) return

    this.state = "ai playing"
    await wait(1000)

    let randomColumn: ColumnModel | undefined = undefined
    do {
      randomColumn = sample(this.columns)
    } while (randomColumn.isFull)

    randomColumn.fill("ai")
    this.state = "ready"
  }
}

export const gameStore = new GameStore()
