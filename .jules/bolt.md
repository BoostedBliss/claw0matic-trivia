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

## 2024-05-26 - O(N) Array Searches Inside High-Frequency Render Loops
**Learning:** Performing array searches (e.g., `Array.find`) inside the render loop of a component with high-frequency state updates (like an animation updating at 50fps) can cause severe performance bottlenecks, especially when the search is performed multiple times per render (e.g., inside a `.map`). Even with memoized child components, the CPU overhead of repeatedly searching the array in the parent component before passing props will cause lag.

**Action:**
- Always pre-compute and memoize O(1) lookup data structures (like Maps or object dictionaries) for static data arrays that need to be queried during render.
- Replace O(N) `Array.find` or `Array.filter` calls inside high-frequency render loops with O(1) hash map lookups.
