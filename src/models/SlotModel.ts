import { action, observable } from "mobx"
import { Team } from "../types"

export class SlotModel {
  @observable
  public filledBy: Team | "none" = "none"

  constructor(public readonly x: number, public readonly y: number) {}

  @action
  public fill(team: Team) {
    this.filledBy = team
  }
}
