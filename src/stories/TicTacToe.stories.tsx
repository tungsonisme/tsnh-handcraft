import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import TicTacToe from "../components/TicTacToe"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Handcraft/TicTacToe",
  component: TicTacToe,
} as ComponentMeta<typeof TicTacToe>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TicTacToe> = (args) => <TicTacToe {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  size: 3,
}
