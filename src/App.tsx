import { useMemo, useState } from 'react'
import { hex2hsb, hsb2hex } from './colors'
import { Box } from './_components/Box'

const MAX_BRIGHTNESS = 100
const MIN_SATURATION = 0

const MIN_AMOUNT = 3
const MAX_AMOUNT = 20

export function App() {
  const [color, setColor] = useState('#003e70')
  const [amount, setAmount] = useState(10)

  const input = useMemo(() => {
    const [h, s, b] = hex2hsb(color)
    return { h, s, b }
  }, [color])

  // prettier-ignore
  const diff =
    // 彩度 (input.s → 0 までの量)
    (input.s - MIN_SATURATION) +
    // 明度 (input.b → 100 までの量)
    (MAX_BRIGHTNESS - input.b)

  const steps = Array.from(Array(amount), (_, i) => (diff / (amount - 1)) * i)

  return (
    <div className="container mx-auto">
      <header className="border-b p-4">
        <h1 className="font-bold">Nice shade</h1>
      </header>

      <main>
        <form className="mt-4 flex flex-col gap-1 rounded bg-slate-100 p-4">
          <label>
            Select color:
            <input
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </label>
          <label>
            Select amount of shade:
            <input
              type="range"
              value={amount}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              onChange={(event) => setAmount(event.target.valueAsNumber)}
            />
            <input
              type="number"
              value={amount}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              onChange={(event) => setAmount(event.target.valueAsNumber)}
            />
          </label>
        </form>

        <ol className="mt-4 flex flex-col">
          {/* FIXME: 色変換時の浮動小数点数の誤差でカラーコードがずれることがあるので、 先頭と末尾は固定値 <Box /> を配置する。
              直せたら直したい。けど bignumber.js を使う、とかになりそう。 */}
          <Box hex="#ffffff" />
          {steps
            .slice(1, -1)
            .map((step) => {
              const h = input.h
              const s = input.s - Math.max(0, step - (MAX_BRIGHTNESS - input.b))
              const b = Math.min(MAX_BRIGHTNESS, input.b + step)
              const hex = hsb2hex(h, s, b)

              return <Box key={hex} hex={hex} />
            })
            .toReversed()}
          <Box hex={color} />
        </ol>
      </main>
    </div>
  )
}
