export const buildCommand = (providers: string[]): string => {
  if (providers.length === 0) {
    return ''
  }
  
  const providerList = providers.join(',')
  return `npx @stackframe/init-stack --providers ${providerList}`
}

export const formatCommand = (command: string): string => {
  if (!command) return ''
  
  // Add syntax highlighting for better readability
  return command.replace(
    /npx @stackframe\/init-stack --providers (.+)/,
    'npx @stackframe/init-stack --providers $1'
  )
} 