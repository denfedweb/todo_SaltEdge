import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "./Todo";
import "@testing-library/jest-dom/extend-expect";

test("adds a new to-do, and remove one todo", () => {
  defineProperty()
  const { getByTestId, getAllByTestId } = render(<Todo />);
  const input = getByTestId("inputAddTodo");
  fireEvent.change(input, { target: { value: "Test" } });
  fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
  fireEvent.change(input, { target: { value: "Test2" } });
  fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
  const todoBlock = getByTestId("todos");
  const todos = todoBlock.querySelector('ul');
  expect(todos.children.length).toBe(2);
  const deleteButton = getAllByTestId("delete-button");
  const first = deleteButton[0];
  fireEvent.click(first);
  expect(todos.children.length).toBe(1);
});

function defineProperty() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}