import React from "react"
import Carousel from "../Carousel"
import Dropdown from "../Dropdown"
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
          { key: "B", content: <div style={{ background: "green" }} /> },
          { key: "C", content: <div style={{ background: "orange" }} /> },
        ]}
      />

      <div style={{ marginTop: 24 }}>
        <Dropdown
          dropdown={
            <div>
              <div>Dropdown Content</div>
              <div>Dropdown Content</div>
              <div>Dropdown Content</div>
            </div>
          }
        >
          Click Dropdown
        </Dropdown>
      </div>

      <div style={{ marginTop: 6 }}>
        <Dropdown
          dropdown={
            <div>
              <div>Dropdown Content</div>
              <div>Dropdown Content</div>
              <div>Dropdown Content</div>
            </div>
          }
          trigger="hover"
        >
          Hover Dropdown
        </Dropdown>
      </div>
    </div>
  )
}

export default App
