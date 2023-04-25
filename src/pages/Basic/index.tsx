import { useRef } from "react"

const BasicPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className="full-width full-height" ref={ref}></div>
  )
}

export default BasicPage
