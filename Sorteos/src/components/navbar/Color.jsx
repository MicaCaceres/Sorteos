"use client"
import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react"
import { useColorMode } from "../ui/color-mode.jsx"
import { LuMoon, LuSun } from "react-icons/lu"

const Color = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton onClick={toggleColorMode} variant="outline" size="sm">
        {colorMode === "light" ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  )
}

export default Color