"use client"

import { useState, useEffect, useRef } from "react"
import type { ValorantSkin } from "@/lib/valorant-skins"
import { Badge } from "@/components/ui/badge"

interface CaseRouletteProps {
  skins: ValorantSkin[]
  wonSkin: ValorantSkin
  isSpinning: boolean
  onSpinComplete: () => void
}

export function CaseRoulette({ skins, wonSkin, isSpinning, onSpinComplete }: CaseRouletteProps) {
  const [displaySkins, setDisplaySkins] = useState<ValorantSkin[]>([])
  const [translateX, setTranslateX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()

  const SKIN_WIDTH = 152 // 144px skin + 8px gap
  const WINNING_POSITION = 50 // Position of winning skin in array

  useEffect(() => {
    if (isSpinning) {
      initializeRoulette()
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isSpinning])

  function initializeRoulette() {
    // Create array with winning skin at specific position
    const extendedSkins = []

    // Add random skins before winning position
    for (let i = 0; i < WINNING_POSITION; i++) {
      extendedSkins.push(skins[Math.floor(Math.random() * skins.length)])
    }

    // Add the winning skin at the exact position
    extendedSkins.push(wonSkin)

    // Add more skins after
    for (let i = 0; i < 20; i++) {
      extendedSkins.push(skins[Math.floor(Math.random() * skins.length)])
    }

    setDisplaySkins(extendedSkins)
    setTranslateX(0)

    // Start animation
    startTimeRef.current = performance.now()
    animate()
  }

  function animate() {
    if (!startTimeRef.current || !containerRef.current) return

    const currentTime = performance.now()
    const elapsed = currentTime - startTimeRef.current
    const duration = 4000 // 4 seconds total

    if (elapsed >= duration) {
      // Animation complete - stop exactly at winning skin
      const containerWidth = containerRef.current.offsetWidth
      const centerOffset = containerWidth / 2 - SKIN_WIDTH / 2
      const finalPosition = -(WINNING_POSITION * SKIN_WIDTH) + centerOffset

      setTranslateX(finalPosition)
      setTimeout(() => {
        onSpinComplete()
      }, 300)
      return
    }

    // Smooth easing function
    const progress = elapsed / duration
    const easedProgress = easeOutCubic(progress)

    // Calculate position with precise centering
    const containerWidth = containerRef.current.offsetWidth
    const centerOffset = containerWidth / 2 - SKIN_WIDTH / 2
    const finalPosition = -(WINNING_POSITION * SKIN_WIDTH) + centerOffset
    const currentPos = finalPosition * easedProgress

    setTranslateX(currentPos)
    animationRef.current = requestAnimationFrame(animate)
  }

  // Smooth easing function
  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3)
  }

  function getRarityColor(rarity: string) {
    switch (rarity) {
      case "Exclusive":
        return "border-yellow-400 bg-gradient-to-b from-yellow-400/20 to-yellow-600/20"
      case "Ultra":
        return "border-purple-400 bg-gradient-to-b from-purple-400/20 to-purple-600/20"
      case "Premium":
        return "border-blue-400 bg-gradient-to-b from-blue-400/20 to-blue-600/20"
      case "Deluxe":
        return "border-green-400 bg-gradient-to-b from-green-400/20 to-green-600/20"
      case "Select":
        return "border-gray-400 bg-gradient-to-b from-gray-400/20 to-gray-600/20"
      default:
        return "border-gray-400 bg-gradient-to-b from-gray-400/20 to-gray-600/20"
    }
  }

  if (!isSpinning) return null

  return (
    <div className="relative w-full">
      {/* Status indicator */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full border border-red-500/50 backdrop-blur-sm">
          <span className="text-xl">🎰</span>
          <span className="text-sm font-bold text-red-400">GIRANDO A ROLETA</span>
        </div>
      </div>

      {/* Main roulette container */}
      <div
        ref={containerRef}
        className="relative h-80 bg-gradient-to-b from-black/95 to-gray-900/95 rounded-2xl border-4 border-red-500/60 overflow-hidden shadow-2xl"
      >
        {/* Center indicator */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-400 via-red-500 to-red-600 z-30 shadow-lg shadow-red-500/50">
          {/* Top arrow */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-red-500 drop-shadow-lg"></div>
          </div>

          {/* Center diamond */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rotate-45 shadow-xl shadow-red-500/60 border-2 border-red-300">
            <div className="absolute inset-1 bg-gradient-to-br from-red-300 to-red-500 rounded-sm"></div>
          </div>

          {/* Bottom arrow */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-6 border-r-6 border-t-12 border-l-transparent border-r-transparent border-t-red-500 drop-shadow-lg"></div>
          </div>
        </div>

        {/* Side fade effects */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-black/90 via-black/50 to-transparent z-20"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-black/90 via-black/50 to-transparent z-20"></div>

        {/* Roulette items container */}
        <div className="flex items-center h-full p-8 relative z-10">
          <div
            className="flex gap-2 transition-none"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {displaySkins.map((skin, index) => {
              const isWinning = index === WINNING_POSITION

              return (
                <div
                  key={`${skin.id}-${index}`}
                  className={`
                    relative flex-shrink-0 w-36 h-52 border-3 rounded-xl p-3 flex flex-col items-center justify-between
                    ${getRarityColor(skin.rarity)}
                    ${isWinning ? "ring-4 ring-red-400 ring-opacity-90 scale-110 z-20" : ""}
                    backdrop-blur-sm transition-all duration-300
                  `}
                >
                  {/* Winning skin special effects */}
                  {isWinning && (
                    <>
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 rounded-xl animate-spin opacity-75"></div>
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-400 rounded-xl animate-ping opacity-50"></div>
                    </>
                  )}

                  {/* Skin image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-white/30 bg-black/20">
                    <img
                      src={skin.imageUrl ? `/${skin.imageUrl}` : "/placeholder.svg?height=80&width=80"}
                      alt={skin.name}
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                  </div>



                  {/* Skin info */}
                  <div className="text-center space-y-1">
                    <p className="text-white text-xs font-bold truncate w-full leading-tight">{skin.name}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs px-2 py-0.5 font-semibold ${getRarityColor(skin.rarity)} border-2`}
                    >
                      {skin.rarity}
                    </Badge>
                  </div>

                  {/* VP Price */}
                  <div className="text-center">
                    <p className="text-green-400 text-xs font-bold">{skin.vpPrice} VP</p>
                  </div>

                  {/* Rarity glow effects */}
                  {skin.rarity === "Exclusive" && (
                    <div className="absolute inset-0 rounded-xl border-2 border-yellow-400/30 animate-pulse"></div>
                  )}
                  {skin.rarity === "Ultra" && (
                    <div className="absolute inset-0 rounded-xl border-2 border-purple-400/30 animate-pulse"></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4/5 h-12 bg-red-500/30 blur-2xl rounded-full"></div>
    </div>
  )
}
