import { useEffect, useRef, useState, lazy, Suspense } from 'react'

// Lazy-load the globe so it doesn't block the initial render
const Globe = lazy(() => import('react-globe.gl'))

/*
 * NeoHappyLyf HQ (Tamil Nadu) → global NRI diaspora connections.
 * Latitudes/longitudes for the major cities where the Indian diaspora concentrates.
 */
const HQ = { lat: 12.26, lng: 78.13, label: 'NeoHappyLyf HQ' }

const CITIES = [
  { lat: 40.7128,  lng: -74.0060,  label: 'New York' },
  { lat: 51.5074,  lng: -0.1278,   label: 'London' },
  { lat: 25.2048,  lng: 55.2708,   label: 'Dubai' },
  { lat: 1.3521,   lng: 103.8198,  label: 'Singapore' },
  { lat: -33.8688, lng: 151.2093,  label: 'Sydney' },
  { lat: 43.6532,  lng: -79.3832,  label: 'Toronto' },
  { lat: 37.7749,  lng: -122.4194, label: 'San Francisco' },
  { lat: 3.1390,   lng: 101.6869,  label: 'Kuala Lumpur' },
  { lat: 48.8566,  lng: 2.3522,    label: 'Paris' },
  { lat: 52.5200,  lng: 13.4050,   label: 'Berlin' },
  { lat: 35.6762,  lng: 139.6503,  label: 'Tokyo' },
  { lat: -26.2041, lng: 28.0473,   label: 'Johannesburg' },
  { lat: -23.5505, lng: -46.6333,  label: 'São Paulo' },
  { lat: 19.4326,  lng: -99.1332,  label: 'Mexico City' },
]

// HQ → each city + a handful of inter-city cross connections
const ARCS = [
  ...CITIES.map(c => ({
    startLat: HQ.lat, startLng: HQ.lng,
    endLat: c.lat, endLng: c.lng,
    color: ['rgba(212,168,83,0.9)', 'rgba(245,215,142,0.4)'],
  })),
  // Inter-hub arcs for a networked feel
  { startLat: 40.7128, startLng: -74.0060, endLat: 51.5074, endLng: -0.1278,  color: ['rgba(212,168,83,0.6)', 'rgba(245,215,142,0.3)'] },
  { startLat: 25.2048, startLng: 55.2708,  endLat: 1.3521,  endLng: 103.8198, color: ['rgba(212,168,83,0.6)', 'rgba(245,215,142,0.3)'] },
  { startLat: 51.5074, startLng: -0.1278,  endLat: 43.6532, endLng: -79.3832, color: ['rgba(212,168,83,0.6)', 'rgba(245,215,142,0.3)'] },
  { startLat: 1.3521,  startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, color: ['rgba(212,168,83,0.6)', 'rgba(245,215,142,0.3)'] },
  { startLat: 37.7749, startLng: -122.4194, endLat: 35.6762, endLng: 139.6503, color: ['rgba(212,168,83,0.6)', 'rgba(245,215,142,0.3)'] },
]

const POINTS = [HQ, ...CITIES]

function GlobeInner({ size }) {
  const globeRef = useRef()

  useEffect(() => {
    if (!globeRef.current) return
    const g = globeRef.current
    // Camera: look at India so HQ is front-centre initially
    g.pointOfView({ lat: 18, lng: 78, altitude: 2.3 }, 0)
    // Auto-rotate
    const controls = g.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.45
    controls.enableZoom = false
    controls.enablePan = false
  }, [])

  return (
    <Globe
      ref={globeRef}
      width={size}
      height={size}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="https://unpkg.com/three-globe@2.31.0/example/img/earth-dark.jpg"
      bumpImageUrl="https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png"
      showAtmosphere={true}
      atmosphereColor="#D4A853"
      atmosphereAltitude={0.18}

      arcsData={ARCS}
      arcColor="color"
      arcStroke={0.35}
      arcDashLength={0.45}
      arcDashGap={2}
      arcDashInitialGap={() => Math.random() * 5}
      arcDashAnimateTime={2800}
      arcAltitudeAutoScale={0.45}

      pointsData={POINTS}
      pointColor={() => '#F5D78E'}
      pointAltitude={0.015}
      pointRadius={0.32}
      pointResolution={8}

      ringsData={POINTS}
      ringColor={() => 'rgba(212,168,83,0.8)'}
      ringMaxRadius={2.2}
      ringPropagationSpeed={1.4}
      ringRepeatPeriod={1800}
      ringAltitude={0.012}
    />
  )
}

export default function GlobeHero() {
  const wrapperRef = useRef(null)
  const [size, setSize] = useState(720)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Delay mount slightly so the hero text animates first
    const t = setTimeout(() => setMounted(true), 250)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const update = () => {
      if (!wrapperRef.current) return
      const w = wrapperRef.current.offsetWidth
      const h = wrapperRef.current.offsetHeight
      setSize(Math.min(w, h))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="globe-hero"
      aria-hidden="true"
    >
      {mounted && (
        <Suspense fallback={null}>
          <GlobeInner size={size} />
        </Suspense>
      )}
    </div>
  )
}
