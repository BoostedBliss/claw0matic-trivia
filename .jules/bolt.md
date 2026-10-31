## 2024-05-24 - Unused Props Defeating React Optimizations
**Learning:** In a highly interactive app (like this one where simulated bot players cause frequent state updates), passing a rapidly changing prop (like `players` in `App.tsx`) down to a component that doesn't actually use it (like `DiscordChatFeed`) forces unnecessary and expensive re-renders. The parent's state changes constantly, triggering children to render, even if the child only displays separate state (like `messages`).

**Action:**
- Always audit component props and remove unused ones, especially objects or arrays that change frequently.
- Use `React.memo` for list or feed components that only need to update when their specific data (e.g., `messages`) changes.
- Ensure that callback functions passed to memoized components are wrapped in `useCallback` to maintain referential equality across renders, otherwise `React.memo` will still think the props changed.

## 2024-05-25 - Rapid Parent State Updates Re-rendering Expensive Children
**Learning:** Animations implemented in React using `setInterval` or `requestAnimationFrame` that update a parent component's state (e.g., `clawX` in `ClawMachine`) will trigger re-renders for all child components at 50+ FPS. If the child components are computationally expensive (like `PlushieAvatar` with complex DOM/SVG trees) and are rendered in large numbers, this causes significant jank and lag, even if the child's props haven't actually changed.
**Action:**
- Whenever a parent component has a high-frequency animation state (like a drag or drop coordinate), carefully audit its child components.
- Heavily utilize `React.memo` for any visually complex child components rendered within the animating parent to ensure they skip re-rendering if their specific props (like `host` or `emotion`) haven't changed.

## 2024-05-26 - Missing Memoization and Unstable Callback References for Heavy Child Components
**Learning:** Even if a parent state update doesn't visually affect a specific child component, React will re-render all children by default. If a child component (like `ClawMachine`) contains animations or computationally heavy operations and is not wrapped in `React.memo`, those re-renders become expensive. Furthermore, if the child relies on callback props from the parent (like `handleHostSelected`), those callbacks must be wrapped in `useCallback` to maintain referential equality, otherwise `React.memo` is defeated because the function prop is re-created on every parent render.
**Action:**
- Wrap expensive or animating child components (like `ClawMachine`) in `React.memo()`.
- Audit parent components (like `App.tsx`) to ensure all functions passed as props to memoized children are wrapped in `useCallback`. Include necessary dependencies in the dependency array (like `[difficulty]` in `App.tsx` for `fetch`).
