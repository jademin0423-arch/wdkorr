// components/site/components/FloatingCta.tsx
import Link from 'next/link'

export function FloatingCta() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .floating-cta {
          position: fixed;
          right: 20px;
          bottom: 120px;
          z-index: 9999;
          background: #FF6F61;
          color: #ffffff;
          padding: 14px 26px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          cursor: pointer;
          transition: all 0.25s ease;
          animation: pulseCTA 1.8s infinite ease-in-out;
          text-decoration: none;
          display: inline-block;
        }

        @media (hover: hover) {
          .floating-cta:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 32px rgba(0,0,0,0.25);
          }
        }

        @media (max-width: 768px) {
          .floating-cta {
            bottom: 20px;
            right: 16px;
            padding: 12px 20px;
            font-size: 14px;
            border-radius: 40px;
          }
        }

        @keyframes pulseCTA {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
      ` }} />
      <Link href="https://ad.cpaad.co.kr/wedunited01/jade888" className="floating-cta">
        🎁 무료 초대권 신청하기
      </Link>
    </>
  )
}

