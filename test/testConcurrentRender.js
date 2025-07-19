
// Test for Concurrent Mode (Step III)
import { render } from '../src/render.js'
import { createElement } from '../src/createElement.js'

test('concurrent render sets up work loop', () => {
    const element = createElement("h1", null, "Hello")
    const container = document.createElement('div')
    
    render(element, container)
    
    // Check that render doesn't immediately update DOM (concurrent behavior)
    expect(container.innerHTML).toBe("")
    
    // The DOM should be updated after work loop processes
    // We'll check this in the next test
})

test('concurrent render eventually updates DOM', (done) => {
    const element = createElement("div", { id: "test" }, 
        createElement("h1", null, "Hello"),
        createElement("p", null, "World")
    )
    const container = document.createElement('div')
    
    render(element, container)
    
    // Wait for work loop to complete and DOM to be updated
    setTimeout(() => {
        expect(container.innerHTML).toBe('<div id="test"><h1>Hello</h1><p>World</p></div>')
        done()
    }, 100)
})

test('concurrent render is non-blocking', () => {
    const element = createElement("div", null, "Test")
    const container = document.createElement('div')
    
    const startTime = Date.now()
    render(element, container)
    const endTime = Date.now()
    
    // Render should return immediately (not block)
    expect(endTime - startTime).toBeLessThan(10)
    
    // DOM should be empty initially (work not complete yet)
    expect(container.innerHTML).toBe("")
})

console.log("\n🎉 concurrent render tests completed!")
