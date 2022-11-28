import React from "react"
import Carousel from "../Carousel"
import Slider from "../Slider"

const App: React.FC = () => {
  const [slider, setSlider] = React.useState(50)
  return (
    <div style={{ padding: 24 }}>
      <Slider value={slider} onChange={setSlider} min={0} max={100} />
      <div style={{ marginBottom: 24 }}>Slider Value: {slider}</div>

      <Carousel
        contents={[
          { key: "A", content: <div style={{ background: "blue" }} /> },
          { key: "B", content: <div style={{ background: "yellow" }} /> },
          { key: "C", content: <div style={{ background: "orange" }} /> },
        ]}
      />
    </div>
  )
}

export default App
