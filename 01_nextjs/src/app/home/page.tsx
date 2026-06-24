import React from 'react';
import Link from 'next/link';

export default function SimpleHomePage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 md:py-24">
      
     
      <section className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900">
          Simplify Your Work. <br />
          <span className="text-gray-500">Elevate Your Gear.</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The all-in-one platform for modern teams. Powerful software tools combined with premium workspace gadgets to boost your daily productivity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm font-medium">
          <Link 
            href="/login" 
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition shadow-sm"
          >
            Get Started
          </Link>
          <a 
            href="#products" 
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            Explore Products
          </a>
        </div>
      </section>

    
      <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-100">
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4 text-xl">
            ⚡
          </div>
          <h3 className="font-bold text-lg mb-2">Fast Performance</h3>
          <p className="text-gray-600 text-sm">Lightning fast software architecture designed for zero lag and maximum efficiency.</p>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4 text-xl">
            🛡️
          </div>
          <h3 className="font-bold text-lg mb-2">Secure by Design</h3>
          <p className="text-gray-600 text-sm">Enterprise-grade security keeps your data safe, no matter where your team works.</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-4 text-xl">
            ⌨️
          </div>
          <h3 className="font-bold text-lg mb-2">Premium Hardware</h3>
          <p className="text-gray-600 text-sm">Curated mechanical keyboards and accessories that seamlessly integrate with our app.</p>
        </div>
      </section>

    </div>
  );
}