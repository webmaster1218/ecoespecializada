"use client";

import { useState } from "react";
import { IconLock, IconUser, IconEye, IconEyeOff, IconArrowLeft } from "@tabler/icons-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

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
        // ... (keep logic same)
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
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative">
            {/* Volver al Home Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-2 font-bold transition-colors bg-slate-800/50 px-4 py-2 rounded-xl backdrop-blur-sm"
            >
                <IconArrowLeft size={20} />
                <span>Volver al Inicio</span>
            </Link>

            <div className="bg-white rounded-[30px] shadow-2xl p-8 max-w-sm w-full relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="flex flex-col items-center mb-8">
                    <div className="mb-6 relative w-48 h-12 overflow-hidden">
                        <Image
                            src="/images/logo/logo.webp"
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-1 text-center font-sans tracking-tight">Acceso Administrativo</h2>
                    <p className="text-slate-500 text-sm font-medium text-center">Calendario de Reservas</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ... (rest of form remains same) */}
                    <div>
                        <label className="block text-xs font-black text-slate-400 tracking-widest uppercase mb-2 ml-1">Usuario</label>
                        <div className="relative">
                            <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                                placeholder="Ingresa tu usuario"
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                                autoFocus
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-400 tracking-widest uppercase mb-2 ml-1">Contraseña</label>
                        <div className="relative">
                            <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold text-center border border-red-100 animate-shake">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                    >
                        {isLoading ? 'Verificando...' : 'Ingresar al Panel'}
                    </button>
                </form>
            </div>
        </div>
    );
}
