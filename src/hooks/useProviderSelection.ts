import { useState, useCallback } from 'react'

export const useProviderSelection = () => {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])

  const toggleProvider = useCallback((providerId: string) => {
    setSelectedProviders(prev => {
      if (prev.includes(providerId)) {
        return prev.filter(id => id !== providerId)
      } else {
        return [...prev, providerId]
      }
    })
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedProviders([])
  }, [])

  const hasSelection = selectedProviders.length > 0

  return {
    selectedProviders,
    toggleProvider,
    clearSelection,
    hasSelection
  }
} 