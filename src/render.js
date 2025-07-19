function render(element, container) {
    window.wipRoot = {
        dom: container,
        props: {
            children: [element],
        },
    }
    window.nextUnitOfWork = window.wipRoot
    
    // Start the work loop
    requestIdleCallback(workLoop);
}

// Add to global scope
window.render = render;