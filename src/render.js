// Import from concurrent module
import { nextUnitOfWork, wipRoot, currentRoot } from './concurrent.js'

// Replace your current render function
function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        },
    }
    nextUnitOfWork = wipRoot
}

export { render }