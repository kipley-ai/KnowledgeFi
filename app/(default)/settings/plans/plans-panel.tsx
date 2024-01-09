'use client'

import { useState } from 'react'

export default function PlansPanel() {

  const [annual, setAnnual] = useState<boolean>(true)

  return (
    <div className="grow">

      {/* Panel body */}
      <div className="p-6 space-y-6">

        {/* Plans */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-4">Plans</h2>
            <div className="text-sm">This workspace's Basic Plan is set to <strong className="font-medium">$34</strong> per month and will renew on <strong className="font-medium">July 9, 2021</strong>.</div>
          </div>

          {/* Pricing */}
          <div>
            {/* Toggle switch */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-sm text-slate-500 font-medium">Monthly</div>
              <div className="form-switch">
                <input type="checkbox" id="toggle" className="sr-only" checked={annual} onChange={() => setAnnual(!annual)} />
                <label className="bg-slate-400 dark:bg-slate-700" htmlFor="toggle">
                  <span className="bg-white shadow-sm" aria-hidden="true"></span>
                  <span className="sr-only">Pay annually</span>
                </label>
              </div>
              <div className="text-sm text-slate-500 font-medium">Annually <span className="text-emerald-500">(-20%)</span></div>
            </div>
            {/* Pricing tabs */}
            <div className="grid grid-cols-12 gap-6">
              {/* Tab 1 */}
              <div className="relative col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500" aria-hidden="true"></div>
                <div className="px-5 pt-5 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <header className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr from-emerald-500 to-emerald-300 mr-3">
                      <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
                      </svg>
                    </div>
                    <h3 className="text-lg text-slate-800 dark:text-slate-100 font-semibold">Basic</h3>
                  </header>
                  <div className="text-sm mb-2">Ideal for individuals that need a custom solution with custom tools.</div>
                  {/* Price */}
                  <div className="text-slate-800 dark:text-slate-100 font-bold mb-4">
                    <span className="text-2xl">$</span><span className="text-3xl">{annual ? '14' : '19'}</span><span className="text-slate-500 font-medium text-sm">/mo</span>
                  </div>
                  {/* CTA */}
                  <button className="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 w-full">Downgrade</button>
                </div>
                <div className="px-5 pt-4 pb-5">
                  <div className="text-xs text-slate-800 dark:text-slate-100 font-semibold uppercase mb-4">What's included</div>
                  {/* List */}
                  <ul>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Lorem ipsum dolor sit amet</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Quis nostrud exercitation</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Lorem ipsum dolor sit amet</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Quis nostrud exercitation</div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Tab 2 */}
              <div className="relative col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-sky-500" aria-hidden="true"></div>
                <div className="px-5 pt-5 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <header className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr from-sky-500 to-sky-300 mr-3">
                      <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
                      </svg>
                    </div>
                    <h3 className="text-lg text-slate-800 dark:text-slate-100 font-semibold">Standard</h3>
                  </header>
                  <div className="text-sm mb-2">Ideal for individuals that need a custom solution with custom tools.</div>
                  {/* Price */}
                  <div className="text-slate-800 dark:text-slate-100 font-bold mb-4">
                    <span className="text-2xl">$</span><span className="text-3xl">{annual ? '34' : '39'}</span><span className="text-slate-500 font-medium text-sm">/mo</span>
                  </div>
                  {/* CTA */}
                  <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed shadow-none" disabled>
                    <svg className="w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span>Current Plan</span>
                  </button>
                </div>
                <div className="px-5 pt-4 pb-5">
                  <div className="text-xs text-slate-800 dark:text-slate-100 font-semibold uppercase mb-4">What's included</div>
                  {/* List */}
                  <ul>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Lorem ipsum dolor sit amet</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Quis nostrud exercitation</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Lorem ipsum dolor sit amet</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Quis nostrud exercitation</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Lorem ipsum dolor sit amet</div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Tab 3 */}
              <div className="relative col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500" aria-hidden="true"></div>
                <div className="px-5 pt-5 pb-6 border-b border-slate-200 dark:border-slate-700">
                  <header className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full shrink-0 bg-gradient-to-tr from-indigo-500 to-indigo-300 mr-3">
                      <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M12 17a.833.833 0 01-.833-.833 3.333 3.333 0 00-3.334-3.334.833.833 0 110-1.666 3.333 3.333 0 003.334-3.334.833.833 0 111.666 0 3.333 3.333 0 003.334 3.334.833.833 0 110 1.666 3.333 3.333 0 00-3.334 3.334c0 .46-.373.833-.833.833z" />
                      </svg>
                    </div>
                    <h3 className="text-lg text-slate-800 dark:text-slate-100 font-semibold">Plus</h3>
                  </header>
                  <div className="text-sm mb-2">Ideal for individuals that need a custom solution with custom tools.</div>
                  {/* Price */}
                  <div className="text-slate-800 dark:text-slate-100 font-bold mb-4">
                    <span className="text-2xl">$</span><span className="text-3xl">{annual ? '74' : '79'}</span><span className="text-slate-500 font-medium text-sm">/mo</span>
                  </div>
                  {/* CTA */}
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full">Upgrade</button>
                </div>
                <div className="px-5 pt-4 pb-5">
                  <div className="text-xs text-slate-800 dark:text-slate-100 font-semibold uppercase mb-4">What's included</div>
                  {/* List */}
                  <ul>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Lorem ipsum dolor sit amet</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Quis nostrud exercitation</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Lorem ipsum dolor sit amet</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Quis nostrud exercitation</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Lorem ipsum dolor sit amet</div>
                    </li>
                    <li className="flex items-center py-1">
                      <svg className="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                        <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                      </svg>
                      <div className="text-sm">Quis nostrud exercitation</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Sales */}
        <section>
          <div className="px-5 py-3 bg-indigo-50 dark:bg-indigo-500/30 border border-indigo-100 dark:border-transparent rounded-sm text-center xl:text-left xl:flex xl:flex-wrap xl:justify-between xl:items-center">
            <div className="text-slate-800 dark:text-slate-100 font-semibold mb-2 xl:mb-0">Looking for different configurations?</div>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">Contact Sales</button>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <div className="my-8">
            <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold">FAQs</h2>
          </div>
          <ul className="space-y-5">
            <li>
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                What is the difference between the three versions?
              </div>
              <div className="text-sm">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
              </div>
            </li>
            <li>
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                Is there any difference between Basic and Plus licenses?
              </div>
              <div className="text-sm">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </div>
            </li>
            <li>
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                Got more questions?
              </div>
              <div className="text-sm">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum in voluptate velit esse cillum dolore eu fugiat <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">contact us</a>.
              </div>
            </li>
          </ul>
        </section>

      </div>

      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
          <div className="flex self-end">
            <button className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">Cancel</button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Save Changes</button>
          </div>
        </div>
      </footer>

    </div>
  )
}