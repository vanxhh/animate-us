'use client'

import { FC, SetStateAction, useState } from 'react'
import { useDraw } from '../hooks/useDraw'
import { ChromePicker } from 'react-color'

export default function Home() {
  const [color, setColor] = useState<string>('#000')
  const [width, setWidth] = useState<number>(5)
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = width

    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 10, 0, 2 * Math.PI)
    ctx.fill()
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-10 pr-10'>
        <ChromePicker color={color} onChange={(e: { hex: SetStateAction<string> }) => setColor(e.hex)} />
        <div>Width
          <input
            className='border border-black rounded-md p-2'
            name={"width"}
            defaultValue={width}
            onChange={e => setWidth(parseInt(e.target.value))}
          />
        </div>
        <button type='button' className='p-2 rounded-md border border-black' onClick={clear}>
          Clear canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={400}
        height={400}
        className='border border-black rounded-md'
      />
    </div>
  )
}
