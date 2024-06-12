export function renderLoggedOutHeader() {
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <ul>
      <li id="loginButton" data-cy="loginButton">Login</li>
      <li id="registerButton" data-cy="registerButton">Register</li>
      <li id="homeButton" data-cy="homeButton">Home</li>
    </ul>
  `;
  return nav;
}

export function renderLoggedInHeader() {
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <ul>
      <li id="logoutButton" data-cy="logoutButton">Logout</li>
      <li id="homeButton" data-cy="homeButton">Home</li>
      <li id="bookButton" data-cy="bookButton">Book A Room</li>
    </ul>
  `;
  return nav;
}
