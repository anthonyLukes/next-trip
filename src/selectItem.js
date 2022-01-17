import {render, fireEvent, waitFor, screen} from '@testing-library/react'

const KEY_DOWN = 40

// Select an item from a React Select dropdown given a label and
// choice label you wish to pick.
export async function selectItem(
  container,
  label,
  choice
) {
  // Focus and enable the dropdown of options.
  fireEvent.focus(screen.getByLabelText(container, label))
  fireEvent.keyDown(screen.getByLabelText(container, label), {
    keyCode: KEY_DOWN,
  })

  // Wait for the dropdown of options to be drawn.
  await screen.findByText(container, choice)

  // Select the item we care about.
  fireEvent.click(screen.getByText(container, choice))

  // Wait for your choice to be set as the input value.
  await screen.findByDisplayValue(container, choice)
}
