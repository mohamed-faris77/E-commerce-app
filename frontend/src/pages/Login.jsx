const Login = () => (
  <div className="max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
    <form className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border rounded"
      />
      <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  </div>
);

export default Login;
