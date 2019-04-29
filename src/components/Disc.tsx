import classNames from "classnames"
import { rgba } from "polished"
import React from "react"
import { animated, config, useSpring } from "react-spring"
import styled from "styled-components"
import { Team } from "../types"

interface DiscProps {
  x: number
  y: number
  team: Team
}

export const Disc = (props: DiscProps) => {
  const { x, y, team } = props

  const style = useSpring({
    to: { transform: "translateY(0)" },
    from: { transform: `translateY(-${(y + 1) * 100}%)` },
    config: {
      ...config.gentle,
      clamp: true
    }
  })

  const className = classNames({
    teamAi: team === "ai",
    teamPlayer: team === "player"
  })

  return <Container x={x} y={y} className={className} style={style} />
}

const Container = styled(animated.div)<Pick<DiscProps, "x" | "y">>`
  grid-column: ${props => props.x + 1};
  grid-row: ${props => props.y + 1};
  width: 9vw;
  height: 9vw;
  min-width: 35px;
  min-height: 35px;
  max-width: 70px;
  max-height: 70px;
  border-radius: 50px;

  background: radial-gradient(
    circle,
    ${rgba("black", 0.3)},
    ${rgba("black", 0.3)} 40%,
    var(--border-color) calc(40% + 1px),
    var(--border-color) 48%,
    ${rgba("black", 0.3)} calc(48% + 1px)
  );

  &.teamAi {
    --border-color: #c91a55;
  }

  &.teamPlayer {
    --border-color: #268fc0;
  }
`
