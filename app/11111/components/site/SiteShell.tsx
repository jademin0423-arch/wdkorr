// components/site/SiteShell.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/site'
import { navItems } from './nav'
import { FixedCta } from './components/FixedCta'
import { FloatingCta } from './components/FloatingCta'
import { ExitPopup } from './components/ExitPopup.client'

interface SiteShellProps {
  children: React.ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-wedding-pink/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-800">{SITE.logoText}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="메인 네비게이션">
              {navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-wedding-pink transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href={SITE.ctaSecondary.href}
                className="px-4 py-2 text-sm text-gray-700 hover:text-wedding-pink transition-colors"
              >
                {SITE.ctaSecondary.label}
              </Link>
              <Link
                href={SITE.ctaPrimary.href}
                className="px-4 py-2 bg-wedding-pink text-white rounded-lg hover:bg-wedding-pink/90 transition-colors text-sm font-medium"
              >
                {SITE.ctaPrimary.label}
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
              aria-label="메뉴 토글"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>

          <div
            id="mobile-menu"
            className={`md:hidden border-t border-wedding-pink/20 ${mobileMenuOpen ? 'block' : 'hidden'}`}
          >
            <nav className="py-4 space-y-2" role="navigation" aria-label="모바일 메뉴">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-wedding-ivory rounded transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-4 space-y-2 border-t border-wedding-pink/20 mt-2">
                <Link
                  href={SITE.ctaPrimary.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 bg-wedding-pink text-white rounded-lg text-center font-medium"
                >
                  {SITE.ctaPrimary.label}
                </Link>
                <Link
                  href={SITE.ctaSecondary.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center text-gray-700 border border-wedding-pink/30 rounded-lg"
                >
                  {SITE.ctaSecondary.label}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white border-t border-wedding-pink/20 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">{SITE.name}</h3>
              <p className="text-sm text-gray-600">{SITE.editorial.credentials}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">문의</h4>
              <p className="text-sm text-gray-600">{SITE.contact.email}</p>
              <p className="text-xs text-gray-500 mt-1">{SITE.contact.supportHours}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">링크</h4>
              <nav className="space-y-1" aria-label="푸터 네비게이션">
                <Link href="/about" className="block text-sm text-gray-600 hover:text-wedding-pink">소개</Link>
                <Link href="/contact" className="block text-sm text-gray-600 hover:text-wedding-pink">문의</Link>
                <Link href="/terms" className="block text-sm text-gray-600 hover:text-wedding-pink">이용약관</Link>
                <Link href="/privacy" className="block text-sm text-gray-600 hover:text-wedding-pink">개인정보처리방침</Link>
                <Link href="/disclaimer" className="block text-sm text-gray-600 hover:text-wedding-pink">면책사항</Link>
              </nav>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 pt-6 border-t border-wedding-pink/20">
            <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <FixedCta />
      <FloatingCta />
      <ExitPopup />
    </div>
  )
}

