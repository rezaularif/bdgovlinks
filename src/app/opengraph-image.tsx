import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'BdGovLinks - Bangladesh Government Website Directory'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0b1220',
          backgroundImage: 'linear-gradient(135deg, #0b1220 0%, #1e293b  100%)',
        }}
      >
        {/* Bangladesh Flag Circle */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#dc2626',
            }}
          />
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          BdGovLinks
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: '#16a34a',
            textAlign: 'center',
            marginBottom: 20,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Bangladesh Government Websites
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 800,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Unofficial Directory
        </div>

        {/* Website count badge */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            border: '2px solid #16a34a',
            borderRadius: 25,
            padding: '8px 20px',
            color: '#16a34a',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          111+ Gov Websites
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
