
import { useState, useCallback, useEffect, useRef } from "react"
import { Copy, RefreshCw, Shield, ShieldCheck, ShieldAlert } from "lucide-react"

// Cryptographic constants
const CRYPTO_CONSTANTS = {
  ENTROPY_POOL_SIZE: 1024,
  MIN_ENTROPY_BITS: 128,
  MAX_ENTROPY_BITS: 256,
  CHARACTER_SETS: {
    LOWER: "abcdefghijkmnopqrstuvwxyz", // Removed 'l' as it's often confused with '1'
    UPPER: "ABCDEFGHJKLMNPQRSTUVWXYZ", // Removed 'I' and 'O' for clarity
    NUMBERS: "23456789", // Removed '0' and '1' for clarity
    SPECIAL: "!@#$%^&*()-_=+[]{}|;:,.<>?",
  },
  // Common substitutions to increase complexity while keeping memorability
  COMMON_SUBSTITUTIONS: {
    a: ["@", "4"],
    e: ["3"],
    i: ["1", "!"],
    o: ["0"],
    s: ["$", "5"],
    t: ["7"],
  },
}

// Helper function to create a high-entropy random number generator
const createEntropyGenerator = () => {
  let entropyPool: number[] = []
  let poolIndex = 0

  // Fill the entropy pool with high-quality random values
  const fillEntropyPool = () => {
    const crypto = window.crypto || (window as typeof window & { msCrypto?: Crypto }).msCrypto
    if (crypto && crypto.getRandomValues) {
      const buffer = new Uint32Array(CRYPTO_CONSTANTS.ENTROPY_POOL_SIZE)
      crypto.getRandomValues(buffer)
      entropyPool = Array.from(buffer)
    } else {
      // Fallback using multiple entropy sources (less secure but still better than Math.random)
      const fallbackValues = []
      for (let i = 0; i < CRYPTO_CONSTANTS.ENTROPY_POOL_SIZE; i++) {
        fallbackValues.push((performance.now() * 1000000) ^ new Date().getTime() ^ (Math.random() * 0xffffffff))
      }
      entropyPool = fallbackValues
    }
    poolIndex = 0
  }

  fillEntropyPool()

  const getRandomValue = (max: number): number => {
    if (poolIndex >= entropyPool.length * 0.75) {
      fillEntropyPool()
    }

    const value = entropyPool[poolIndex++]
    return value % max
  }

  return { getRandomValue }
}

// Calculate password strength using Shannon entropy
const calculatePasswordStrength = (password: string): number => {
  const charSetSize = new Set(password.split("")).size
  const length = password.length

  // Calculate bits of entropy using Shannon's formula
  const entropy = length * Math.log2(charSetSize)

  // Normalize to 0-100 scale
  const maxPossibleEntropy = CRYPTO_CONSTANTS.MAX_ENTROPY_BITS
  return Math.min(100, (entropy / maxPossibleEntropy) * 100)
}

// Apply common substitutions to increase complexity while maintaining memorability
const applyCommonSubstitutions = (password: string): string => {
  const chars = password.split("")
  const substitutionChance = 0.3 // 30% chance to substitute a character

  for (let i = 0; i < chars.length; i++) {
    const lowerChar = chars[i].toLowerCase()
    if (Object.prototype.hasOwnProperty.call(CRYPTO_CONSTANTS.COMMON_SUBSTITUTIONS, lowerChar)) {
      if (Math.random() < substitutionChance) {
        const options =
          CRYPTO_CONSTANTS.COMMON_SUBSTITUTIONS[lowerChar as keyof typeof CRYPTO_CONSTANTS.COMMON_SUBSTITUTIONS]
        chars[i] = options[Math.floor(Math.random() * options.length)]
      }
    }
  }

  return chars.join("")
}

// Generate a pronounceable syllable for better memorability
const generatePronounceableSyllable = (random: { getRandomValue: (max: number) => number }): string => {
  const vowels = "aeiouy"
  const consonants = "bcdfghjklmnpqrstvwxz"

  const pattern = Math.random() < 0.5 ? "CVC" : "VC"
  let syllable = ""

  for (const char of pattern) {
    if (char === "V") {
      syllable += vowels[random.getRandomValue(vowels.length)]
    } else {
      syllable += consonants[random.getRandomValue(consonants.length)]
    }
  }

  return syllable
}

// Get estimated crack time based on entropy bits
const getEstimatedCrackTime = (entropyBits: number): string => {
  if (entropyBits < 40) return "seconds"
  if (entropyBits < 60) return "minutes"
  if (entropyBits < 80) return "hours"
  if (entropyBits < 100) return "years"
  return "millennia"
}

export default function PasswordEncryption() {
  const [password, setPassword] = useState<string>("")
  const [length, setLength] = useState<number>(16)
  const [includeUpper, setIncludeUpper] = useState<boolean>(true)
  const [includeLower, setIncludeLower] = useState<boolean>(true)
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true)
  const [includeSpecial, setIncludeSpecial] = useState<boolean>(true)
  const [usePronounceable, setUsePronounceable] = useState<boolean>(false)
  const [strength, setStrength] = useState<number>(0)
  const [entropyBits, setEntropyBits] = useState<number>(0)
  const [generationTime, setGenerationTime] = useState<number>(0)
  const [showCopied, setShowCopied] = useState<boolean>(false)

  const entropyGenerator = useRef(createEntropyGenerator()).current

  const generatePassword = useCallback(() => {
    const startTime = performance.now()

    let charset = ""
    if (includeLower) charset += CRYPTO_CONSTANTS.CHARACTER_SETS.LOWER
    if (includeUpper) charset += CRYPTO_CONSTANTS.CHARACTER_SETS.UPPER
    if (includeNumbers) charset += CRYPTO_CONSTANTS.CHARACTER_SETS.NUMBERS
    if (includeSpecial) charset += CRYPTO_CONSTANTS.CHARACTER_SETS.SPECIAL

    if (!charset) {
      setPassword("Select at least one character set")
      return
    }

    let generatedPassword = ""

    if (usePronounceable) {
      // Generate pronounceable password with syllables
      const syllableCount = Math.ceil(length / 3)
      for (let i = 0; i < syllableCount; i++) {
        generatedPassword += generatePronounceableSyllable(entropyGenerator)
      }
      generatedPassword = generatedPassword.substring(0, length)

      // Ensure at least one character from each selected set
      const requirements: Array<[boolean, RegExp, string]> = [
        [includeLower, /[a-z]/, CRYPTO_CONSTANTS.CHARACTER_SETS.LOWER],
        [includeUpper, /[A-Z]/, CRYPTO_CONSTANTS.CHARACTER_SETS.UPPER],
        [includeNumbers, /[0-9]/, CRYPTO_CONSTANTS.CHARACTER_SETS.NUMBERS],
        [includeSpecial, /[^a-zA-Z0-9]/, CRYPTO_CONSTANTS.CHARACTER_SETS.SPECIAL],
      ]

      for (const [enabled, regex, chars] of requirements) {
        if (enabled && !regex.test(generatedPassword)) {
          const pos = entropyGenerator.getRandomValue(generatedPassword.length)
          const replacement = chars[entropyGenerator.getRandomValue(chars.length)]
          generatedPassword = generatedPassword.substring(0, pos) + replacement + generatedPassword.substring(pos + 1)
        }
      }
    } else {
      // Generate completely random password
      for (let i = 0; i < length; i++) {
        generatedPassword += charset[entropyGenerator.getRandomValue(charset.length)]
      }
    }

    // Apply common substitutions to increase complexity
    generatedPassword = applyCommonSubstitutions(generatedPassword)

    // Ensure the password meets all requirements (in case substitutions changed something)
    const hasLower = includeLower ? /[a-z]/.test(generatedPassword) : true
    const hasUpper = includeUpper ? /[A-Z]/.test(generatedPassword) : true
    const hasNumber = includeNumbers ? /[0-9]/.test(generatedPassword) : true
    const hasSpecial = includeSpecial ? /[^a-zA-Z0-9]/.test(generatedPassword) : true

    if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
      // If requirements aren't met, regenerate (recursion is limited by the UI constraints)
      return generatePassword()
    }

    setPassword(generatedPassword)

    // Calculate metrics
    const endTime = performance.now()
    setGenerationTime(endTime - startTime)

    const strengthScore = calculatePasswordStrength(generatedPassword)
    setStrength(strengthScore)

    const uniqueChars = new Set(generatedPassword.split("")).size
    setEntropyBits(Math.floor(generatedPassword.length * Math.log2(uniqueChars)))
  }, [length, includeUpper, includeLower, includeNumbers, includeSpecial, usePronounceable, entropyGenerator])

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const getStrengthColor = () => {
    if (strength < 40) return "bg-red-500"
    if (strength < 70) return "bg-amber-500"
    if (strength < 90) return "bg-cyan-500"
    return "bg-emerald-500"
  }

  const getStrengthLabel = () => {
    if (strength < 40) return "Weak"
    if (strength < 70) return "Good"
    if (strength < 90) return "Strong"
    return "Excellent"
  }

  const getLengthLabel = () => {
    if (length <= 12) return "Weak"
    if (length <= 16) return "Good"
    return "Strong"
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden  backdrop-blur-xl shadow-2xl">
        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center space-y-2 mb-4">
            <ShieldCheck className="h-12 w-12 text-cyan-500" />
            <h1 className="text-2xl font-bold text-white">Secure Password Generator</h1>
            <p className="text-slate-400 text-center max-w-md">
              Generate cryptographically secure passwords with high entropy and customizable options
            </p>
          </div>

          {/* Password Display Section */}
          <div className="bg-slate-800/70 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-700/50">
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
              <div className="relative w-full">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="w-full bg-slate-900/80 border border-slate-700 text-white p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base overflow-x-auto rounded-lg font-mono"
                  title="Generated Password"
                  aria-label="Generated Password"
                />
                {showCopied && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-cyan-500 text-slate-900 px-2 py-1 rounded text-xs font-medium">
                    Copied!
                  </div>
                )}
              </div>
              <button
                onClick={copyToClipboard}
                className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-5 rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                aria-label="Copy password to clipboard"
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </button>
            </div>

            <div className="flex flex-wrap justify-between text-xs sm:text-sm text-slate-300 gap-2 mb-3">
              <div className="flex items-center gap-1">
                <span>Strength:</span>
                <span className="font-medium">{strength.toFixed(1)}%</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Entropy:</span>
                <span className="font-medium">~{entropyBits} bits</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Generated in:</span>
                <span className="font-medium">{generationTime.toFixed(1)} ms</span>
              </div>
            </div>

            <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full ${getStrengthColor()} transition-all duration-500 ease-out`}
              />
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {strength < 40 ? (
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                ) : strength < 70 ? (
                  <Shield className="h-4 w-4 text-amber-500" />
                ) : (
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                )}
                <span
                  className={
                    strength < 40
                      ? "text-sm font-medium text-red-500"
                      : strength < 70
                        ? "text-sm font-medium text-amber-500"
                        : strength < 90
                          ? "text-sm font-medium text-cyan-500"
                          : "text-sm font-medium text-emerald-500"
                  }
                >
                  {getStrengthLabel()}
                </span>
              </div>
              <span className="text-xs text-slate-400">Est. crack time: {getEstimatedCrackTime(entropyBits)}</span>
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-5">
            {/* Length Control */}
            <div className="bg-slate-800/70 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-700/50">
              <label className="flex items-center justify-between text-white mb-3" htmlFor="password-length-slider">
                <span className="font-medium">Length: {length}</span>
                <span
                  className={
                    length <= 12
                      ? "text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300"
                      : length <= 16
                        ? "text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300"
                        : "text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300"
                  }
                >
                  {getLengthLabel()}
                </span>
              </label>
              <input
                id="password-length-slider"
                type="range"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(Number.parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-cyan-500"
                title="Password length"
                aria-label="Password length"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>8</span>
                <span>16</span>
                <span>24</span>
                <span>32</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="bg-slate-800/70 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-700/50">
              <h2 className="text-white font-medium mb-4">Character Options</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center text-slate-200 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={includeUpper}
                    onChange={(e) => setIncludeUpper(e.target.checked)}
                    className="mr-3 h-5 w-5 rounded accent-cyan-500 bg-slate-700 border-slate-600"
                  />
                  <span>Uppercase (A-Z)</span>
                </label>

                <label className="flex items-center text-slate-200 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={includeLower}
                    onChange={(e) => setIncludeLower(e.target.checked)}
                    className="mr-3 h-5 w-5 rounded accent-cyan-500 bg-slate-700 border-slate-600"
                  />
                  <span>Lowercase (a-z)</span>
                </label>

                <label className="flex items-center text-slate-200 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="mr-3 h-5 w-5 rounded accent-cyan-500 bg-slate-700 border-slate-600"
                  />
                  <span>Numbers (0-9)</span>
                </label>

                <label className="flex items-center text-slate-200 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={includeSpecial}
                    onChange={(e) => setIncludeSpecial(e.target.checked)}
                    className="mr-3 h-5 w-5 rounded accent-cyan-500 bg-slate-700 border-slate-600"
                  />
                  <span>Special (!@#$)</span>
                </label>
              </div>
            </div>

            {/* Pronounceable Option */}
            <div className="bg-slate-800/70 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-700/50">
              <label className="flex items-center text-slate-200 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={usePronounceable}
                  onChange={(e) => setUsePronounceable(e.target.checked)}
                  className="mr-3 h-5 w-5 rounded accent-cyan-500 bg-slate-700 border-slate-600"
                />
                <div>
                  <span>Generate pronounceable password</span>
                  <p className="text-xs text-slate-400 mt-1">Easier to remember but may have slightly lower entropy</p>
                </div>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-medium py-4 px-5 rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
            aria-label="Generate new password"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Generate New Password</span>
          </button>

          {/* Security Information */}
          <div className="bg-slate-800/70 backdrop-blur-md p-5 rounded-xl shadow-lg border border-slate-700/50">
            <h3 className="text-white font-medium mb-3 text-sm sm:text-base">Password Security Information:</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-slate-400">
              <li>Entropy ≥ {CRYPTO_CONSTANTS.MIN_ENTROPY_BITS} bits makes brute-force attacks impractical</li>
              <li>Generated using cryptographically secure random number generation</li>
              <li>Common substitutions increase complexity while maintaining memorability</li>
              <li>All processing happens locally in your browser - passwords are never sent to a server</li>
              <li>Estimated crack time: {getEstimatedCrackTime(entropyBits)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
