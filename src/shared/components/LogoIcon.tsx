import React from "react"
import logoLight from "/OnSecurityLight.png"
import logoDark from "/OnSecurityDark.png"
import { useTheme } from "../contexts/themeContext"
import  { useState, useEffect } from "react";

type LogoIconProps = {
  size?: number | string
  className?: string
  alt?: string
  color?: "light" | "dark"
}

const LogoIcon: React.FC<LogoIconProps> = ({
  size = 32,
  className = "",
  alt = "Logo",
  color,
}) => {

  const { theme } = useTheme();

  const [logo, setLogo] = useState('');

  useEffect(() => {

    if(color === 'light') {
      setLogo(logoLight);
      return;
    }
    if(color === 'dark') {
      setLogo(logoDark);
      return;
    }
    const logo =  theme !== 'dark' ? logoDark : logoLight;
    setLogo(logo);
  }, [theme]);

  return (
    <img
      src={logo}
      width={size}
      height={size}
      alt={alt}
      className={className}
      style={{ width: size, height: size }}
      draggable={false}
    />
  )
};

export default LogoIcon