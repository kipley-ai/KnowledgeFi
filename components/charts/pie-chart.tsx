'use client'

import { useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import { chartColors } from '@/components/charts/chartjs-config'
import '@/components/charts/chartjs-config'
import {
  Chart, PieController, ArcElement, TimeScale, Tooltip,
} from 'chart.js'
import type { ChartData } from 'chart.js'
import 'chartjs-adapter-moment'

// Import utilities
import { tailwindConfig } from '@/components/utils/utils'

Chart.register(PieController, ArcElement, TimeScale, Tooltip)
Chart.overrides.doughnut.cutout = '80%'

interface DoughnutProps {
  data: ChartData
  width: number
  height: number
}

export default function DoughnutChart({
  data,
  width,
  height
}: DoughnutProps) {

  const [chart, setChart] = useState<Chart | null>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const legend = useRef<HTMLUListElement>(null)
  const { theme } = useTheme()
  const darkMode = theme === 'dark'
  const { tooltipTitleColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors  

  useEffect(() => {    
    const ctx = canvas.current
    if (!ctx) return
    
    const newChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        layout: {
          padding: {
            top: 4,
            bottom: 4,
            left: 24,
            right: 24,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleColor: darkMode ? tooltipTitleColor.dark : tooltipTitleColor.light,
            bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
            borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
          },          
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 200,
        },
        maintainAspectRatio: false,
      },
      plugins: [
        {
          id: 'htmlLegend',
          afterUpdate(c, args, options) {
            const ul = legend.current
            if (!ul) return
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove()
            }
            // Reuse the built-in legendItems generator
            const items = c.options.plugins?.legend?.labels?.generateLabels?.(c)
            items?.forEach((item) => {
              const li = document.createElement('li')
              li.style.margin = tailwindConfig.theme.margin[1.5]
              // Button element
              const button = document.createElement('button')
              button.style.display = 'inline-flex'
              button.style.alignItems = 'center'
              button.style.opacity = item.hidden ? '.3' : ''
              button.onclick = () => {
                c.toggleDataVisibility(item.index!)
                c.update()
              }
              // Color box
              const box = document.createElement('span')
              box.style.display = 'block'
              box.style.width = tailwindConfig.theme.width[3]
              box.style.height = tailwindConfig.theme.height[3]
              box.style.borderRadius = tailwindConfig.theme.borderRadius.full
              box.style.marginRight = tailwindConfig.theme.margin[1.5]
              box.style.borderWidth = '3px'
              box.style.borderColor = item.fillStyle as string
              box.style.pointerEvents = 'none'
              // Label
              const label = document.createElement('span')
              label.classList.add('text-slate-500', 'dark:text-slate-400')
              label.style.fontSize = tailwindConfig.theme.fontSize.sm[0]
              label.style.lineHeight = tailwindConfig.theme.fontSize.sm[1].lineHeight
              const labelText = document.createTextNode(item.text)
              label.appendChild(labelText)
              li.appendChild(button)
              button.appendChild(box)
              button.appendChild(label)
              ul.appendChild(li)
            })
          },
        },
      ],
    })
    setChart(newChart)
    return () => newChart.destroy()
  }, [])

  useEffect(() => {
    if (!chart) return

    if (darkMode) {
      chart.options.plugins!.tooltip!.titleColor = tooltipTitleColor.dark
      chart.options.plugins!.tooltip!.bodyColor = tooltipBodyColor.dark
      chart.options.plugins!.tooltip!.backgroundColor = tooltipBgColor.dark
      chart.options.plugins!.tooltip!.borderColor = tooltipBorderColor.dark
    } else {
      chart.options.plugins!.tooltip!.titleColor = tooltipTitleColor.light
      chart.options.plugins!.tooltip!.bodyColor = tooltipBodyColor.light
      chart.options.plugins!.tooltip!.backgroundColor = tooltipBgColor.light
      chart.options.plugins!.tooltip!.borderColor = tooltipBorderColor.light
    }
    chart.update('none')
  }, [theme])    

  return (
    <div className="grow flex flex-col justify-center">
      <div>
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
      <div className="px-5 py-4">
        <ul ref={legend} className="flex flex-wrap justify-center -m-1" />
      </div>
    </div>
  )
}