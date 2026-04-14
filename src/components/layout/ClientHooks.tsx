'use client'
import { useScrollSkew } from "@/hooks/useScrollSkew"

export default function ClientHooks() {
  useScrollSkew('.skew-target')
  return null
}
