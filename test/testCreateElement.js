// Test createElement function
test('creates simple element', () => {
  const element = createElement("div", null, "Hello")
  expect(element.type).toBe("div")
  expect(element.props.children[0].type).toBe("TEXT_ELEMENT")
  expect(element.props.children[0].props.nodeValue).toBe("Hello")
})

test('creates element with props', () => {
  const element = createElement("div", { id: "test" }, "Hello")
  expect(element.type).toBe("div")
  expect(element.props.id).toBe("test")
  expect(element.props.children[0].type).toBe("TEXT_ELEMENT")
  expect(element.props.children[0].props.nodeValue).toBe("Hello")
})

test('creates element with multiple children', () => {
  const element = createElement("div", null, "Hello", "World")
  expect(element.type).toBe("div")
  expect(element.props.children[0].type).toBe("TEXT_ELEMENT")
  expect(element.props.children[0].props.nodeValue).toBe("Hello")
  expect(element.props.children[1].type).toBe("TEXT_ELEMENT")
  expect(element.props.children[1].props.nodeValue).toBe("World")
})

test('creates nested elements', () => {
  const child = createElement("span", null, "Child")
  const parent = createElement("div", null, child)
  expect(parent.type).toBe("div")
  expect(parent.props.children).toEqual([child])
  expect(child.type).toBe("span")
})

test('handles null props', () => {
  const element = createElement("div", null, "Hello")
  expect(element.type).toBe("div")
  expect(element.props.children[0].type).toBe("TEXT_ELEMENT")
  expect(element.props.children[0].props.nodeValue).toBe("Hello")
})

console.log("\n🎉 createElement tests completed!")