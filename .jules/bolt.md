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

## 2024-05-26 - Thrashing from Inline Components in Interval Loops
**Learning:** Mapping over an array to render complex components directly inside a parent component that updates state via a high-frequency `setInterval` (like `clawX` updating every 20ms during a drop animation) causes severe re-render thrashing. Even if child components like `PlushieAvatar` are memoized, passing them as children to a non-memoized inline wrapper `div` forces the wrapper to be re-created and the memoization to be evaluated every tick.
**Action:**
- Always extract wrapper DOM nodes (like positional `div` containers in absolute layouts) into their own `React.memo`-ized functional components.
- Pass stable `useCallback` functions to these memoized wrappers to prevent breaking referential equality.
- Use `useMemo` for static or semi-static lists (like a roster grid) that don't need to re-render during unrelated state animations.
