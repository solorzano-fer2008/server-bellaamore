import React, { useState } from 'react';
import { LuSmartphone, LuGlobe, LuMessageCircle, LuInfo, LuInstagram } from 'react-icons/lu';
import backgroundImage from '../assets/img/restaurantefondo3.png';

export const DomicilioPage = () => {
    const [activeMethod, setActiveMethod] = useState('llamada');

    const methods = [
        {
            id: 'llamada',
            name: 'Llamada',
            icon: <LuSmartphone className="text-4xl" />,
            detail: '2356-7890',
            active: activeMethod === 'llamada'
        },
        {
            id: 'web',
            name: 'Web',
            icon: <LuGlobe className="text-4xl" />,
            detail: 'Web',
            active: activeMethod === 'web'
        },
        {
            id: 'whatsapp',
            name: 'Whatsapp',
            icon: <LuMessageCircle className="text-4xl" />,
            detail: 'Whatsapp',
            active: activeMethod === 'whatsapp'
        },
        {
            id: 'instagram',
            name: 'Instagram',
            icon: <LuInstagram className="text-4xl" />,
            detail: 'Instagram',
            active: activeMethod === 'instagram'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans relative">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8">
                        MANERAS DE PEDIR BELLA AMORE A DOMICILIO
                    </h1>
                </div>

                {/* Methods Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {methods.map((method) => (
                        <button
                            key={method.id}
                            onClick={() => setActiveMethod(method.id)}
                            className={`
                                relative flex flex-col items-center justify-center p-8 rounded-xl transition-all duration-300 border-2
                                ${method.active
                                    ? 'bg-purple-700 border-purple-500 scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                    : 'bg-zinc-900/60 border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-800/80'}
                            `}
                        >
                            <div className="mb-4">{method.icon}</div>
                            <span className="text-xl font-bold uppercase tracking-wider">{method.detail}</span>
                            {method.active && (
                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-700 rotate-45 border-r-2 border-b-2 border-purple-500"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Detailed Section */}
                {activeMethod === 'llamada' && (
                    <div className="bg-zinc-900/60 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <h2 className="text-3xl font-bold text-purple-400 mb-8 border-l-4 border-purple-500 pl-4">Llamada</h2>

                        <p className="text-gray-300 mb-8 text-lg">
                            Aquí tienes un paso a paso para pedir Bella Amore a domicilio a través del call center utilizando el número de teléfono <span className="text-purple-400 font-bold">2356-7890</span>:
                        </p>

                        <ol className="space-y-6">
                            {[
                                "Marcar el número 2356-7890 para comunicarse con un representante de servicio al cliente de Bella Amore.",
                                "Escuchar atentamente las instrucciones del representante y responder a sus preguntas proporcionando la información necesaria.",
                                "Si tienes alguna solicitud especial, como alergias alimentarias o condimentos adicionales, asegúrate de mencionarlo al representante.",
                                "Confirmar todos los detalles de tu pedido, incluyendo los productos seleccionados, la dirección de entrega y el método de pago.",
                                "Esperar a que tu pedido llegue a tu puerta y disfruta de tu comida de Bella Amore."
                            ].map((step, index) => (
                                <li key={index} className="flex items-start gap-4 group">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                        {index + 1}
                                    </span>
                                    <p className="text-gray-200 text-lg leading-relaxed">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-xl flex items-start gap-4">
                            <LuInfo className="text-purple-400 text-2xl shrink-0 mt-1" />
                            <p className="text-gray-400 text-sm italic">
                                Recuerda que los pasos pueden variar dependiendo de la ubicación y las políticas específicas de Bella Amore en tu área. Si tienes alguna dificultad comunícate directamente con el servicio al cliente llamando al 2356-7890.
                            </p>
                        </div>
                    </div>
                )}

                {activeMethod === 'web' && (
                    <div className="bg-zinc-900/60 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <h2 className="text-3xl font-bold text-purple-400 mb-8 border-l-4 border-purple-500 pl-4 uppercase">Sitio Web</h2>

                        <p className="text-gray-300 mb-8 text-lg">
                            Aquí tienes un paso a paso para pedir Bella Amore a domicilio a través de nuestro sitio web:
                        </p>

                        <ol className="space-y-6">
                            {[
                                "Haz clic en este link para poder iniciar el proceso de pedido en línea.",
                                "Ingresa tu dirección para confirmar si nuestro servicio de domicilio está disponible en tu área.",
                                "Explora el menú en línea y selecciona los productos que deseas ordenar.",
                                "Revisa tu pedido en el carrito de compra para asegurarte de que todos los productos sean correctos. Puedes agregar, eliminar o modificar elementos según sea necesario.",
                                "Cuando estés satisfecho con tu pedido, haz clic en el botón de \"Finalizar Pedido.\"",
                                "El sitio web te pedirá que ingreses tus datos personales, como tu nombre, dirección de entrega, número de teléfono, dirección de correo electrónico y que elijas tu método de pago.",
                                "Verifica toda la información ingresada, incluyendo la dirección de entrega y los productos seleccionados. Confirma que todo esté correcto antes de finalizar el pedido.",
                                "Una vez que hayas realizado el pedido, espera a que tu comida de Bella Amore sea entregada en la dirección proporcionada."
                            ].map((step, index) => (
                                <li key={index} className="flex items-start gap-4 group">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                        {index + 1}
                                    </span>
                                    <p className="text-gray-200 text-lg leading-relaxed">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-xl flex items-start gap-4">
                            <LuInfo className="text-purple-400 text-2xl shrink-0 mt-1" />
                            <p className="text-gray-400 text-sm italic">
                                Si tienes alguna dificultad comunícate directamente con el servicio al cliente llamando al 2356-7890.
                            </p>
                        </div>
                    </div>
                )}

                {activeMethod === 'whatsapp' && (
                    <div className="bg-zinc-900/60 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <h2 className="text-3xl font-bold text-purple-400 mb-8 border-l-4 border-purple-500 pl-4 uppercase">Whatsapp</h2>

                        <p className="text-gray-300 mb-8 text-lg">
                            Aquí tienes un paso a paso para pedir Bella Amore a domicilio a través de WhatsApp:
                        </p>

                        <ol className="space-y-6">
                            {[
                                "Abre WhatsApp en tu dispositivo móvil y asegúrate de tener una conexión a Internet estable.",
                                "Busca el contacto de Bella Amore en tu lista de contactos o agrega un nuevo contacto con el nombre \"Bella Amore\" y el número de teléfono 2356-7890; o haz clic en este link.",
                                "Una vez que hayas encontrado el contacto, abre el chat con Bella Amore.",
                                "Inicia la conversación con una frase como \"Hola Bella Amore\" para poder empezar tu pedido.",
                                "Proporciona tu dirección completa de entrega, incluyendo el nombre de la calle, número de casa o apartamento, ciudad y cualquier otra información relevante.",
                                "Si nuestro servicio a domicilio aplica en tu área, abre el link del menú y decide qué productos deseas pedir.",
                                "Confirma todos los detalles de tu pedido, incluyendo los productos seleccionados, la dirección de entrega y el método de pago. Recuerda que el mínimo de compra es de Q50.",
                                "Una vez que hayas confirmado todos los detalles, espera la confirmación final de tu pedido por parte del representante de Bella Amore a través de una llamada.",
                                "Espera a que tu pedido llegue a tu puerta y disfruta de tu comida de Bella Amore."
                            ].map((step, index) => (
                                <li key={index} className="flex items-start gap-4 group">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                        {index + 1}
                                    </span>
                                    <p className="text-gray-200 text-lg leading-relaxed">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-xl flex items-start gap-4">
                            <LuInfo className="text-purple-400 text-2xl shrink-0 mt-1" />
                            <p className="text-gray-400 text-sm italic">
                                Recuerda que los pasos pueden variar dependiendo de la ubicación y las políticas específicas de Bella Amore en tu área. Si tienes alguna dificultad comunícate directamente con el servicio al cliente llamando al 2356-7890.
                            </p>
                        </div>
                    </div>
                )}

                {activeMethod === 'instagram' && (
                    <div className="bg-zinc-900/60 backdrop-blur-md border-2 border-purple-500/30 rounded-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <h2 className="text-3xl font-bold text-purple-400 mb-8 border-l-4 border-purple-500 pl-4 uppercase">Instagram</h2>

                        <p className="text-gray-300 mb-8 text-lg">
                            Sigue estos pasos para realizar tu pedido a través de nuestra cuenta oficial de Instagram:
                        </p>

                        <ol className="space-y-6">
                            {[
                                "Ingresa a nuestro perfil oficial de Instagram.",
                                "Envíanos un mensaje directo (DM) con los productos que deseas ordenar.",
                                "Proporciona tu dirección exacta de entrega y un número de teléfono de contacto.",
                                "Recibirás una confirmación por parte de nuestro equipo con el total de tu pedido y el tiempo estimado de entrega.",
                                "¡Listo! Solo queda esperar tu pedido y disfrutar de Bella Amore."
                            ].map((step, index) => (
                                <li key={index} className="flex items-start gap-4 group">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                        {index + 1}
                                    </span>
                                    <p className="text-gray-200 text-lg leading-relaxed">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-12 text-center">
                            <a
                                href="https://www.instagram.com/bella_amore/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black py-4 px-8 rounded-xl transition-all duration-300 uppercase tracking-widest text-lg shadow-lg shadow-purple-600/30 active:scale-[0.98]"
                            >
                                <LuInstagram className="text-2xl" />
                                Seguir en Instagram
                            </a>
                        </div>
                    </div>
                )}

                {activeMethod !== 'llamada' && activeMethod !== 'instagram' && activeMethod !== 'web' && activeMethod !== 'whatsapp' && (
                    <div className="bg-zinc-900/60 backdrop-blur-md border-2 border-zinc-800 rounded-2xl p-12 text-center animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <h2 className="text-2xl font-bold text-gray-400 mb-4 uppercase tracking-widest">Opción {activeMethod} Próximamente</h2>
                        <p className="text-gray-500">Estamos trabajando para habilitar esta opción de pedido muy pronto.</p>
                    </div>
                )}

                {/* Other Delivery Options section */}
                <div className="mt-20">
                    <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-10 uppercase tracking-widest">
                        OTRAS OPCIONES DE DOMICILIO
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {/* PedidosYa Button */}
                        <a
                            href="https://www.pedidosya.com.gt/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#FF004B] hover:bg-[#D90040] transition-colors rounded-xl p-4 flex items-center justify-center shadow-lg shadow-[#FF004B]/20 min-h-[100px]"
                        >
                            <div className="flex flex-col items-center">
                                <div className="text-white text-3xl font-black italic tracking-tighter mb-1 select-none">
                                    <span className="text-4xl">P</span>
                                </div>
                                <span className="text-white text-sm font-bold tracking-tight select-none italic">PedidosYa</span>
                            </div>
                        </a>

                        {/* Uber Eats Button */}
                        <a
                            href="https://www.ubereats.com/gt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black hover:bg-zinc-900 transition-colors rounded-xl p-4 flex items-center justify-center shadow-lg shadow-black/20 border border-white/5 min-h-[100px]"
                        >
                            <div className="flex items-baseline">
                                <span className="text-white text-3xl font-medium tracking-tight select-none">Uber</span>
                                <span className="text-[#06C167] text-3xl font-medium tracking-tight ml-1 select-none">Eats</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
