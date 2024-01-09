'use client'

import DoughnutChart from '@/components/charts/doughnut-chart'

// Import utilities
import { tailwindConfig } from '@/components/utils/utils'

export default function AnalyticsCard08() {

  const chartData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        label: 'Sessions By Device',
        data: [
          12, 50, 38,
        ],
        backgroundColor: [
          tailwindConfig.theme.colors.indigo[500],
          tailwindConfig.theme.colors.sky[400],
          tailwindConfig.theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig.theme.colors.indigo[600],
          tailwindConfig.theme.colors.sky[500],
          tailwindConfig.theme.colors.indigo[900],
        ],
        borderWidth: 0,
      },
    ],
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Sessions By Device</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  )
}
