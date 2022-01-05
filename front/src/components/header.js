function Header({ components, onSetViewBlock }) {
  return (
    <div className="header">
      <button
        type="button"
        key={components[0]}
        onClick={() => onSetViewBlock(components[0])}
      >
        Article
      </button>
      <button
        type="button"
        key={components[1]}
        onClick={() => onSetViewBlock(components[1])}
      >
        Add Article
      </button>
      <button
        type="button"
        key={components[2]}
        onClick={() => onSetViewBlock(components[2])}
      >
        Profile
      </button>
    </div>
  );
}
export default Header;
