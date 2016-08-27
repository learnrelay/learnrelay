export function isElementInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export function isElementVisibleInParentElement(el: HTMLElement,
                                                parentEl: HTMLElement,
                                                innerPaddingX: number,
                                                innerPaddingY: number): boolean {
  const rect = el.getBoundingClientRect()
  const parentRect = parentEl.getBoundingClientRect()

  return (
    rect.top - innerPaddingY >= parentRect.top &&
    rect.left - innerPaddingX >= parentRect.left &&
    rect.bottom + innerPaddingY <= parentRect.bottom &&
    rect.right + innerPaddingX <= parentRect.right
  )
}
