import React from "react"
import Slider from "../Slider"

const App: React.FC = () => {
  const [slider, setSlider] = React.useState(50)
  return (
    <div style={{ padding: 24 }}>
      <Slider value={slider} onChange={setSlider} min={0} max={100} />
      <div>Slider Value: {slider}</div>
    </div>
  )
}

export default App
