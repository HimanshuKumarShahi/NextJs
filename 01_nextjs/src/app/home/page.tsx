import React from "react";
import Link from "next/link";

export default function StylishHomePage() {
  return (
    <div className="w-full bg-white font-sans overflow-hidden">
      
      
      <section className="relative w-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
    
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-100 to-white blur-3xl -z-10 rounded-full opacity-50"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
          NexusTech v1.0 is live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-gray-900 leading-tight max-w-4xl">
          Build Faster. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Scale Without Limits.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
          The ultimate platform combining enterprise-grade software architecture with premium workspace gear. Designed for developers who demand the best.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm font-bold w-full sm:w-auto">
          <Link
            href="/login"
            className="bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-black hover:scale-105 transition-all shadow-xl shadow-gray-900/20"
          >
            Start Building Free
          </Link>
          <a
            href="#hardware"
            className="border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            Explore Gear
          </a>
        </div>

      
        <div className="mt-20 w-full max-w-5xl bg-gray-50 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
          <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
             <p className="text-gray-400 font-medium">[ Your Beautiful Dashboard UI Goes Here ]</p>
          </div>
        </div>
      </section>


      <section className="w-full bg-gray-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Written for developers, by developers.</h2>
            <p className="text-gray-400 text-lg mb-8">
              Seamlessly integrate our APIs using modern frameworks. Next.js, React, or pure Node—we provide type-safe SDKs that feel like magic.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">✓ <span className="font-semibold text-white">Type-safe</span> by default</li>
              <li className="flex items-center gap-3">✓ <span className="font-semibold text-white">Edge-ready</span> architecture</li>
              <li className="flex items-center gap-3">✓ <span className="font-semibold text-white">Zero-config</span> deployments</li>
            </ul>
          </div>

      
          <div className="bg-black/50 border border-gray-800 rounded-xl p-6 font-mono text-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <pre className="text-gray-300 overflow-x-auto">
              <code className="language-typescript">
                <span className="text-purple-400">import</span> {"{ NexusClient }"} <span className="text-purple-400">from</span> <span className="text-green-400">'@nexustech/sdk'</span>;<br/><br/>
                <span className="text-gray-500">// Initialize the client</span><br/>
                <span className="text-purple-400">const</span> nexus = <span className="text-purple-400">new</span> <span className="text-yellow-200">NexusClient</span>({"{"}<br/>
                {"  "}apiKey: process.env.<span className="text-blue-300">NEXUS_API_KEY</span>,<br/>
                {"  "}environment: <span className="text-green-400">'production'</span><br/>
                {"}"});<br/><br/>
                <span className="text-purple-400">export async function</span> <span className="text-blue-400">POST</span>(req: Request) {"{"}<br/>
                {"  "}<span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> req.<span className="text-blue-200">json</span>();<br/>
                {"  "}<span className="text-purple-400">const</span> result = <span className="text-purple-400">await</span> nexus.auth.<span className="text-blue-200">verify</span>(data);<br/>
                {"  "}<span className="text-purple-400">return</span> Response.<span className="text-blue-200">json</span>(result);<br/>
                {"}"}
              </code>
            </pre>
          </div>
        </div>
      </section>

    
      <section className="w-full bg-gray-50 py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">Modular Architecture</h2>
          <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            A visual breakdown of how our secure, JWT-based authentication flow protects your data at every step.
          </p>

          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-48 z-10 relative">
              <div className="text-3xl mb-3">💻</div>
              <div className="font-bold text-gray-900">Client</div>
              <div className="text-xs text-gray-500 mt-1">Next.js Frontend</div>
            </div>

            
            <div className="text-gray-400 font-bold text-2xl hidden md:block">&rarr;</div>
            <div className="text-gray-400 font-bold text-2xl md:hidden">&darr;</div>

            
            <div className="bg-indigo-600 p-6 rounded-xl border border-indigo-700 shadow-md w-48 z-10 relative text-white">
              <div className="text-3xl mb-3">⚙️</div>
              <div className="font-bold">Edge API</div>
              <div className="text-xs text-indigo-200 mt-1">Route Handlers & JWT</div>
            </div>

           
            <div className="text-gray-400 font-bold text-2xl hidden md:block">&rarr;</div>
            <div className="text-gray-400 font-bold text-2xl md:hidden">&darr;</div>

        
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-48 z-10 relative">
              <div className="text-3xl mb-3">🗄️</div>
              <div className="font-bold text-gray-900">Database</div>
              <div className="text-xs text-gray-500 mt-1">MongoDB Secure Store</div>
            </div>
          </div>
        </div>
      </section>

     
      <section id="hardware" className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">Premium Gear</h2>
              <p className="text-gray-600 text-lg">Because great software deserves great hardware.</p>
            </div>
            <Link href="#all-products" className="text-indigo-600 font-bold hover:text-indigo-700 mt-4 md:mt-0">
              View the catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="group cursor-pointer">
              <div className="w-full h-80 bg-gray-100 rounded-2xl mb-6 overflow-hidden flex items-center justify-center relative">
                <span className="text-gray-400">[ Mechanical Keyboard Image ]</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Nexus Pro Keyboard</h3>
              <p className="text-gray-500 mt-2 mb-3">Tactile switches, hot-swappable, QMK support.</p>
              <div className="font-bold text-lg">$149</div>
            </div>

       
            <div className="group cursor-pointer">
              <div className="w-full h-80 bg-gray-100 rounded-2xl mb-6 overflow-hidden flex items-center justify-center relative">
                <span className="text-gray-400">[ Ergo Mouse Image ]</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">MasterFlow Mouse</h3>
              <p className="text-gray-500 mt-2 mb-3">Ergonomic design with magnetic scroll wheel.</p>
              <div className="font-bold text-lg">$89</div>
            </div>

       
            <div className="group cursor-pointer">
              <div className="w-full h-80 bg-gray-100 rounded-2xl mb-6 overflow-hidden flex items-center justify-center relative">
                <span className="text-gray-400">[ Light Bar Image ]</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Halo ScreenBar</h3>
              <p className="text-gray-500 mt-2 mb-3">Zero screen glare for those late-night coding sessions.</p>
              <div className="font-bold text-lg">$109</div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to upgrade your workflow?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of developers and teams who have already switched to NexusTech for their software and hardware needs.
          </p>
          <Link
            href="/login"
            className="bg-white text-black font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition shadow-lg inline-block"
          >
            Create Your Account
          </Link>
          <p className="mt-6 text-sm text-gray-500">No credit card required for software trial.</p>
        </div>
      </section>

    </div>
  );
}