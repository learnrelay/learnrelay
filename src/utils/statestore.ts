export function markAsRead(subchapterAlias: string) {
  window.localStorage.setItem(`has_read_${subchapterAlias}`, 'true')
}

export function hasRead(subchapterAlias: string): boolean {
  return !!window.localStorage.getItem(`has_read_${subchapterAlias}`)
}

export function getEndpoint(): string | null {
  return window.localStorage.getItem('graphcool_endpoint')
}

export function saveEndpoint(endpoint: string) {
  window.localStorage.setItem('graphcool_endpoint', endpoint)
  window.localStorage.removeItem('graphcool_endpoint_skipped')
}

export function skipEndpoint() {
  window.localStorage.setItem('graphcool_endpoint_skipped', 'true')
}

export function hasSkippedEndpoint(): boolean {
  return !!window.localStorage.getItem('graphcool_endpoint_skipped')
}
