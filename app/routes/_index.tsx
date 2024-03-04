import type { MetaFunction } from '@remix-run/node'
import { useMemo, useState } from 'react'
import { hex2hsb, hsb2hex, parseHex } from '~/colors'
import { Palette } from '~/_components/Palette'

export const meta: MetaFunction = () => {
  return [{ title: 'Nice shade' }]
}

const MIN_BRIGHTNESS = 0
const MAX_BRIGHTNESS = 100
const MIN_SATURATION = 0
const MAX_SATURATION = 100

const MIN_AMOUNT = 3
const MAX_AMOUNT = 40

export default function Index() {
  const [color, setColor] = useState('#003e70')
  const [amount1, setAmount1] = useState(10)
  const [amount2, setAmount2] = useState(10)
  const [amount3, setAmount3] = useState(10)

  const input = useMemo(() => {
    const [hue, saturation, brightness] = hex2hsb(color)
    return { hue, saturation, brightness }
  }, [color])

  const colors1 = replace(
    Array.from(Array(amount1), (_, i) => {
      // prettier-ignore
      const diff =
        // 彩度 (input.saturation → 0 までの量)
        (input.saturation - MIN_SATURATION) +
        // 明度 (input.brightness → 100 までの量)
        (MAX_BRIGHTNESS - input.brightness)
      const step = (diff / (amount1 - 1)) * i
      const s = clamp(
        input.saturation -
          Math.max(0, step - (MAX_BRIGHTNESS - input.brightness)),
        MIN_SATURATION,
        MAX_SATURATION,
      )
      const b = clamp(input.brightness + step, MIN_BRIGHTNESS, MAX_BRIGHTNESS)

      return hsb2hex(input.hue, s, b)
    }),
    color,
    '#ffffff',
  )

  const colors2 = replace(
    Array.from(Array(amount2), (_, i) => {
      // 彩度 (input.saturation → 0 までの量)
      const stepS = ((input.saturation - MIN_SATURATION) / (amount2 - 1)) * i

      // 明度 (input.brightness → 100 までの量)
      const stepB = ((MAX_BRIGHTNESS - input.brightness) / (amount2 - 1)) * i

      const s = clamp(input.saturation - stepS, MIN_BRIGHTNESS, MAX_BRIGHTNESS)
      const b = clamp(input.brightness + stepB, MIN_BRIGHTNESS, MAX_BRIGHTNESS)

      return hsb2hex(input.hue, s, b)
    }),
    color,
    '#ffffff',
  )

  const colors3 = replace(
    Array.from(Array(amount3), (_, i) => {
      // 明度 (input.brightness → 0 までの値)
      const diff = input.brightness - MIN_BRIGHTNESS
      const step = (diff / (amount3 - 1)) * i
      const b = clamp(input.brightness - step, MIN_BRIGHTNESS, MAX_BRIGHTNESS)

      return hsb2hex(input.hue, input.saturation, b)
    }),
    color,
    '#000000',
  )

  return (
    <div className="container mx-auto grid max-h-screen grid-rows-[repeat(2,min-content),1fr] gap-4">
      <header className="flex items-center border-b p-4">
        <h1 className="font-bold">Nice shade</h1>
        <a
          className="ml-auto text-sm"
          href="https://github.com/isoden/nice-shade"
        >
          GitHub
        </a>
      </header>

      <main className="contents">
        <form className="rounded bg-slate-100 p-4">
          <label>
            Select color:
            <input
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </label>

          {/* TODO: design */}
          <button
            type="button"
            onClick={() => {
              const input = window.prompt('Paste color code as hex number')

              // Canceled
              if (input == null) return

              const hex = parseHex(input.trim())

              // Invalid format
              if (!hex) return alert('Invalid format.')

              setColor(hex)
            }}
          >
            Paste color code
          </button>
        </form>

        <div className="grid grid-cols-3 gap-4 overflow-y-auto">
          <div>
            <header className="rounded bg-slate-100 p-4">
              <h2 className="font-bold">Light Tint</h2>
              <label>
                Select amount of shade:
                <input
                  type="range"
                  value={amount1}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  onChange={(event) => setAmount1(event.target.valueAsNumber)}
                />
                <input
                  type="number"
                  value={amount1}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  onChange={(event) => setAmount1(event.target.valueAsNumber)}
                />
              </label>
            </header>
            <Palette colors={colors1} />
          </div>
          <div>
            <header className="rounded bg-slate-100 p-4">
              <h2 className="font-bold">Tint</h2>
              <label>
                Select amount of shade:
                <input
                  type="range"
                  value={amount2}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  onChange={(event) => setAmount2(event.target.valueAsNumber)}
                />
                <input
                  type="number"
                  value={amount2}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  onChange={(event) => setAmount2(event.target.valueAsNumber)}
                />
              </label>
            </header>

            <Palette colors={colors2} />
          </div>
          <div>
            <header className="rounded bg-slate-100 p-4">
              <h2 className="font-bold">Shade</h2>
              <label>
                Select amount of shade:
                <input
                  type="range"
                  value={amount3}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  onChange={(event) => setAmount3(event.target.valueAsNumber)}
                />
                <input
                  type="number"
                  value={amount3}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  onChange={(event) => setAmount3(event.target.valueAsNumber)}
                />
              </label>
            </header>

            <Palette colors={colors3} />
          </div>
        </div>
      </main>
    </div>
  )
}

function clamp(x: number, lower: number, upper: number): number {
  return Math.max(lower, Math.min(x, upper))
}

// FIXME: 色変換時に浮動小数点数の誤差でカラーコードがずれることがあるので、 先頭と末尾は固定値にする。
//        直せたら直したいけど bignumber.js を使う、とかになりそう。
function replace(colors: string[], start: string, stop: string): string[] {
  return colors.with(0, start).with(-1, stop)
}
