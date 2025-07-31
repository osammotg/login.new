export interface AuthProvider {
  id: string
  name: string
  description: string
  icon?: string
}

export interface ProviderSelectorProps {
  selectedProviders: string[]
  onProviderToggle: (providerId: string) => void
}

export interface ProviderCardProps {
  provider: AuthProvider
  isSelected: boolean
  onToggle: () => void
} 