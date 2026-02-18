// components/site/components/FixedCta.tsx
import Link from 'next/link'

export function FixedCta() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .wf-cta-banner {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          background: #ffffff;
          border-top: 1px solid #eee;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
          z-index: 9999;
          font-family: inherit;
        }

        .wf-cta-banner .wf-cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .wf-cta-banner .wf-cta-text {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          letter-spacing: -0.02em;
        }

        .wf-cta-banner .wf-cta-btn {
          flex-shrink: 0;
          padding: 10px 20px;
          border-radius: 999px;
          background: #ff4e6a;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 10px rgba(255, 78, 106, 0.4);
          transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
          white-space: nowrap;
        }

        .wf-cta-banner .wf-cta-btn:hover {
          background: #ff3655;
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(255, 78, 106, 0.5);
        }

        @media (max-width: 768px) {
          .wf-cta-banner {
            top: 64px;
            bottom: auto;
            border-top: none;
            border-bottom: 1px solid #eee;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          }

          .wf-cta-banner .wf-cta-inner {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 14px;
          }

          .wf-cta-banner .wf-cta-text {
            font-size: 14px;
          }

          .wf-cta-banner .wf-cta-btn {
            width: 100%;
            text-align: center;
            margin-top: 4px;
          }
        }
      ` }} />
      <div className="wf-cta-banner">
        <div className="wf-cta-inner">
          <span className="wf-cta-text">
            가장 가까운 웨딩박람회 초대권 무료 신청 🎁
          </span>
          <Link href="https://replyalba.com/pt/wc4ZSDV18m" className="wf-cta-btn">
            지금 신청하기
          </Link>
        </div>
      </div>
    </>
  )
}

