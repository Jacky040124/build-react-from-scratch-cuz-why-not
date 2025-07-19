
// FIBER STRUCTURE
// {
//     type: "div",           // Element type
//     props: {...},          // Element props
//     dom: null,             // DOM node (created during work)
//     parent: parentFiber,   // Tree navigation
//     child: childFiber,     // Tree navigation
//     sibling: siblingFiber  // Tree navigation
// }

let nextUnitOfWork = null;    // the next unit of work to be performed
let wipRoot = null;           // working root [gets clear each commit]
let currentRoot = null;       // root storage [gets updated each commit]

// workLoop is called with a deadline whenever the browser is free, works bit by bit during that deadline
function workLoop(deadline) {
  let shouldYield = false;

  // work until no work or out or time
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // commits change each loop
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  // browser api : monitors main thread -> detect if idle -> if so call my callback (workLoop)
  requestIdleCallback(workLoop);
}

// performs the current unit of work & returns the next unit of work to be performed
// fiber : the smallest work unit we could perform
// the fiberizaiotn and dom creation is the entirety of the work 
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  // takes all of fibre's children [virtual dom elements]
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  // fiberise the children of the fiber
  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      // create new fiber
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    // build the fiber tree structure
    if (index == 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  // recursively seek the next fiber to be process and return[priority: child > sibling > parent]

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }

  // return null if no remaining work 
  return null;
}



// commit change to wipRoot -> update currentRoot -> clear wipRoot
function commitRoot() {
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

// recursively sync work from wip root to current root
function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  // Find parent DOM node
  const domParent = fiber.parent.dom;

  // Append this fiber's DOM to parent
  domParent.appendChild(fiber.dom);

  // Recursively commit children and siblings
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

// helper : initialise fiber's corresponding dom
function createDom(fiber) {
    const dom = fiber.type == "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(fiber.type)

    Object.keys(fiber.props)
        .filter(key => key !== "children")
        .forEach(name => {
            dom[name] = fiber.props[name];
        })
    
    return dom
}

export { 
    nextUnitOfWork, 
    wipRoot, 
    currentRoot,
    workLoop, 
    performUnitOfWork,
    commitRoot,
    commitWork,
    createDom 
}


