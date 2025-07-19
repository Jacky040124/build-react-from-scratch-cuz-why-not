# React Overview - Building From Scratch

## React Core Architecture

### 1. Virtual DOM
- JavaScript representation of the actual DOM
- Enables efficient updates through diffing algorithm
- Reconciliation process compares old and new virtual DOM trees

### 2. Components
- **Function Components**: Simple functions that return JSX
- **Class Components**: ES6 classes with lifecycle methods (less common now)
- Components accept `props` (read-only) and manage `state` (mutable)

### 3. JSX (JavaScript XML)
- Syntax extension that looks like HTML
- Transpiles to `React.createElement()` calls
- Example: `<div>Hello</div>` → `React.createElement('div', null, 'Hello')`

### 4. Hooks (Modern React)
- `useState`: Local component state
- `useEffect`: Side effects and lifecycle
- `useContext`: Access context values
- `useReducer`: Complex state logic
- `useMemo`/`useCallback`: Performance optimizations
- `useRef`: Persist values/DOM references

### 5. Reconciliation & Fiber
- **Reconciliation**: Algorithm to update DOM efficiently
- **Fiber**: React's reimplementation of core algorithm (incremental rendering)
- Key concepts: work units, priority scheduling, interruptible rendering

### 6. Event System
- Synthetic events (cross-browser wrapper)
- Event delegation (attaches to root)
- Event pooling (performance optimization)

### 7. Context API
- Pass data through component tree without props
- Provider/Consumer pattern

### 8. Component Lifecycle
- Mounting: component first renders
- Updating: props/state change
- Unmounting: component removed

## Weekend Build Plan

### Essential features to implement:
1. `createElement()` - Build virtual DOM nodes
2. `render()` - Mount to real DOM
3. Basic diffing algorithm
4. Function components with props
5. `useState` hook
6. `useEffect` hook
7. Event handling

### Skip for now:
- Class components
- Complex optimizations
- Concurrent features
- Server-side rendering
- Advanced hooks
- Error boundaries

## Implementation Timeline

**Day 1**: Virtual DOM, JSX transpilation, basic rendering
**Day 2**: Component lifecycle, state management, event handling, basic hooks