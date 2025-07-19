
// Test for Concurrent Mode (Step III)

test('concurrent render sets up work loop', () => {
    const element = window.createElement("h1", null, "Hello")
    const container = document.createElement('div')
    
    window.render(element, container)
    
    // Check that render doesn't immediately update DOM (concurrent behavior)
    expect(container.innerHTML).toBe("")
    
    // The DOM should be updated after work loop processes
    // We'll check this in the next test
})



test('concurrent render is non-blocking', () => {
    const element = window.createElement("div", null, "Test")
    const container = document.createElement('div')
    
    const startTime = Date.now()
    window.render(element, container)
    const endTime = Date.now()
    
    // Render should return immediately (not block)
    expect(endTime - startTime).toBeLessThan(10)
    
    // DOM should be empty initially (work not complete yet)
    expect(container.innerHTML).toBe("")
})

console.log("\n🎉 concurrent render tests completed!")
