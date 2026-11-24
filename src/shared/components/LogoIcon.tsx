import React from "react"
import logoBlue from "/OnSecurityDark.png"
import logoWhite from "/OnSecurityLight.png"

type LogoIconProps = {
  size?: number | string
  className?: string
  alt?: string
  // Só para a marca sobre fundo colorido, onde o azul sumiria. Em qualquer
  // outro lugar a logo é azul, nos dois temas.
  color?: "white"
}

const LogoIcon: React.FC<LogoIconProps> = ({
  size = 32,
  className = "",
  alt = "Logo",
  color,
}) => (
  <img
    src={color === "white" ? logoWhite : logoBlue}
    width={size}
    height={size}
    alt={alt}
    className={className}
    style={{ width: size, height: size }}
    draggable={false}
  />
)

export default LogoIcon
