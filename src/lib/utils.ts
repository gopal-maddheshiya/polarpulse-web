export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatYear(y: number | string) {
  return String(y)
}
