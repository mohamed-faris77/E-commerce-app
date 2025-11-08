// pages/Register.jsx
function Register() {
return (
<div className="max-w-md mx-auto p-6 border rounded-2xl shadow">
<h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
<input type="text" placeholder="Full Name" className="w-full mb-3 p-2 border rounded" />
<input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
<input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" />
<button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Register</button>
</div>
);
}


export default Register;