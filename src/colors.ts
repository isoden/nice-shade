// https://www.30secondsofcode.org/js/s/rgb-to-hsb/
// https://www.30secondsofcode.org/js/s/hsb-to-rgb/

export function hsb2hex(h: number, s: number, b: number): string {
  s /= 100
  b /= 100

  const k = (n: number) => (n + h / 60) % 6
  const f = (n: number) =>
    b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)))

  return `#${hex(255 * f(5))}${hex(255 * f(3))}${hex(255 * f(1))}`

  function hex(decimal: number) {
    return Math.floor(decimal).toString(16).padStart(2, '0')
  }
}

export function hex2hsb(hex: string): [h: number, s: number, b: number] {
  let [r, g, b] = hex
    .slice(1)
    .match(/[0-9a-f]{2}/gi)!
    .map((hex) => Number.parseInt(hex, 16))

  r /= 255
  g /= 255
  b /= 255

  const v = Math.max(r, g, b)
  const n = v - Math.min(r, g, b)
  const h =
    n === 0
      ? 0
      : n && v === r
      ? (g - b) / n
      : v === g
      ? 2 + (b - r) / n
      : 4 + (r - g) / n

  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100]
}
