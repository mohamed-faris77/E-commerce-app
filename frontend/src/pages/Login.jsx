// pages/Login.jsx
function Login() {
return (
<div className="max-w-md mx-auto p-6 border rounded-2xl shadow">
<h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
<input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
<input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" />
<button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Login</button>
</div>
);
}


export default Login;