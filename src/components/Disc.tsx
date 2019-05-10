import classNames from "classnames"
import React from "react"
import { animated, config, useSpring } from "react-spring"
import styled from "styled-components"
import { colors } from "../styling/constants"
import { Team } from "../types"

interface DiscProps {
  x: number
  y: number
  filledBy: Team
}

export const Disc = (props: DiscProps) => {
  const { x, y, filledBy } = props

  const style = useSpring({
    to: { transform: "translateY(0)" },
    from: { transform: `translateY(-${(y + 1) * 100}%)` },
    config: {
      ...config.gentle,
      clamp: true
    }
  })

  const className = classNames({
    isFilledByAi: filledBy === "ai",
    isFilledByPlayer: filledBy === "player"
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
    ${colors.disc},
    ${colors.disc} 40%,
    var(--border-color) calc(40% + 1px),
    var(--border-color) 48%,
    ${colors.disc} calc(48% + 1px)
  );

  &.isFilledByAi {
    --border-color: ${colors.ai};
  }

  &.isFilledByPlayer {
    --border-color: ${colors.player};
  }
`
