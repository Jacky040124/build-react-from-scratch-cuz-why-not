// taking virtual DOM element -> create real DOM element -> attach to the actual DOM

// element : Virtual DOM object from createElement()
// container : Real DOM element to attach to
// Object : a built in JS objects (like Array, String)


// Real DOM element (what 'dom' becomes)
// {
//     tagName: "DIV",
//     id: "foo",           // ← Set by our code
//     className: "bar",    // ← Set by our code
//     innerHTML: "",
//     children: [...],
//      ... hundreds of other properties
// }

function render(element, container) {

    // node creation
    const dom = element.type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(element.type)

    // assign props to node 
    Object.keys(element.props)            // extract keys of props
      .filter((key) => key !== "children")  // filters out children
      .forEach((name) => {                // copies virtual DOM KV to actual DOM KV
        dom[name] = element.props[name];
      });

    // text element value assignment
    if (element.type === "TEXT_ELEMENT") {
        dom.nodeValue = element.props.nodeValue
    }

    // recursively render children
    element.props.children.forEach(child => {
        render(child,dom)
    })

    // attach to container
    container.appendChild(dom)
}