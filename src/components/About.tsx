import type { FC } from 'react'
import { ShieldCheck, Lock, Zap, Code, Github, Twitter } from './Icons'

const About: FC = () => {
  return (
    <div className="min-h-screen  text-slate-900 dark:text-white">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-cyan-500/10 p-3 rounded-full">
              <ShieldCheck className="h-10 w-10 text-cyan-500" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Secure Password Generator
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
            A cryptographically secure password generator built with modern web technologies
          </p>
        </div>

        {/* Project Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Project Overview
          </h2>
          <div className="prose dark:prose-invert prose-slate max-w-none">
            <p>
              The Secure Password Generator is a modern web application designed to create high-entropy, 
              cryptographically secure passwords. Built with React, TypeScript, and Tailwind CSS, 
              it provides a user-friendly interface for generating passwords that meet the highest 
              security standards.
            </p>
            <p>
              Unlike many password generators that rely on pseudo-random algorithms, our generator 
              uses the Web Crypto API to ensure true randomness and high entropy in every password. 
              All processing happens client-side, ensuring your passwords never leave your device.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center mb-4">
                <div className="bg-cyan-500/10 p-2 rounded-lg mr-4">
                  <Lock className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="font-semibold text-lg">Cryptographic Security</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Uses the Web Crypto API to generate truly random values with an entropy pool of 1024 values, 
                ensuring passwords that are resistant to brute-force attacks.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center mb-4">
                <div className="bg-cyan-500/10 p-2 rounded-lg mr-4">
                  <Zap className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="font-semibold text-lg">Customizable Options</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Adjust password length, character sets, and generate pronounceable passwords that 
                balance security with memorability.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center mb-4">
                <div className="bg-cyan-500/10 p-2 rounded-lg mr-4">
                  <ShieldCheck className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="font-semibold text-lg">Strength Analysis</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Calculates password strength using Shannon entropy and provides visual feedback 
                with estimated crack time calculations.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center mb-4">
                <div className="bg-cyan-500/10 p-2 rounded-lg mr-4">
                  <Code className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="font-semibold text-lg">Modern Architecture</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Built with React, TypeScript, and Tailwind CSS, following best practices for 
                performance, accessibility, and code quality.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Technical Details
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700 mb-8">
            <h3 className="font-semibold text-lg mb-4">Technology Stack</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2">•</span>
                <span><strong>Frontend Framework:</strong> React with TypeScript</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2">•</span>
                <span><strong>Build Tool:</strong> Vite for fast development and optimized production builds</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2">•</span>
                <span><strong>Styling:</strong> Tailwind CSS for utility-first styling</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-500 mr-2">•</span>
                <span><strong>Cryptography:</strong> Web Crypto API for secure random number generation</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-lg mb-4">Security Implementation</h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                Our password generator implements several advanced security features:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span><strong>Entropy Pool:</strong> Maintains a pool of 1024 cryptographically secure random values</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span><strong>Shannon Entropy:</strong> Calculates password strength using information theory</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span><strong>Character Set Optimization:</strong> Excludes easily confused characters for better usability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span><strong>Client-Side Processing:</strong> All generation happens locally, passwords never leave your device</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

       
        {/* Team/Creator */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            About the Creator
          </h2>
          <div className=" rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                KJ
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2 text-center sm:text-left">Kinshuk Jain</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Aspring Cloud enginer and devops enthusiast with a passion for building secure and efficient applications.
                  I love exploring new technologies and finding innovative solutions to complex problems.
                </p>
                <div className="flex justify-center sm:justify-start space-x-4">
                  <a href="https://github.com/kinshukjainn" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a href="https://x.com/realkinshuk004" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Get Involved */}
        <section>
          <h2 className="text-2xl font-bold mb-6  pb-2">
            Get Involved
          </h2>
          <div className=" rounded-xl shadow-lg p-8 text-white">
            <h3 className="font-semibold text-xl mb-4">Contribute to the Project</h3>
            <p className="mb-6">
              This project is open source and welcomes contributions. Whether you're fixing bugs, 
              improving documentation, or adding new features, your help is appreciated.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/kinshukjainn/Encrypted-password-genrated" 
                className="bg-white text-cyan-600 hover:bg-slate-100 px-5 py-2 rounded-lg font-medium transition-colors"
              >
                View on GitHub
              </a>
              <a 
                href="https://github.com/kinshukjainn/Encrypted-password-genrated" 
                className="bg-transparent hover:bg-white/10 border border-white px-5 py-2 rounded-lg font-medium transition-colors"
              >
                Report an Issue
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
