import { useState, useEffect } from 'react'
import {
  ExternalLink, Mail, MapPin, Linkedin, Twitter,
  ChevronDown, Menu, X, ArrowRight,
  Building2, Brain, Heart, Users, Zap, Settings
} from 'lucide-react'

/* ─── Global Styles ─────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background: #0A0A0A;
      color: #F5F5F0;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      line-height: 1.6;
    }

    /* Grain texture overlay */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.35;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #0A0A0A; }
    ::-webkit-scrollbar-thumb { background: #D4A853; border-radius: 2px; }

    /* Fonts */
    .playfair { font-family: 'Playfair Display', serif; }

    /* Keyframes */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(36px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.4; }
    }
    @keyframes chevron-bounce {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(6px); }
    }

    /* Scroll-reveal */
    .reveal {
      opacity: 0;
      transform: translateY(36px);
      transition: opacity 0.75s ease, transform 0.75s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Gold shimmer text */
    .gold-text {
      background: linear-gradient(90deg, #D4A853 0%, #F5D78E 50%, #D4A853 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 5s linear infinite;
    }

    /* Navigation */
    .nav-root {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      transition: background 0.4s, border-color 0.4s, backdrop-filter 0.4s;
    }
    .nav-root.scrolled {
      background: rgba(10,10,10,0.93);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid rgba(212,168,83,0.14);
    }
    .nav-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 40px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-link {
      color: rgba(245,245,240,0.65);
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: color 0.25s;
      white-space: nowrap;
    }
    .nav-link:hover { color: #D4A853; }

    /* Buttons */
    .btn-gold {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #D4A853;
      color: #0A0A0A;
      padding: 13px 26px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      transition: background 0.25s, transform 0.2s;
      text-decoration: none;
      border-radius: 1px;
    }
    .btn-gold:hover { background: #F5D78E; transform: translateY(-1px); }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      color: #D4A853;
      padding: 12px 24px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 13px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      border: 1px solid rgba(212,168,83,0.5);
      cursor: pointer;
      transition: all 0.25s;
      text-decoration: none;
      border-radius: 1px;
    }
    .btn-ghost:hover { background: #D4A853; color: #0A0A0A; border-color: #D4A853; }

    .btn-ghost-sm {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: transparent;
      color: #D4A853;
      padding: 9px 18px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      border: 1px solid rgba(212,168,83,0.4);
      cursor: pointer;
      transition: all 0.25s;
      text-decoration: none;
      border-radius: 1px;
    }
    .btn-ghost-sm:hover { background: #D4A853; color: #0A0A0A; }

    /* Venture cards */
    .venture-card {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(212,168,83,0.12);
      padding: 40px;
      position: relative;
      overflow: hidden;
      transition: transform 0.35s, border-color 0.35s, background 0.35s;
    }
    .venture-card::before {
      content: '';
      position: absolute;
      left: 0; top: 0;
      width: 3px; height: 0;
      background: #D4A853;
      transition: height 0.4s ease;
    }
    .venture-card:hover {
      transform: translateY(-5px);
      border-color: rgba(212,168,83,0.35);
      background: rgba(212,168,83,0.03);
    }
    .venture-card:hover::before { height: 100%; }

    /* Status badges */
    .badge-live {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(34,197,94,0.08);
      border: 1px solid rgba(34,197,94,0.22);
      color: #22c55e;
      font-size: 10px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      padding: 4px 10px; border-radius: 20px;
    }
    .badge-upcoming {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(212,168,83,0.08);
      border: 1px solid rgba(212,168,83,0.22);
      color: #D4A853;
      font-size: 10px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      padding: 4px 10px; border-radius: 20px;
    }
    .live-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: currentColor;
      animation: pulse-dot 1.8s ease infinite;
    }

    /* Section label */
    .section-label {
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #D4A853;
      font-weight: 600;
    }
    .gold-rule {
      width: 48px; height: 1px;
      background: #D4A853;
      margin: 20px 0 28px;
    }

    /* Timeline */
    .timeline-wrap { max-width: 680px; }
    .tl-item {
      position: relative;
      padding-left: 56px;
      margin-bottom: 44px;
    }
    .tl-item::after {
      content: '';
      position: absolute;
      left: 18px; top: 22px;
      width: 1px;
      height: calc(100% + 22px);
      background: rgba(212,168,83,0.18);
    }
    .tl-item:last-child::after { display: none; }
    .tl-dot {
      position: absolute;
      left: 11px; top: 9px;
      width: 15px; height: 15px;
      border-radius: 50%;
      border: 2px solid #D4A853;
      background: #0A0A0A;
    }

    /* Form */
    .field-label {
      display: block;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(245,245,240,0.38);
      margin-bottom: 8px;
    }
    .form-ctrl {
      width: 100%;
      background: rgba(255,255,255,0.035);
      border: 1px solid rgba(212,168,83,0.18);
      color: #F5F5F0;
      padding: 15px 18px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      outline: none;
      transition: border-color 0.25s;
      border-radius: 1px;
    }
    .form-ctrl:focus { border-color: rgba(212,168,83,0.6); }
    .form-ctrl::placeholder { color: rgba(245,245,240,0.22); }
    .form-ctrl option { background: #141414; }

    /* Automation feature row */
    .auto-row {
      display: flex;
      gap: 20px;
      padding: 24px 0;
      border-bottom: 1px solid rgba(212,168,83,0.07);
    }
    .auto-icon {
      width: 42px; height: 42px; flex-shrink: 0;
      background: rgba(212,168,83,0.07);
      border: 1px solid rgba(212,168,83,0.15);
      display: flex; align-items: center; justify-content: center;
      border-radius: 2px;
    }

    /* Footer hover links */
    .foot-link {
      display: block;
      font-size: 13px;
      color: rgba(245,245,240,0.45);
      text-decoration: none;
      margin-bottom: 10px;
      cursor: pointer;
      transition: color 0.2s;
    }
    .foot-link:hover { color: #D4A853; }

    /* Mobile menu */
    .mobile-nav {
      display: none;
    }
    .hamburger {
      display: none;
      background: none;
      border: none;
      color: #F5F5F0;
      cursor: pointer;
      padding: 4px;
    }

    /* Responsive */
    @media (max-width: 900px) {
      .desktop-nav { display: none !important; }
      .hamburger { display: flex; }
      .mobile-nav.open {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 72px; left: 0; right: 0;
        background: rgba(10,10,10,0.97);
        border-top: 1px solid rgba(212,168,83,0.1);
        padding: 28px 32px;
        gap: 22px;
        z-index: 999;
      }
      .two-col { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr !important; }
      .ventures-grid { grid-template-columns: 1fr !important; }
      .leader-grid { grid-template-columns: 1fr !important; }
      .footer-grid { grid-template-columns: 1fr 1fr !important; }
      .nav-inner { padding: 0 20px; }
      section { padding-left: 20px !important; padding-right: 20px !important; }
    }
    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr !important; }
      .hero-stats { gap: 24px !important; }
      .cta-grid { grid-template-columns: 1fr !important; }
      .about-quad { grid-template-columns: 1fr !important; }
    }

    /* ── Phase 2 ── */

    /* Stats bar */
    .stats-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border: 1px solid rgba(212,168,83,0.12);
    }
    .stat-cell {
      padding: 44px 32px;
      border-right: 1px solid rgba(212,168,83,0.1);
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: background 0.3s;
    }
    .stat-cell:last-child { border-right: none; }
    .stat-cell:hover { background: rgba(212,168,83,0.04); }
    @media (max-width: 768px) {
      .stats-bar { grid-template-columns: 1fr 1fr; }
      .stat-cell:nth-child(2) { border-right: none; }
      .stat-cell { border-bottom: 1px solid rgba(212,168,83,0.1); }
    }
    @media (max-width: 480px) {
      .stats-bar { grid-template-columns: 1fr; }
      .stat-cell { border-right: none; }
    }

    /* Ecosystem diagram */
    @keyframes orbit {
      from { transform: rotate(0deg) translateX(180px) rotate(0deg); }
      to   { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
    }
    @keyframes float-node {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-8px); }
    }
    .eco-node {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: default;
      transition: transform 0.3s;
    }
    .eco-node:hover { transform: scale(1.06); }
    .eco-dot {
      width: 90px; height: 90px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; gap: 4px;
      border: 1px solid;
      transition: box-shadow 0.3s;
    }
    .eco-dot:hover { box-shadow: 0 0 30px rgba(212,168,83,0.25); }

    /* Venture detail sections */
    .vd-section {
      position: relative;
      overflow: hidden;
    }
    .vd-number {
      position: absolute;
      font-family: 'Playfair Display', serif;
      font-size: clamp(120px, 18vw, 220px);
      font-weight: 800;
      line-height: 1;
      pointer-events: none;
      user-select: none;
      opacity: 0.03;
      color: #ffffff;
    }
    .vd-feature-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.04em;
      border: 1px solid;
      white-space: nowrap;
    }
    .vd-visual {
      position: relative;
      border-radius: 2px;
      overflow: hidden;
      min-height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .vd-visual-inner {
      position: absolute; inset: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 20px;
    }
    .vd-tag {
      font-size: 10px; letter-spacing: 0.18em;
      text-transform: uppercase; font-weight: 600;
      padding: 5px 14px;
      border-radius: 20px;
    }
    @media (max-width: 900px) {
      .vd-grid { grid-template-columns: 1fr !important; }
      .vd-visual { min-height: 280px !important; }
      .vd-number { font-size: 100px !important; }
    }
  `}</style>
)

/* ─── Data ───────────────────────────────────────────────────────────────── */
const VENTURES = [
  {
    name: 'IndiaTherapist.com',
    tagline: "India's premier NRI online therapy platform.",
    desc: 'Connecting the Indian diaspora with licensed Indian therapists via video sessions and subscription-based mental health plans. Culturally rooted support for those who need it most.',
    url: 'https://indiatherapist.com',
    live: true,
    statusLabel: 'Live Platform',
    Icon: Brain,
    accent: '#7C6AF7',
  },
  {
    name: 'IndianLifeCoaches.com',
    tagline: 'Holistic life coaching for NRIs seeking growth and freedom.',
    desc: 'Career coaching, financial freedom pathways, and personal development programs — delivered through subscription-based 1:1 video coaching sessions.',
    url: 'https://indianlifecoaches.com',
    live: true,
    statusLabel: 'Live Platform',
    Icon: Users,
    accent: '#4ECDC4',
  },
  {
    name: 'IndianDivorceCoach.com',
    tagline: 'Confidential divorce coaching for South Asians worldwide.',
    desc: 'Specialized emotional support and practical guidance for individuals navigating separation — with deep cultural sensitivity and zero judgment.',
    url: 'https://indiandivorcecoach.com',
    live: true,
    statusLabel: 'Live Platform',
    Icon: Heart,
    accent: '#F4788A',
  },
  {
    name: 'KrishnanGovindan.com',
    tagline: "Founder's platform for thought leadership and mentorship.",
    desc: 'Speaking engagements, mentorship programs, and thought leadership at the intersection of mental wellness, entrepreneurship, and business innovation.',
    url: 'https://krishnangovindan.com',
    live: false,
    statusLabel: 'Launching 2025',
    Icon: Building2,
    accent: '#D4A853',
  },
]

const MILESTONES = [
  {
    year: '2022',
    title: 'IndiaTherapist.com Launched',
    desc: 'The founding vision takes shape — a pre-incorporation project connecting the Indian diaspora with licensed therapists from India. The problem was real; the solution was needed.',
  },
  {
    year: 'June 2023',
    title: 'Neo HappyLyf Incorporated',
    desc: 'Neo HappyLyf Mind Care For U Private Limited officially registered under the Companies Act. MSME/Udyam Registration: UDYAM-TN-11-0044799. Headquarters: Krishnagiri, Tamil Nadu.',
  },
  {
    year: '2023',
    title: 'IndianLifeCoaches.com Goes Live',
    desc: 'Expanding the ecosystem with holistic life coaching — career, financial freedom, and personal development for the NRI community through expert-led subscription programmes.',
  },
  {
    year: '2024',
    title: 'IndianDivorceCoach.com Launched',
    desc: 'A specialized vertical addressing one of life\'s hardest transitions — with culturally sensitive coaching for South Asians navigating separation and rebuilding their lives.',
  },
  {
    year: '2024',
    title: 'Business Automation Division',
    desc: 'NeoHappyLyf enters its second major vertical — building custom automation systems and digital tools for businesses struggling with repetitive day-to-day operations.',
  },
  {
    year: '2025',
    title: 'Scaling & Founder Brand Launch',
    desc: 'KrishnanGovindan.com launches as a thought leadership platform. Regional expansion across Tamil Nadu begins. Global NRI outreach scales across Southeast Asia and beyond.',
  },
]

const VENTURE_DETAILS = [
  {
    num: '01',
    id: 'v-therapy',
    name: 'IndiaTherapist.com',
    tagline: '#1 Indian Online Therapy Platform for NRIs',
    desc: 'Connecting Non-Resident Indians with licensed Indian therapists via secure, encrypted video sessions. Anxiety, depression, relationship issues, trauma, career stress — all addressed through culturally relevant mental health support from therapists who truly understand your world.',
    features: ['Video Therapy Sessions', 'Verified Licensed Therapists', 'Subscription Plans', 'Confidential & Secure', 'Culturally Relevant', 'NRI-Specialised'],
    target: 'NRIs in the US, UK, Middle East, Australia & Southeast Asia',
    url: 'https://indiatherapist.com',
    live: true,
    accent: '#6C9FD4',
    gradStart: 'rgba(108,159,212,0.12)',
    gradEnd: 'rgba(108,159,212,0.03)',
    visual: { bg: 'rgba(108,159,212,0.07)', border: 'rgba(108,159,212,0.18)', tagBg: 'rgba(108,159,212,0.12)', tagColor: '#6C9FD4', label: 'Mental Wellness', Icon: Brain },
    flip: false,
  },
  {
    num: '02',
    id: 'v-coaches',
    name: 'IndianLifeCoaches.com',
    tagline: 'Complete Holistic Lifestyle Transformation for NRIs',
    desc: "Connecting NRIs to India's top life coaches for financial freedom, career acceleration, personal empowerment, and relationship transformation. Subscription-based 1:1 video coaching with structured goal-setting, strategy sessions, and on-demand content.",
    features: ['1:1 Coaching Sessions', 'On-Demand Content Library', 'Goal-Setting Tools', 'Strategy Sessions', 'Financial Coaching', 'Career Acceleration'],
    target: 'NRIs seeking personal & professional transformation',
    url: 'https://indianlifecoaches.com',
    live: true,
    accent: '#D4A853',
    gradStart: 'rgba(212,168,83,0.1)',
    gradEnd: 'rgba(212,168,83,0.02)',
    visual: { bg: 'rgba(212,168,83,0.07)', border: 'rgba(212,168,83,0.2)', tagBg: 'rgba(212,168,83,0.12)', tagColor: '#D4A853', label: 'Life Coaching', Icon: Users },
    flip: true,
  },
  {
    num: '03',
    id: 'v-divorce',
    name: 'IndianDivorceCoach.com',
    tagline: 'Confidential Divorce Coaching with Cultural Sensitivity',
    desc: 'Specialised support for individuals navigating separation and divorce. Emotional coaching, practical step-by-step guidance, and a culturally aware approach built for the Indian diaspora — where family dynamics, social pressure, and personal dignity matter deeply.',
    features: ['Confidential Sessions', 'Emotional Support', 'Practical Guidance', 'Culturally Aware', 'Zero Judgement', 'Post-Divorce Rebuilding'],
    target: 'Individuals going through or considering divorce',
    url: 'https://indiandivorcecoach.com',
    live: true,
    accent: '#9B8EC4',
    gradStart: 'rgba(155,142,196,0.1)',
    gradEnd: 'rgba(155,142,196,0.02)',
    visual: { bg: 'rgba(155,142,196,0.07)', border: 'rgba(155,142,196,0.18)', tagBg: 'rgba(155,142,196,0.12)', tagColor: '#9B8EC4', label: 'Divorce Coaching', Icon: Heart },
    flip: false,
  },
  {
    num: '04',
    id: 'v-founder',
    name: 'KrishnanGovindan.com',
    tagline: 'Founder. Thought Leader. Wellness Entrepreneur.',
    desc: "Krishnan Govindan's personal brand and thought leadership platform — at the intersection of mental wellness, entrepreneurship, and business automation. Speaking engagements, public mentorship, long-form writing, and a growing body of work that challenges how India thinks about health and efficiency.",
    features: ['Keynote Speaking', 'Public Mentorship', 'Thought Leadership Blog', 'Media & Press', 'Entrepreneurship Insights', 'Wellness Innovation'],
    target: 'Entrepreneurs, wellness professionals, and the Indian startup ecosystem',
    url: 'https://krishnangovindan.com',
    live: false,
    accent: '#D4A853',
    gradStart: 'rgba(212,168,83,0.1)',
    gradEnd: 'rgba(212,168,83,0.02)',
    visual: { bg: 'rgba(212,168,83,0.06)', border: 'rgba(212,168,83,0.2)', tagBg: 'rgba(212,168,83,0.1)', tagColor: '#D4A853', label: 'Personal Brand', Icon: Building2 },
    flip: true,
  },
]

const ECOSYSTEM_NODES = [
  { label: 'IndiaTherapist', sublabel: '.com', color: '#6C9FD4', angle: -90,  Icon: Brain },
  { label: 'IndianLife',     sublabel: 'Coaches.com', color: '#D4A853', angle: 0,    Icon: Users },
  { label: 'IndianDivorce',  sublabel: 'Coach.com',   color: '#9B8EC4', angle: 90,   Icon: Heart },
  { label: 'Krishnan',       sublabel: 'Govindan.com', color: '#F4788A', angle: 180,  Icon: Building2 },
]

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ─── Components ─────────────────────────────────────────────────────────── */
function Logo({ onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer' }}>
      <div style={{
        width: 34, height: 34, background: '#D4A853',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: 17, color: '#0A0A0A', lineHeight: 1 }}>N</span>
      </div>
      <div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: 16, letterSpacing: '0.02em', lineHeight: 1.1 }}>NeoHappyLyf</div>
        <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.35)', lineHeight: 1 }}>Mind Care For U</div>
      </div>
    </div>
  )
}

/* ─── Main App ───────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [heroShift, setHeroShift]     = useState(0)
  const [form, setForm]               = useState({ name: '', email: '', company: '', interest: '', message: '' })
  const [submitted, setSubmitted]     = useState(false)

  useReveal()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      setHeroShift(window.scrollY * 0.38)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = (id) => { scrollTo(id); setMobileOpen(false) }
  const handleForm = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true) }

  const NAV_ITEMS = [
    ['about', 'About'],
    ['ventures', 'Ventures'],
    ['ecosystem', 'Ecosystem'],
    ['automation', 'Automation'],
    ['journey', 'Journey'],
    ['leadership', 'Leadership'],
    ['contact', 'Contact'],
  ]

  return (
    <>
      <GlobalStyles />

      {/* ── Schema.org ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Neo HappyLyf Mind Care For U Private Limited',
        alternateName: 'NeoHappyLyf',
        url: 'https://neohappylyf.com',
        description: "India's mental wellness and business automation conglomerate operating four specialized digital platforms for NRI communities worldwide.",
        address: { '@type': 'PostalAddress', addressLocality: 'Krishnagiri', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
        founder: { '@type': 'Person', name: 'Krishnan Govindan' },
        foundingDate: '2023-06',
        email: 'contact@neohappylyf.com',
        identifier: 'UDYAM-TN-11-0044799',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Wellness & Automation Platforms',
          itemListElement: VENTURES.map(v => ({ '@type': 'Offer', name: v.name, url: v.url }))
        }
      })}} />

      {/* ══════════════════════════════════ NAVIGATION ══════════════════════════════════ */}
      <nav className={`nav-root${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Logo onClick={() => nav('hero')} />

          {/* Desktop */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {NAV_ITEMS.map(([id, label]) => (
              <span key={id} className="nav-link" onClick={() => nav(id)}>{label}</span>
            ))}
            <button className="btn-gold" style={{ padding: '10px 20px', fontSize: 12 }} onClick={() => nav('partner')}>
              Partner With Us
            </button>
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
          {NAV_ITEMS.map(([id, label]) => (
            <span key={id} className="nav-link" style={{ fontSize: 14 }} onClick={() => nav(id)}>{label}</span>
          ))}
          <button className="btn-gold" style={{ alignSelf: 'flex-start' }} onClick={() => nav('partner')}>
            Partner With Us <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════ HERO ══════════════════════════════════ */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '130px 40px 90px' }}>

        {/* Parallax vertical lines */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, transform: `translateY(${heroShift}px)`, pointerEvents: 'none', opacity: 0.04 }}>
          {[8, 22, 38, 54, 70, 86].map(p => (
            <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: 1, background: '#D4A853' }} />
          ))}
        </div>

        {/* Glow */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '28%', left: '55%', transform: 'translate(-50%,-50%)', width: 900, height: 900, background: 'radial-gradient(circle, rgba(212,168,83,0.055) 0%, transparent 68%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36, animation: 'fadeInUp 0.7s ease both' }}>
            <div style={{ width: 36, height: 1, background: '#D4A853' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4A853', fontWeight: 600 }}>
              Krishnagiri, Tamil Nadu, India &nbsp;·&nbsp; Est. 2023
            </span>
          </div>

          {/* Headline */}
          <h1 className="playfair" style={{
            fontSize: 'clamp(46px, 6.5vw, 92px)',
            fontWeight: 700,
            lineHeight: 1.08,
            maxWidth: 840,
            marginBottom: 32,
            animation: 'fadeInUp 0.7s ease 0.15s both',
          }}>
            Healing Minds.<br />
            <span className="gold-text">Building Systems.</span>
          </h1>

          {/* Sub-headline */}
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 19px)',
            color: 'rgba(245,245,240,0.6)',
            maxWidth: 560,
            lineHeight: 1.85,
            fontWeight: 300,
            marginBottom: 48,
            animation: 'fadeInUp 0.7s ease 0.3s both',
          }}>
            Neo HappyLyf is India's emerging wellness and automation conglomerate — four specialised platforms serving the mental, emotional, and operational needs of individuals and businesses worldwide.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animation: 'fadeInUp 0.7s ease 0.45s both' }}>
            <button className="btn-gold" onClick={() => nav('ventures')}>
              Explore Our Ventures <ArrowRight size={15} />
            </button>
            <button className="btn-ghost" onClick={() => nav('partner')}>
              Invest in NeoHappyLyf
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: 'flex', gap: 52, marginTop: 80, flexWrap: 'wrap', animation: 'fadeInUp 0.7s ease 0.6s both' }}>
            {[
              ['4', 'Active Platforms'],
              ['2022', 'Operating Since'],
              ['NRI-Focused', 'Global Reach'],
              ['MSME Certified', 'Govt. Registered'],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="playfair" style={{ fontSize: 28, fontWeight: 700, color: '#D4A853', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <button
          onClick={() => nav('about')}
          aria-label="Scroll to about section"
          style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.25)' }}>Scroll</span>
          <ChevronDown size={16} color="rgba(245,245,240,0.25)" style={{ animation: 'chevron-bounce 2s ease infinite' }} />
        </button>
      </section>

      {/* ══════════════════════════════════ ABOUT ══════════════════════════════════ */}
      <section id="about" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div className="reveal">
                <span className="section-label">About The Company</span>
                <div className="gold-rule" />
                <h2 className="playfair" style={{ fontSize: 'clamp(28px, 3.5vw, 50px)', fontWeight: 700, lineHeight: 1.18, marginBottom: 28 }}>
                  A Conglomerate Built<br />on <em style={{ color: '#D4A853' }}>Purpose</em>
                </h2>
              </div>
              <div className="reveal" style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.95, fontSize: 15 }}>
                <p style={{ marginBottom: 18 }}>
                  Neo HappyLyf Mind Care For U Private Limited is an MSME-registered enterprise headquartered in Krishnagiri, Tamil Nadu. Founded in June 2023 by Krishnan Govindan, the company operates at the intersection of mental wellness and technology innovation.
                </p>
                <p style={{ marginBottom: 18 }}>
                  Our ecosystem addresses two of the most pressing challenges of our era: the mental health crisis among the Indian diaspora, and the operational inefficiencies that prevent growing businesses from scaling. We don't just build products — we build platforms that genuinely change lives.
                </p>
                <p>
                  With Udyam Registration <strong style={{ color: 'rgba(245,245,240,0.8)' }}>UDYAM-TN-11-0044799</strong> and a growing portfolio of specialised platforms, NeoHappyLyf is positioned to become one of India's defining wellness and automation companies of this decade.
                </p>
              </div>
            </div>

            {/* Right — quad grid */}
            <div className="about-quad reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[
                { label: 'Mental Wellness', desc: 'Therapy, coaching & emotional support platforms for the Indian diaspora.' },
                { label: 'Business Automation', desc: 'Custom workflow & process automation systems for growing businesses.' },
                { label: 'NRI-Focused', desc: 'Services designed with deep cultural context for Indians worldwide.' },
                { label: 'Culturally Rooted', desc: 'Solutions that honour South Asian values, family dynamics, and lived experience.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(212,168,83,0.03)', border: '1px solid rgba(212,168,83,0.1)', padding: '28px 24px' }}>
                  <div style={{ width: 7, height: 7, background: '#D4A853', borderRadius: '50%', marginBottom: 16 }} />
                  <div className="playfair" style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.45)', lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ VENTURES ══════════════════════════════════ */}
      <section id="ventures" style={{ padding: '120px 40px', background: 'rgba(255,255,255,0.012)', borderTop: '1px solid rgba(212,168,83,0.07)', borderBottom: '1px solid rgba(212,168,83,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div className="reveal" style={{ marginBottom: 64 }}>
            <span className="section-label">Business Verticals</span>
            <div className="gold-rule" />
            <h2 className="playfair" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.18, maxWidth: 560 }}>
              Four Platforms. <em style={{ color: '#D4A853' }}>One Vision.</em>
            </h2>
            <p style={{ color: 'rgba(245,245,240,0.45)', marginTop: 16, maxWidth: 500, lineHeight: 1.85, fontSize: 15 }}>
              Each venture operates independently while contributing to the NeoHappyLyf mission of making wellness and efficiency accessible to every Indian — at home and abroad.
            </p>
          </div>

          <div className="ventures-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {VENTURES.map((v, i) => {
              const Icon = v.Icon
              return (
                <article key={v.name} className="venture-card reveal" aria-label={v.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                    <div style={{ width: 50, height: 50, background: `${v.accent}12`, border: `1px solid ${v.accent}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                      <Icon size={22} color={v.accent} aria-hidden="true" />
                    </div>
                    {v.live
                      ? <span className="badge-live"><span className="live-dot" />{v.statusLabel}</span>
                      : <span className="badge-upcoming"><span className="live-dot" />{v.statusLabel}</span>
                    }
                  </div>

                  <h3 className="playfair" style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, color: '#F5F5F0' }}>{v.name}</h3>
                  <p style={{ fontSize: 13, color: '#D4A853', marginBottom: 12, fontWeight: 500, lineHeight: 1.55 }}>{v.tagline}</p>
                  <p style={{ fontSize: 14, color: 'rgba(245,245,240,0.45)', lineHeight: 1.8, marginBottom: 30 }}>{v.desc}</p>

                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="btn-ghost-sm" aria-label={`Visit ${v.name}`}>
                    Visit Platform <ExternalLink size={12} />
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ STATS BAR ══════════════════════════════════ */}
      <section style={{ padding: '0 40px', background: '#060606', borderTop: '1px solid rgba(212,168,83,0.1)', borderBottom: '1px solid rgba(212,168,83,0.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="stats-bar">
            {[
              { value: '4', label: 'Active Platforms', sub: 'Wellness & Automation' },
              { value: '2+', label: 'Years of Impact', sub: 'Operating Since 2022' },
              { value: '20+', label: 'Countries Served', sub: 'NRI Communities Worldwide' },
              { value: 'MSME', label: 'Govt. Registered', sub: 'UDYAM-TN-11-0044799' },
            ].map((s, i) => (
              <div key={i} className="stat-cell reveal">
                <div className="playfair" style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, color: '#D4A853', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F5F5F0', marginBottom: 4, letterSpacing: '0.02em' }}>{s.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(245,245,240,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ ECOSYSTEM ══════════════════════════════════ */}
      <section id="ecosystem" style={{ padding: '120px 40px', background: 'rgba(255,255,255,0.008)', borderBottom: '1px solid rgba(212,168,83,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
            <span className="section-label">The NeoHappyLyf Ecosystem</span>
            <div className="gold-rule" style={{ margin: '20px auto 28px' }} />
            <h2 className="playfair" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, lineHeight: 1.18, maxWidth: 600, margin: '0 auto 16px' }}>
              One Holding Company.<br /><em style={{ color: '#D4A853' }}>Four Focused Platforms.</em>
            </h2>
            <p style={{ color: 'rgba(245,245,240,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.85, fontSize: 15 }}>
              NeoHappyLyf sits at the centre of a purpose-built ecosystem — each venture independently operated yet unified by a shared mission.
            </p>
          </div>

          {/* Ecosystem diagram */}
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 560, height: 560 }}>

              {/* Connector rings */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
                <circle cx="280" cy="280" r="178" fill="none" stroke="rgba(212,168,83,0.07)" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="280" cy="280" r="118" fill="none" stroke="rgba(212,168,83,0.05)" strokeWidth="1" />
                {/* Spoke lines */}
                {[[-90,0],[0,180],[90,360],[180,180]].map(([deg], i) => {
                  const rad = (deg - 90) * Math.PI / 180
                  return (
                    <line key={i}
                      x1="280" y1="280"
                      x2={280 + Math.cos(rad) * 178} y2={280 + Math.sin(rad) * 178}
                      stroke="rgba(212,168,83,0.1)" strokeWidth="1"
                    />
                  )
                })}
              </svg>

              {/* Centre hub */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 10 }}>
                <div style={{ width: 110, height: 110, borderRadius: '50%', background: '#D4A853', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(212,168,83,0.25)' }}>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: 22, color: '#0A0A0A', lineHeight: 1 }}>Neo</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 11, color: '#0A0A0A', lineHeight: 1.2, letterSpacing: '0.05em' }}>HappyLyf</span>
                </div>
              </div>

              {/* Spoke nodes — top, right, bottom, left */}
              {[
                { label: 'IndiaTherapist', sub: '.com', color: '#6C9FD4', Icon: Brain,     top: '0%',   left: '50%',  tx: '-50%', ty: '0' },
                { label: 'IndianLife',     sub: 'Coaches', color: '#D4A853', Icon: Users,   top: '50%',  left: '100%', tx: '-100%', ty: '-50%' },
                { label: 'IndianDivorce',  sub: 'Coach',   color: '#9B8EC4', Icon: Heart,   top: '100%', left: '50%',  tx: '-50%', ty: '-100%' },
                { label: 'Krishnan',       sub: 'Govindan', color: '#F4788A', Icon: Building2, top: '50%', left: '0%',  tx: '0', ty: '-50%' },
              ].map(({ label, sub, color, Icon, top, left, tx, ty }, i) => (
                <div key={i} style={{ position: 'absolute', top, left, transform: `translate(${tx}, ${ty})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 5, animation: `float-node ${3 + i * 0.5}s ease-in-out infinite` }}>
                  <div style={{ width: 82, height: 82, borderRadius: '50%', background: `${color}12`, border: `1px solid ${color}35`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, transition: 'box-shadow 0.3s', cursor: 'default' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 28px ${color}30`}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                    <Icon size={20} color={color} aria-hidden="true" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#F5F5F0', letterSpacing: '0.04em', lineHeight: 1.2 }}>{label}</div>
                    <div style={{ fontSize: 10, color, fontWeight: 500 }}>{sub}</div>
                  </div>
                </div>
              ))}

              {/* Business Automation — offset node */}
              <div style={{ position: 'absolute', top: '22%', right: '-60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 5, animation: 'float-node 4s ease-in-out infinite' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={18} color="#D4A853" aria-hidden="true" />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(245,245,240,0.6)', letterSpacing: '0.04em' }}>Automation</div>
                  <div style={{ fontSize: 10, color: '#D4A853', fontWeight: 500 }}>Division</div>
                </div>
              </div>
            </div>
          </div>

          {/* Connecting description */}
          <div className="reveal" style={{ textAlign: 'center', marginTop: 64 }}>
            <p style={{ color: 'rgba(245,245,240,0.4)', fontSize: 14, maxWidth: 560, margin: '0 auto', lineHeight: 1.9 }}>
              Each platform addresses a distinct human need — therapy, growth, transition support, and leadership — while collectively forming a comprehensive wellness and productivity ecosystem for the global Indian community.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ VENTURE DETAIL SECTIONS ══════════════════════════════════ */}
      {VENTURE_DETAILS.map((v) => {
        const VisualIcon = v.visual.Icon
        return (
          <section key={v.id} id={v.id} className="vd-section" style={{ padding: '120px 40px', borderBottom: '1px solid rgba(212,168,83,0.07)', background: v.flip ? 'rgba(255,255,255,0.01)' : 'transparent' }}>

            {/* Decorative number */}
            <div className="vd-number" style={{ top: -20, [v.flip ? 'right' : 'left']: -20 }}>{v.num}</div>

            <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div className="vd-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', direction: v.flip ? 'rtl' : 'ltr' }}>

                {/* Text side */}
                <div className="reveal" style={{ direction: 'ltr' }}>
                  {/* Eyebrow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <div style={{ width: 28, height: 1, background: v.accent }} />
                    <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: v.accent, fontWeight: 700 }}>{v.num} / 04</span>
                  </div>

                  <span className="section-label" style={{ color: v.accent }}>Venture Spotlight</span>
                  <div style={{ width: 48, height: 1, background: v.accent, margin: '20px 0 24px' }} />

                  <h2 className="playfair" style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 700, lineHeight: 1.18, marginBottom: 10, color: '#F5F5F0' }}>
                    {v.name}
                  </h2>
                  <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: v.accent, fontWeight: 500, marginBottom: 20, lineHeight: 1.5 }}>{v.tagline}</p>
                  <p style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.95, fontSize: 15, marginBottom: 32 }}>{v.desc}</p>

                  {/* Target audience */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 28, padding: '14px 18px', background: `${v.accent}08`, border: `1px solid ${v.accent}1A`, borderRadius: 2 }}>
                    <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: v.accent, fontWeight: 700, whiteSpace: 'nowrap', marginTop: 1 }}>For</span>
                    <span style={{ fontSize: 13, color: 'rgba(245,245,240,0.65)', lineHeight: 1.6 }}>{v.target}</span>
                  </div>

                  {/* Feature pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                    {v.features.map(f => (
                      <span key={f} className="vd-feature-pill" style={{ background: `${v.accent}0D`, borderColor: `${v.accent}25`, color: 'rgba(245,245,240,0.75)' }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: v.accent, flexShrink: 0 }} />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Status + CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <a href={v.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: v.accent, color: '#0A0A0A', padding: '13px 26px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity 0.25s, transform 0.2s', borderRadius: 1 }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
                      Visit {v.name} <ExternalLink size={13} />
                    </a>
                    {v.live
                      ? <span className="badge-live"><span className="live-dot" />Live & Operating</span>
                      : <span className="badge-upcoming"><span className="live-dot" />Launching 2025</span>
                    }
                  </div>
                </div>

                {/* Visual side */}
                <div className="reveal vd-visual" style={{ direction: 'ltr', background: `linear-gradient(135deg, ${v.gradStart} 0%, ${v.gradEnd} 100%)`, border: `1px solid ${v.accent}20` }}>
                  <div className="vd-visual-inner">
                    {/* Large brand icon */}
                    <div style={{ width: 120, height: 120, borderRadius: '50%', background: `${v.accent}12`, border: `1px solid ${v.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                      <VisualIcon size={52} color={v.accent} aria-hidden="true" />
                    </div>

                    {/* Brand name */}
                    <div style={{ textAlign: 'center', padding: '0 40px' }}>
                      <div className="playfair" style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#F5F5F0', marginBottom: 6 }}>{v.name}</div>
                      <div style={{ fontSize: 13, color: `${v.accent}CC`, lineHeight: 1.6, maxWidth: 260 }}>{v.tagline}</div>
                    </div>

                    {/* Decorative tag */}
                    <span className="vd-tag" style={{ background: v.visual.tagBg, color: v.visual.tagColor, border: `1px solid ${v.accent}25` }}>
                      {v.visual.label}
                    </span>

                    {/* Ambient glow */}
                    <div aria-hidden="true" style={{ position: 'absolute', top: '20%', left: '30%', width: 240, height: 240, borderRadius: '50%', background: `radial-gradient(circle, ${v.accent}10 0%, transparent 70%)`, pointerEvents: 'none' }} />
                  </div>
                </div>

              </div>
            </div>
          </section>
        )
      })}

      {/* ══════════════════════════════════ AUTOMATION ══════════════════════════════════ */}
      <section id="automation" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left */}
            <div className="reveal">
              <span className="section-label">Additional Service Line</span>
              <div className="gold-rule" />
              <h2 className="playfair" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, lineHeight: 1.18, marginBottom: 24 }}>
                Business Automation &<br /><em style={{ color: '#D4A853' }}>Product Development</em>
              </h2>
              <p style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.95, fontSize: 15, marginBottom: 36 }}>
                Beyond wellness, NeoHappyLyf engineers custom automation systems and digital tools for businesses drowning in repetitive day-to-day operations. We turn manual workflows into intelligent, self-running systems — so you can focus on what actually matters.
              </p>
              <button className="btn-gold" onClick={() => nav('contact')}>
                Discuss Your Project <ArrowRight size={15} />
              </button>
            </div>

            {/* Right */}
            <div className="reveal">
              {[
                { Icon: Zap,        title: 'Workflow Automation',       desc: 'Eliminate repetitive tasks with intelligent, custom-built automation pipelines tailored precisely to your operations.' },
                { Icon: Settings,   title: 'Custom Software Tools',     desc: 'Purpose-built internal tools and digital products that solve your specific operational and business challenges.' },
                { Icon: Brain,      title: 'Process Optimisation',      desc: 'Audit, redesign, and streamline your existing workflows for maximum efficiency and minimum operational friction.' },
                { Icon: Building2,  title: 'System Integration',        desc: 'Connect your existing tools into a unified operational ecosystem — no more data silos or manual hand-offs.' },
              ].map(({ Icon, title, desc }, i) => (
                <div key={i} className="auto-row">
                  <div className="auto-icon"><Icon size={18} color="#D4A853" aria-hidden="true" /></div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 5 }}>{title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.45)', lineHeight: 1.7 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ JOURNEY ══════════════════════════════════ */}
      <section id="journey" style={{ padding: '120px 40px', background: 'rgba(255,255,255,0.012)', borderTop: '1px solid rgba(212,168,83,0.07)', borderBottom: '1px solid rgba(212,168,83,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64 }}>
            <span className="section-label">Company Timeline</span>
            <div className="gold-rule" />
            <h2 className="playfair" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.18 }}>
              The Journey So Far
            </h2>
            <p style={{ color: 'rgba(245,245,240,0.4)', marginTop: 14, fontSize: 15, maxWidth: 420, lineHeight: 1.8 }}>
              From a single idea to a multi-vertical ecosystem — every step deliberate, every platform purposeful.
            </p>
          </div>

          <div className="timeline-wrap">
            {MILESTONES.map((m, i) => (
              <div key={i} className="tl-item reveal">
                <div className="tl-dot" />
                <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4A853', fontWeight: 700, marginBottom: 8 }}>{m.year}</div>
                <h3 className="playfair" style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{m.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(245,245,240,0.5)', lineHeight: 1.85 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ LEADERSHIP ══════════════════════════════════ */}
      <section id="leadership" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64 }}>
            <span className="section-label">Founder & Leadership</span>
            <div className="gold-rule" />
            <h2 className="playfair" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.18 }}>
              The Visionary Behind <em style={{ color: '#D4A853' }}>NeoHappyLyf</em>
            </h2>
          </div>

          <div className="leader-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 80, alignItems: 'start' }}>

            {/* Photo card */}
            <div className="reveal">
              <div style={{ aspectRatio: '4/5', background: 'rgba(212,168,83,0.04)', border: '1px solid rgba(212,168,83,0.14)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 22 }} aria-label="Founder photo placeholder">
                <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(212,168,83,0.12)', border: '1px solid rgba(212,168,83,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="playfair" style={{ fontSize: 26, color: '#D4A853', fontWeight: 700 }}>KG</span>
                </div>
                <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.22)', letterSpacing: '0.08em' }}>Photo Placeholder</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[Linkedin, Twitter, Mail].map((Icon, i) => (
                  <a key={i} href={i === 2 ? 'mailto:contact@neohappylyf.com' : '#'} aria-label={['LinkedIn', 'Twitter', 'Email'][i]}
                    style={{ width: 36, height: 36, background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A853', textDecoration: 'none', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,168,83,0.18)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(212,168,83,0.06)'}>
                    <Icon size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="reveal">
              <h3 className="playfair" style={{ fontSize: 36, fontWeight: 700, marginBottom: 6 }}>Krishnan Govindan</h3>
              <p style={{ color: '#D4A853', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 28 }}>Founder & Chief Executive Officer</p>

              <div style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.95, fontSize: 15, marginBottom: 36 }}>
                <p style={{ marginBottom: 16 }}>Krishnan Govindan is the founder and driving force behind Neo HappyLyf — a company born from the conviction that mental wellness and operational excellence are not trade-offs, but complements.</p>
                <p style={{ marginBottom: 16 }}>Based in Krishnagiri, Tamil Nadu, Krishnan identified an underserved gap: the Indian diaspora needed culturally rooted mental health and life coaching support, delivered through modern digital platforms. What began as IndiaTherapist.com in 2022 has since grown into a multi-vertical ecosystem serving thousands.</p>
                <p>An entrepreneur at heart, Krishnan simultaneously recognised the operational pain points facing India's growing business class — and built NeoHappyLyf's automation division to address them directly with custom-engineered solutions.</p>
              </div>

              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[
                  ['Mental Wellness', 'Domain Expert'],
                  ['Business Automation', 'Builder'],
                  ['NRI Services', 'Pioneer'],
                  ['Entrepreneurship', 'Thought Leader'],
                ].map(([domain, role]) => (
                  <div key={domain} style={{ borderLeft: '2px solid #D4A853', paddingLeft: 14 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{domain}</div>
                    <div style={{ fontSize: 11, color: '#D4A853', textTransform: 'uppercase', letterSpacing: '0.09em' }}>{role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ PARTNER / CTA ══════════════════════════════════ */}
      <section id="partner" style={{ padding: '120px 40px', background: 'rgba(212,168,83,0.025)', borderTop: '1px solid rgba(212,168,83,0.1)', borderBottom: '1px solid rgba(212,168,83,0.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-label">Opportunities</span>
            <div className="gold-rule" style={{ margin: '20px auto 28px' }} />
            <h2 className="playfair" style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.12, marginBottom: 20 }}>
              Invest in Wellness<br /><em style={{ color: '#D4A853' }}>&amp; Automation</em>
            </h2>
            <p style={{ color: 'rgba(245,245,240,0.5)', maxWidth: 520, margin: '0 auto', lineHeight: 1.88, fontSize: 16 }}>
              We are open to strategic partnerships, investment conversations, and collaboration opportunities that align with our mission of healing minds and building efficient systems.
            </p>
          </div>

          <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            {[
              { title: 'Strategic Investor', desc: 'Partner with us to scale our wellness platforms across Southeast Asia and the global Indian diaspora. Strong unit economics and underserved markets.' },
              { title: 'Platform Partner',   desc: 'Integrate your services with our growing ecosystem — therapists, coaches, and digital tools that serve a dedicated, engaged user base.' },
              { title: 'Technology Partner', desc: 'Collaborate on our automation division or co-develop specialised digital health tools with an experienced team and clear market validation.' },
            ].map((item, i) => (
              <div key={i} className="reveal" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,168,83,0.1)', padding: '40px 32px', transition: 'border-color 0.3s, background 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,168,83,0.28)'; e.currentTarget.style.background = 'rgba(212,168,83,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,168,83,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}>
                <div className="playfair" style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>{item.title}</div>
                <p style={{ fontSize: 14, color: 'rgba(245,245,240,0.5)', lineHeight: 1.85 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 52 }}>
            <button className="btn-gold" style={{ fontSize: 14, padding: '15px 32px' }} onClick={() => nav('contact')}>
              Start a Conversation <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ CONTACT ══════════════════════════════════ */}
      <section id="contact" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>

            {/* Left */}
            <div className="reveal">
              <span className="section-label">Get In Touch</span>
              <div className="gold-rule" />
              <h2 className="playfair" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 700, lineHeight: 1.18, marginBottom: 22 }}>
                Let's Start a <em style={{ color: '#D4A853' }}>Conversation</em>
              </h2>
              <p style={{ color: 'rgba(245,245,240,0.5)', lineHeight: 1.95, fontSize: 15, marginBottom: 44 }}>
                Whether you're an investor, a platform partner, a business seeking automation support, or a mental wellness professional looking to join our ecosystem — we'd love to hear from you.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {[
                  { Icon: Mail,    label: 'Email',    value: 'contact@neohappylyf.com', href: 'mailto:contact@neohappylyf.com' },
                  { Icon: MapPin,  label: 'Location', value: 'Krishnagiri, Tamil Nadu, India', href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 42, height: 42, background: 'rgba(212,168,83,0.07)', border: '1px solid rgba(212,168,83,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color="#D4A853" aria-hidden="true" />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: 'rgba(245,245,240,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>{label}</div>
                      {href
                        ? <a href={href} style={{ color: '#F5F5F0', textDecoration: 'none', fontSize: 15 }}>{value}</a>
                        : <span style={{ fontSize: 15 }}>{value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="reveal">
              {submitted ? (
                <div style={{ background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.2)', padding: 48, textAlign: 'center' }}>
                  <div className="playfair" style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Message Received</div>
                  <p style={{ color: 'rgba(245,245,240,0.55)', fontSize: 15, lineHeight: 1.8 }}>
                    Thank you for reaching out. We review all enquiries carefully and will respond within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label className="field-label" htmlFor="f-name">Full Name *</label>
                      <input id="f-name" className="form-ctrl" name="name" value={form.name} onChange={handleForm} placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="f-email">Email *</label>
                      <input id="f-email" className="form-ctrl" type="email" name="email" value={form.email} onChange={handleForm} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="field-label" htmlFor="f-company">Company / Organisation</label>
                    <input id="f-company" className="form-ctrl" name="company" value={form.company} onChange={handleForm} placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="f-interest">I'm Interested In</label>
                    <select id="f-interest" className="form-ctrl" name="interest" value={form.interest} onChange={handleForm} style={{ cursor: 'pointer' }}>
                      <option value="">Select an option</option>
                      <option value="investment">Investment / Strategic Partnership</option>
                      <option value="automation">Business Automation Services</option>
                      <option value="therapy">IndiaTherapist.com</option>
                      <option value="coaching">IndianLifeCoaches.com</option>
                      <option value="divorce">IndianDivorceCoach.com</option>
                      <option value="other">General Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="field-label" htmlFor="f-message">Message *</label>
                    <textarea id="f-message" className="form-ctrl" name="message" value={form.message} onChange={handleForm} placeholder="Tell us about your interest or enquiry…" rows={5} style={{ resize: 'vertical' }} required />
                  </div>
                  <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: 4, padding: '16px 24px' }}>
                    Send Message <ArrowRight size={16} />
                  </button>
                  <p style={{ fontSize: 12, color: 'rgba(245,245,240,0.25)', textAlign: 'center' }}>
                    We respond to all enquiries within 48 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ FOOTER ══════════════════════════════════ */}
      <footer role="contentinfo" style={{ background: '#060606', borderTop: '1px solid rgba(212,168,83,0.09)', padding: '64px 40px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 52 }}>

            {/* Brand */}
            <div>
              <Logo onClick={() => nav('hero')} />
              <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.38)', lineHeight: 1.85, maxWidth: 260, margin: '20px 0 16px' }}>
                Neo HappyLyf Mind Care For U Private Limited — healing minds and building systems from Krishnagiri, Tamil Nadu, India.
              </p>
              <p style={{ fontSize: 11, color: 'rgba(245,245,240,0.2)', letterSpacing: '0.05em' }}>UDYAM-TN-11-0044799</p>
            </div>

            {/* Ventures */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4A853', fontWeight: 700, marginBottom: 20 }}>Ventures</div>
              {VENTURES.map(v => (
                <a key={v.name} href={v.url} target="_blank" rel="noopener noreferrer" className="foot-link">{v.name}</a>
              ))}
            </div>

            {/* Company */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4A853', fontWeight: 700, marginBottom: 20 }}>Company</div>
              {[['about','About'],['automation','Automation'],['journey','Journey'],['leadership','Leadership'],['contact','Contact']].map(([id, label]) => (
                <span key={id} className="foot-link" onClick={() => nav(id)}>{label}</span>
              ))}
            </div>

            {/* Connect */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4A853', fontWeight: 700, marginBottom: 20 }}>Connect</div>
              <a href="mailto:contact@neohappylyf.com" className="foot-link" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={12} aria-hidden="true" /> contact@neohappylyf.com
              </a>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                {[Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" aria-label={['LinkedIn', 'Twitter'][i]}
                    style={{ width: 34, height: 34, background: 'rgba(212,168,83,0.05)', border: '1px solid rgba(212,168,83,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(245,245,240,0.45)', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,168,83,0.15)'; e.currentTarget.style.color = '#D4A853' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,168,83,0.05)'; e.currentTarget.style.color = 'rgba(245,245,240,0.45)' }}>
                    <Icon size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(212,168,83,0.07)', paddingTop: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 12, color: 'rgba(245,245,240,0.22)' }}>
              © {new Date().getFullYear()} Neo HappyLyf Mind Care For U Private Limited. All rights reserved.
            </p>
            <p style={{ fontSize: 12, color: 'rgba(245,245,240,0.18)' }}>
              Krishnagiri, Tamil Nadu, India
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
