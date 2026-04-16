import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../../types"
import { useEffect, useState } from "preact/hooks"

const STORAGE_KEY = "cash-amount"

const CashTracker: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
    const pageTitle = "Current Funds"
    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const baseDir = url.pathname

    const [cash, setCash] = useState(0)

    // load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            setCash(parseInt(stored, 10))
        }
    }, [])

    // persist on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, cash.toString())
    }, [cash])

    const changeCash = (delta: number) => {
        setCash(prev => prev + delta)
    }

    const setExactCash = () => {
        const input = prompt("Set exact cash amount:")
        if (input === null) return

        const value = parseInt(input, 10)
        if (!isNaN(value)) {
            setCash(value)
        }
    }

    return (
        <article class="popover-hint text-center mt-16">
            <h1>💰 {pageTitle}</h1>

            <div style="font-size: 28px; margin: 12px 0;">
                {cash} GP
            </div>

            <div style="display: flex; gap: 8px; justify-content: center;">
                <button onClick={() => changeCash(10)}>+10</button>
                <button onClick={() => changeCash(-10)}>-10</button>
                <button onClick={setExactCash}>Set</button>
            </div>

            <div style="margin-top: 16px;">
                <a href={baseDir}>Back to home</a>
            </div>
        </article>
    )
}

export default (() => CashTracker) satisfies QuartzComponentConstructor