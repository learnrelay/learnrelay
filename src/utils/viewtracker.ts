export function markAsRead(subchapterAlias: string) {
  window.localStorage.setItem(`has_read_${subchapterAlias}`, 'true')
}

export function hasRead(subchapterAlias: string): boolean {
  return !!window.localStorage.getItem(`has_read_${subchapterAlias}`)
}
