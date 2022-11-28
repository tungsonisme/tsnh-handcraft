import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Carousel from "../components/Carousel"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Handcraft/Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  contents: [
    { key: "a", content: <div style={{ background: "red" }} /> },
    { key: "b", content: <div style={{ background: "green" }} /> },
    { key: "c", content: <div style={{ background: "yellow" }} /> },
  ],
}
