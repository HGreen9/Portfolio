import { useState } from 'preact/hooks';

export default function Tabs({ items, defaultTab }) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.key);

  return (
    <div>
      <div class="tabs">
        {items.map(item => (
          <button
            class={item.key === active ? 'active' : ''}
            onClick={() => setActive(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map(item => (
        <div
          class="panel"
          role="tabpanel"
          aria-hidden={item.key !== active}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}