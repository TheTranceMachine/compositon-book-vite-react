import "./AuthenticationForms.scss";

const SignInForm = ({ signIn, email, password, setEmail, setPassword }) => (
  <div className="form">
    <h3>Log In to your account</h3>
    <form onSubmit={signIn}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
        required
      ></input>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
        required
      ></input>
      <button type="submit">Log In</button>
    </form>
  </div>
);

export { SignInForm };
