
### Level of Abstractions
Browser Engine --DOM API, Web APIs--> JS runtime --language features--> React --Virtual DOM, Components --> Your Code

### DOM
- Document Object Model
- Webpage represented as a tree
- Provided by browser via the document api
- each node on the tree can be manipulated via things like document.getElementById()

#### Element Structure
every react element has the following structure
{
  type: string | function,  // DOM tag name or component function
  props: {
    [attribute]: value,     // All JSX attributes
    children: any[]         // Special prop for nested content
  }
}

exmaples: 
// Simple element
<div id="foo">bar</div>

{
  type: "div",
  props: {
    id: "foo",
    children: "bar"
  }
}

// Nested elements
<div>
  <span>Hello</span>
  <span>World</span>
</div>

{
  type: "div", 
  props: {
    children: [
      { type: "span", props: { children: "Hello" } },
      { type: "span", props: { children: "World" } }
    ]
  }
}

### Virtual DOM
- a js object
- a representation of the physical dom
===============================================================================================

# what is react

react is a view layer library that does one thing - udpate DOM whenever state change

react is a state-to-DOM synchronization engine 


# how does react to do that

we need to update DOM -> interacting with DOM is expensive

state change -> react updates vertual DOM ---diffing algorithm----> minimally updates DOM -> fast


# the nice to haves 

## JSX
- syntactic sugar
- allows HTML & js to be written and compiles in the same file
- <h1 title="foo">Hello</h1> -> not HTML but actually js ---Babel---> React.createElement("h1", { title: "foo" }, "Hello")

## Components
- functions that return JSX
- features
    - props
    - state [whenever state changes, the component is rerendered]

## Reconciliation
the update process
    - diffing algorithms find out element changes
    - decides what DOM operations to perform
    - Schedule when to apply batch update 

## Fiber 
the work scheduler
    - breaks work into small units
    - can pause/resume rendering
    - prioritizes urgent update (user input > animations > data fetching)
    - prevents blocking the main thread [makes react concurrent]

### Root Structure
The entire thing is a huge fiber that has sub fibers

wipRoot = {
    type: undefined,          // Root has no type (it's just a container)
    dom: container,           // The actual DOM container element
    props: {
        children: [element],  // Array with your React element
    },
    parent: null,             // Root has no parent
    child: firstChildFiber,   // First child fiber [sub fibers store here]
    sibling: null,            // Root has no siblings
}

### Fiber Structure
{
    type: "div",           // Element type
    props: {...},          // Element props
    dom: null,             // DOM node (created during work)
    parent: parentFiber,   // Tree navigation
    child: childFiber,     // Tree navigation
    sibling: siblingFiber  // Tree navigation
}


## Event system
- React doesn't attach event listeners to every element
    - it uses evetn delegation instead - one listener on the root element
    - wraps native events in SyntheticEvents for cross-browser consistency
    - more efficient

# How It All Works Together

1. User clicks button → Event captured by delegated listener

2. Event handler runs → Updates component state with setState or hook

3. State change triggers re-render → Component function runs again

4. New Virtual DOM created → JSX returns new element tree
   ├─ Component function executes
   ├─ JSX ----> createElement calls                                              [Babel]
   ├─ createElement call ---> virtual DOM element object                         [createElement()]
   └─ Virtual DOM tree assembled

5. Diffing algorithm runs → Compares old vs new virtual DOM (skipped for first render)
   ├─ Walk both trees simultaneously
   ├─ Compare element types and props
   ├─ Identify what actually changed
   └─ Generate minimal update plan

6. DOM updates applied → Only changed elements updated in real DOM
   ├─ Find existing DOM nodes
   ├─ Apply only the differences                    
   ├─ virtual DOM element object ---> real DOM nodes ---> attach to actual DOM   [render()]                        
   └─ Preserve unchanged DOM structure

7. Browser repaints → User sees the change


# Building Blocks

1. createElement: takes JSX elements and spits out virtual dom element, which will gets assemble into the tree
2. render: takes virtual DOM node, turns it into actual DOM node and attach it to the actual DOM
3.   module : work scheduler to prevent blocking execution
    - Concept
        - Traditional (Blocking): [Render Everything] → [User Input Blocked] → [Complete]
        - Concurrent (Non-blocking): [Chunk 1] → [User Input] → [Chunk 2] → [User Input] → [Chunk 3] → [Complete]
        - Scheduling: Browser Idle → Process Work Chunk → Check Time → Yield or Continue
    - Implementation
        -- **render()** triggers assign tasks tow workLoop
        - **requestIdleCallback** monitors main stream, when free calls our callback function **workLoop()** with a deadline, during the time window workLoop would start to consume the task stack
        - **workLoop()** 
            - trigers **performWork()** to convert virtual DOM element to actual DOM element bit by bit, until deadline
            - break the task down to small & unified blocks of work called **fiber**
        - **performWork()**
            - Fiberization : breaks the task down to small & unified blocks of work called **fiber**
            - DOM Creating : create actual DOM structure for each virtual DOM element
            - Next Fiber Seeking : recursively seek the next fiber to be process and return[priority: child > sibling > parent]