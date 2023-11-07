export default function FilterButton(props: {
  name: string;
  isPressed: boolean;
  setFilter: (filter: string) => void;
}) {
  const { name, isPressed, setFilter } = props;
  return (
    <button
      type="button"
      className="toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span>{name}</span>
    </button>
  );
}
