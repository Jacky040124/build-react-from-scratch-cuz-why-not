// {
//     type: "div",
//     props: {
//         id: "foo"
//         children: [
//             "Hello", 
//             {type: "span", props: {children: "World"}}
//         ]
//     }
// }

// createElement : takes createElement call and spit out vritual dom element

// handles JSX elements
// ... rest parameters collects all remaining elements into an array called children
function createElement(type, props, ...children) {
    return {
      type: type,
      props: {
        ...(props || {}),
        children: children.map(child => 
            typeof child == "object"
                ? child
                : createTextElement(child)
        ),
      },
    };
}

// handles plain text (needs special handing since do not have DOM attributes)
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}