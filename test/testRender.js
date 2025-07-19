
test('renders simple element', () => {
    const element = createElement("h1", null, "Hello")
    const container = document.createElement('div')
    
    render(element, container)
    
    expect(container.innerHTML).toBe("<h1>Hello</h1>")
})

test('renders element with props', () => {
    const element = createElement("div", { id: "test" }, "Hello")
    const container = document.createElement('div')
    
    render(element, container)
    
    expect(container.innerHTML).toBe('<div id="test">Hello</div>')
})

test('renders nested elements', () => {
    const element = createElement("div", null, 
        createElement("h1", null, "Hello"),
        createElement("p", null, "World")
    )
    const container = document.createElement('div')
    
    render(element, container)
    
    expect(container.innerHTML).toBe("<div><h1>Hello</h1><p>World</p></div>")
})

console.log("\n🎉 render tests completed!")
