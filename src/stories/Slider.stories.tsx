import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Slider from "../components/Slider"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Handcraft/Slider",
  component: Slider,
} as ComponentMeta<typeof Slider>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  min: 0,
  max: 100,
}
