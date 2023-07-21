import "./AuthenticationForms.scss";

const SignUpForm = ({ signUp, email, password, setEmail, setPassword }) => (
  <div className="form">
    <h3>Create a new account</h3>
    <form onSubmit={signUp}>
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
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Password must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter"
        required
      ></input>
      <button type="submit">Sign Up</button>
    </form>
  </div>
);

export { SignUpForm };
