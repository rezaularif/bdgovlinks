import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { ImageResponse } from '@vercel/og'

const size = { width: 1200, height: 630 }

const mainStyles = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#0b1220',
  backgroundImage: 'linear-gradient(135deg, #0b1220 0%, #1e293b  100%)',
  position: 'relative',
}

const flagStyles = {
  width: 120,
  height: 120,
  borderRadius: '50%',
  backgroundColor: '#16a34a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 40,
  position: 'relative',
}

const badgeStyles = {
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
}

const baseElement = React.createElement(
  'div',
  { style: mainStyles },
  React.createElement(
    'div',
    { style: flagStyles },
    React.createElement('div', {
      style: {
        width: 80,
        height: 80,
        borderRadius: '50%',
        backgroundColor: '#dc2626',
      },
    })
  ),
  React.createElement(
    'div',
    {
      style: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
    },
    'BdGovLinks'
  ),
  React.createElement(
    'div',
    {
      style: {
        fontSize: 32,
        color: '#16a34a',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
    },
    'Bangladesh Government Websites'
  ),
  React.createElement(
    'div',
    {
      style: {
        fontSize: 24,
        color: '#94a3b8',
        textAlign: 'center',
        maxWidth: 800,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
    },
    'Unofficial Directory'
  ),
  React.createElement('div', { style: badgeStyles }, '111+ Gov Websites')
)

const here = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(here, '..', 'public')

async function writeImage(filename) {
  const image = new ImageResponse(baseElement, size)
  const arrayBuffer = await image.arrayBuffer()
  await writeFile(path.join(outputDir, filename), Buffer.from(arrayBuffer))
}

await mkdir(outputDir, { recursive: true })
await writeImage('opengraph-image.png')
await writeImage('twitter-image.png')

console.log('Generated opengraph-image.png and twitter-image.png in /public')
