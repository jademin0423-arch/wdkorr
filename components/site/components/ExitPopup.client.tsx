// components/site/components/ExitPopup.client.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export function ExitPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const popupShownRef = useRef(false)
  const mobilePopupTriggeredRef = useRef(false)
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null)
  const pageLoadTimeRef = useRef(Date.now())

  useEffect(() => {
    const MIN_LOAD_TIME = 2000
    const STORAGE_KEY = 'exit-popup-shown'
    
    if (typeof window === 'undefined') return

    const hasShownBefore = localStorage.getItem(STORAGE_KEY) === 'true'
    if (hasShownBefore) return

    const checkCanShow = () => {
      return Date.now() - pageLoadTimeRef.current >= MIN_LOAD_TIME
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !popupShownRef.current && window.innerWidth > 768 && checkCanShow()) {
        setIsOpen(true)
        popupShownRef.current = true
        localStorage.setItem(STORAGE_KEY, 'true')
        document.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    const handleScroll = () => {
      if (window.innerWidth <= 768 && !mobilePopupTriggeredRef.current && checkCanShow()) {
        if (scrollTimerRef.current) {
          clearTimeout(scrollTimerRef.current)
        }
        scrollTimerRef.current = setTimeout(() => {
          setIsOpen(true)
          mobilePopupTriggeredRef.current = true
          localStorage.setItem(STORAGE_KEY, 'true')
          window.removeEventListener('scroll', handleScroll)
        }, 1600)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current)
      }
    }
  }, [])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .exit-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
        }

        .exit-popup-box {
          background: #fff7f8;
          border-radius: 16px;
          padding: 32px 28px;
          max-width: 420px;
          width: 90%;
          text-align: center;
          box-shadow: 0 12px 32px rgba(0,0,0,0.25);
          animation: fadeIn 0.35s ease;
          font-family: 'Pretendard', sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .exit-popup-title {
          font-size: 22px;
          font-weight: 700;
          color: #ff6f61;
          margin-bottom: 14px;
        }

        .exit-popup-text {
          font-size: 16px;
          color: #333;
          line-height: 1.6;
          margin-bottom: 22px;
        }

        .exit-popup-btn {
          background: #ff6f61;
          color: #fff;
          display: inline-block;
          padding: 14px 22px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(255,111,97,0.4);
          transition: all 0.25s ease;
          text-decoration: none;
        }

        .exit-popup-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(255,111,97,0.45);
        }

        .exit-popup-close {
          margin-top: 16px;
          font-size: 14px;
          color: #777;
          cursor: pointer;
        }
      ` }} />
      <div className="exit-popup-overlay" onClick={handleOverlayClick}>
        <div className="exit-popup-box">
          <div className="exit-popup-title">🎁 무료 초대권 놓치지 마세요!</div>
          <div className="exit-popup-text">
            예비부부님, 나가기 전에 <b>웨딩박람회 무료 초대권</b>을 받아보세요.<br />
            혜택은 선착순으로 제공됩니다.
          </div>
          <Link href="https://ad.cpaad.co.kr/wedunited01/jade888" className="exit-popup-btn">
            무료 초대권 받기
          </Link>
          <div className="exit-popup-close" onClick={handleClose}>
            닫기
          </div>
        </div>
      </div>
    </>
  )
}

