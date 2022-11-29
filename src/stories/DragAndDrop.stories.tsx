import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import DragAndDrop from "../components/DragAndDrop"
import { DnDList } from "../components/DragAndDrop/types"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Handcraft/DragAndDrop",
  component: DragAndDrop,
} as ComponentMeta<typeof DragAndDrop>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DragAndDrop> = (...args) => {
  const Component: React.FC<{ list: DnDList }> = () => {
    const [list, setList] = React.useState(
      new Array(5).fill(0).map((_, index) => ({
        key: (index + 1).toString(),
        content: (
          <div style={{ padding: 8, marginBottom: 8, border: "1px solid black" }}>
            Item {index + 1}
          </div>
        ),
      }))
    )
    return <DragAndDrop list={list} onDragEnd={setList} />
  }

  return <Component {...args} />
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  list: [],
}
