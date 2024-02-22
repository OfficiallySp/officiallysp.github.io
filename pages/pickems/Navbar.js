// Navbar component
const Navbar = () => {
  return `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>League of Legends Tournament Pick'ems</h1>
      <nav>
        <ul style="list-style: none; display: flex;">
          <li style="margin-right: 20px;"><a href="#" style="text-decoration: none; color: #ffffff;">Home</a></li>
          <li style="margin-right: 20px;"><a href="#" style="text-decoration: none; color: #ffffff;">Tournament</a></li>
          <li><a href="#" style="text-decoration: none; color: #ffffff;">About</a></li>
        </ul>
      </nav>
    </div>
  `;
};

export default Navbar;
