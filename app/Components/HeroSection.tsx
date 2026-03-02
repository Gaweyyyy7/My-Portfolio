import React from 'react';

export default function HeroSection() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="text-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Welcome to My Portfolio
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                    Full-stack developer passionate about creating amazing web experiences
                </p>
                <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
                    View My Work
                </button>
            </div>
        </section>
    );
}