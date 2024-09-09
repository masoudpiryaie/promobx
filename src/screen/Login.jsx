import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import formStore from '../store/formStore';
import axios from 'axios';

const Login = observer(() => {
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formStore.username.trim()) {
            newErrors.username = 'نام ضروری است';
        }

        if (!formStore.email.trim()) {
            newErrors.email = 'ایمیل ضروری است';
        } else if (!/\S+@\S+\.\S+/.test(formStore.email)) {
            newErrors.email = 'فرمت ایمیل نادرست است.';
        }

        if (!formStore.password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        try {
            const response = await axios.post('/login', {
                username: formStore.username,
                email: formStore.email,
                password: formStore.password,
            });

            formStore.reset();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form className="max-w-md mx-auto mt-10 p-4 border rounded shadow" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm" htmlFor="username">
                    نام کاربری
                </label>
                <input
                    type="text"
                    id="username"
                    className={`mt-1 p-2 w-full border rounded ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                    value={formStore.username}
                    onChange={(e) => formStore.setUsername(e.target.value)}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm " htmlFor="email">
                    ایمیل
                </label>
                <input
                    type="email"
                    id="email"
                    className={`mt-1 p-2 w-full border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    value={formStore.email}
                    onChange={(e) => formStore.setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <label className=" text-sm " htmlFor="password">
                    رمز عبور
                </label>
                <input
                    type="password"
                    id="password"
                    className={`mt-1 p-2 w-full border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    value={formStore.password}
                    onChange={(e) => formStore.setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                ورود
            </button>
        </form>
    );
});

export default Login;
