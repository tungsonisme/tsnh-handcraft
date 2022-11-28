import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Dropdown from "../components/Dropdown"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Handcraft/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dropdown> = (args) => (
  <div style={{ marginBottom: 60 }}>
    <Dropdown {...args} />
  </div>
)

export const Click = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Click.args = {
  children: "Click me",
  trigger: "click",
  dropdown: (
    <div>
      <div>Dropdown Content</div>
      <div>Dropdown Content</div>
    </div>
  ),
}

export const Hover = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Hover.args = {
  children: "Hover me",
  trigger: "hover",
  dropdown: (
    <div>
      <div>Dropdown Content</div>
      <div>Dropdown Content</div>
    </div>
  ),
}
