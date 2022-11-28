import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Table, { Column } from "../components/Table"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Handcraft/Table",
  component: Table,
} as ComponentMeta<typeof Table>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

interface IHuman {
  name: string
  age: number
  job: string
}

const columns: Column<IHuman>[] = [
  {
    title: "Name",
    width: 150,
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 100,
    render: (age: number) => <div>{age} year olds</div>,
  },
  {
    title: "Job",
    width: 300,
    render: (human: IHuman) => human.job,
  },
]

const dataSource: IHuman[] = [
  {
    name: "Sean",
    age: 27,
    job: "Engineer",
  },
  {
    name: "Hannah",
    age: 27,
    job: "Seller",
  },
  {
    name: "Sean",
    age: 27,
    job: "Engineer",
  },
  {
    name: "Hannah",
    age: 27,
    job: "Seller",
  },
]

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  columns,
  dataSource,
}

export const StickyHeader = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
StickyHeader.args = {
  columns,
  dataSource,
  stickyHeader: 50,
}

const fixedLeftColumns: Column<IHuman>[] = [
  {
    title: "Name",
    width: 150,
    fixed: "left",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    fixed: "left",
    width: 100,
    render: (age: number) => <div>{age} year olds</div>,
  },
  {
    title: "Job",
    width: 3000,
    render: (human: IHuman) => human.job,
  },
]

export const FixedLeft = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FixedLeft.args = {
  columns: fixedLeftColumns,
  dataSource,
}
