import { action, computed } from "mobx"
import { last, range } from "ramda"
import { columnLength } from "../config"
import { Team } from "../types"
import { SlotModel } from "./SlotModel"

export class ColumnModel {
  constructor(public readonly x: number) {}
  public readonly slots = range(0, columnLength).map(y => new SlotModel(this.x, y))

  @computed
  public get emptySlots() {
    return this.slots.filter(slot => slot.filledBy === "none") as Array<
      SlotModel & { filledBy: "none" }
    >
  }

  @computed
  public get filledSlots() {
    return this.slots.filter(slot => slot.filledBy !== "none") as Array<
      SlotModel & { filledBy: Team }
    >
  }

  @computed
  public get isFull() {
    return this.slots.every(slot => slot.filledBy !== "none")
  }

  @action
  public fill(team: Team) {
    const emptySlot = last(this.emptySlots)
    if (!emptySlot) return { success: false }

    emptySlot.fill(team)
    return { success: true }
  }
}
