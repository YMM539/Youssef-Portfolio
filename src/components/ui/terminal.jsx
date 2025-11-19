"use client"
import { cn } from "../../lib/utils" // (تأكد من المسار حسب مشروعك ../../ أو @/lib)
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// 1. مكون الحاوية (الشكل الخارجي)
export const Terminal = ({ children, className }) => {
  return (
    <div className={cn("w-full rounded-xl border border-zinc-800 bg-black text-zinc-300 min-h-[350px]", className)}>
      <div className="flex items-center gap-2 rounded-t-xl border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <div className="ml-2 text-xs text-zinc-500 font-mono">bash — youssef@frontend-dev:~$</div>
      </div>
      <div className="p-4 font-mono text-sm md:text-base overflow-x-auto whitespace-pre-wrap">
        {children}
      </div>
    </div>
  )
}

// 2. مكون الكتابة المتحركة (للأوامر)
export const TypingAnimation = ({ children, className, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)

  // تأخير البدء
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  // تأثير الكتابة
  useEffect(() => {
    if (!started) return
    
    let i = 0
    const text = String(children)
    
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 30) // سرعة الكتابة (كل 30 مللي ثانية حرف)

    return () => clearInterval(typingEffect)
  }, [children, started])

  return (
    <div className={cn("flex items-center gap-2 mb-2 text-zinc-100", className)}>
      <span className="text-green-400 shrink-0">➜ ~</span>
      <span>{displayedText}</span>
      {/* مؤشر الكتابة (Cursor) */}
      {started && displayedText.length < String(children).length && (
        <span className="animate-pulse inline-block w-2 h-4 bg-zinc-500 align-middle" />
      )}
    </div>
  )
}

// 3. مكون الظهور التدريجي (للنتائج)
export const AnimatedSpan = ({ children, delay = 0, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }} // تحويل المللي ثانية لثواني
      className={cn("mb-1 block", className)}
    >
      {children}
    </motion.div>
  )
}