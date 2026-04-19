'use client'

import { useEffect, useState } from 'react'
import { X, Phone } from 'lucide-react'

export default function ContactPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 60000) // 60 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ animation: 'cpFadeIn 0.3s ease' }}
      onClick={() => setVisible(false)}
    >
      {/* Card — matches site's card/white background, green primary */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card border border-primary/20 rounded-2xl shadow-2xl w-[90%] max-w-sm text-center overflow-hidden"
        style={{ animation: 'cpSlideUp 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        <div className="px-10 pb-10 pt-8">
          {/* Close button */}
          <button
            onClick={() => setVisible(false)}
            aria-label="Close popup"
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <X size={15} />
          </button>

          {/* Icon circle */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/30">
            <Phone size={26} className="text-primary-foreground" />
          </div>

          {/* Heading */}
          <h2
            id="popup-title"
            className="text-xl font-bold text-foreground mb-2 tracking-tight"
          >
            Connect With Us
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
            Have a question? Our team is happy to help you.
          </p>

          {/* Phone CTA button */}
          <a
            href="tel:8182549423"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold px-7 py-3.5 rounded-full text-base shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Phone size={17} />
             8182549423
          </a>
        </div>

        {/* Keyframes */}
        <style>{`
          @keyframes cpFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes cpSlideUp {
            from { opacity: 0; transform: translateY(36px) scale(0.96); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  )
}
