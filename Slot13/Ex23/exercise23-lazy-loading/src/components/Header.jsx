function Header() {
  return (
    <header className="site-header">
      <div className="nav-container">
        <div className="logo">Lazy Loading</div>

        <nav className="navbar">
          <a href="#users">Users</a>
          <a href="#posts">Posts</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;