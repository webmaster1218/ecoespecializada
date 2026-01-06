"use client";

import { useState } from "react";
import { IconLock, IconUser, IconEye, IconEyeOff } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";

interface LoginScreenProps {
    onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (!supabase) {
                setError("Error de configuración: Supabase no detectado");
                return;
            }

            const { data: users, error: dbError } = await supabase
                .from('admin_users')
                .select('*')
                .eq('username', username)
                .eq('is_active', true);

            if (dbError) {
                setError(dbError.message);
                return;
            }

            const user = users?.[0];

            if (user && user.password_hash === password) {
                // Store auth in sessionStorage
                sessionStorage.setItem('admin_auth', 'true');
                sessionStorage.setItem('admin_user', JSON.stringify({
                    id: user.id,
                    username: user.username,
                    full_name: user.full_name
                }));
                onLogin();
            } else {
                setError('Credenciales inválidas');
                setPassword("");
            }
        } catch (err) {
            setError('Error de conexión. Intenta de nuevo.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconLock size={32} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Acceso Administrativo</h2>
                <p className="text-slate-500 mb-8 text-center">Calendario de Reservas</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Usuario</label>
                        <div className="relative">
                            <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                                placeholder="admin"
                                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                                autoFocus
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium text-center animate-pulse">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Verificando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
