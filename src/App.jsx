import { useState, useEffect, useRef } from 'react'
import {
  ExternalLink, Mail, MapPin, Linkedin, Twitter,
  ChevronDown, Menu, X, ArrowRight, ChevronUp,
  Building2, Brain, Heart, Users, Zap, Settings,
  Bot, BarChart3, Wrench, GitMerge,
  ShieldCheck, Globe, Award, BadgeCheck, Clock,
  Quote, Star,
  Youtube, Instagram, HeartHandshake, Cpu
} from 'lucide-react'
import GlobeHero from './GlobeHero.jsx'

/* ─── Global Styles ─────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    body {
      background: #0A0A0A;
      color: #F5F5F0;
      font-family: 'DM Sans', sans-serif;
      font-size: 18px;
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
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-link {
      color: rgba(245,245,240,0.65);
      font-size: 13px;
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
      font-size: 14px;
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
      font-size: 14px;
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
      font-size: 13px;
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
      font-size: 16px;
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
      font-size: 15px;
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
        top: 88px; left: 0; right: 0;
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
      grid-template-columns: repeat(3, 1fr);
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

    /* ── Phase 3 ── */

    /* Automation lab cards — glassmorphism */
    @keyframes card-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,83,0); }
      50%       { box-shadow: 0 0 30px 4px rgba(212,168,83,0.08); }
    }
    .lab-card {
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(212,168,83,0.1);
      padding: 40px 36px;
      position: relative;
      overflow: hidden;
      transition: transform 0.35s ease, border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
      border-radius: 2px;
    }
    .lab-card::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(212,168,83,0.04) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.35s ease;
    }
    .lab-card:hover {
      transform: translateY(-6px);
      border-color: rgba(212,168,83,0.4);
      background: rgba(212,168,83,0.04);
      box-shadow: 0 8px 40px rgba(212,168,83,0.12), 0 0 0 1px rgba(212,168,83,0.15);
    }
    .lab-card:hover::after { opacity: 1; }
    .lab-card-icon {
      width: 52px; height: 52px;
      background: rgba(212,168,83,0.08);
      border: 1px solid rgba(212,168,83,0.2);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 24px;
      border-radius: 2px;
      transition: background 0.3s, box-shadow 0.3s;
    }
    .lab-card:hover .lab-card-icon {
      background: rgba(212,168,83,0.15);
      box-shadow: 0 0 20px rgba(212,168,83,0.2);
    }
    .lab-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2px;
    }
    @media (max-width: 1100px) { .lab-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 600px)  { .lab-grid { grid-template-columns: 1fr; } }

    /* Founder / Leadership */
    .founder-quote {
      position: relative;
      padding: 36px 40px;
      margin: 36px 0;
      border-left: 3px solid #D4A853;
      background: rgba(212,168,83,0.04);
    }
    .founder-quote-text {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: clamp(20px, 2.5vw, 28px);
      font-weight: 500;
      line-height: 1.5;
      color: #F5F5F0;
    }
    .founder-photo-wrap {
      position: relative;
    }
    .founder-photo-inner {
      aspect-ratio: 4/5;
      background: linear-gradient(160deg, rgba(212,168,83,0.12) 0%, rgba(212,168,83,0.03) 100%);
      border: 1px solid rgba(212,168,83,0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      position: relative;
      overflow: hidden;
    }
    .founder-initials {
      width: 96px; height: 96px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(212,168,83,0.22) 0%, rgba(212,168,83,0.08) 100%);
      border: 2px solid rgba(212,168,83,0.4);
      display: flex; align-items: center; justify-content: center;
    }
    .founder-role-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #D4A853;
      font-weight: 600;
      background: rgba(212,168,83,0.08);
      border: 1px solid rgba(212,168,83,0.2);
      padding: 6px 14px;
      border-radius: 20px;
    }
    .expertise-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 16px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(212,168,83,0.14);
      font-size: 12px;
      font-weight: 500;
      color: rgba(245,245,240,0.7);
      border-radius: 20px;
      transition: border-color 0.25s, background 0.25s;
    }
    .expertise-pill:hover {
      border-color: rgba(212,168,83,0.35);
      background: rgba(212,168,83,0.05);
    }

    /* Trust signals */
    .trust-strip {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2px;
    }
    .trust-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      padding: 40px 32px;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(212,168,83,0.1);
      flex: 1;
      min-width: 160px;
      max-width: 240px;
      text-align: center;
      transition: background 0.3s, border-color 0.3s;
    }
    .trust-badge:hover {
      background: rgba(212,168,83,0.04);
      border-color: rgba(212,168,83,0.25);
    }
    .trust-icon-wrap {
      width: 52px; height: 52px;
      border-radius: 50%;
      background: rgba(212,168,83,0.08);
      border: 1px solid rgba(212,168,83,0.2);
      display: flex; align-items: center; justify-content: center;
    }

    /* Media & Partners */
    .media-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(212,168,83,0.08);
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: border-color 0.3s;
    }
    .media-card:hover { border-color: rgba(212,168,83,0.2); }
    .partner-chip {
      display: inline-flex;
      align-items: center;
      padding: 12px 24px;
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(255,255,255,0.07);
      color: rgba(245,245,240,0.3);
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.06em;
      border-radius: 2px;
      transition: color 0.3s, border-color 0.3s;
    }
    .partner-chip:hover {
      color: rgba(245,245,240,0.55);
      border-color: rgba(255,255,255,0.12);
    }

    /* ── Phase 4 ── */

    /* Preloader */
    @keyframes preloader-fade {
      0%   { opacity: 1; }
      80%  { opacity: 1; }
      100% { opacity: 0; pointer-events: none; }
    }
    @keyframes preloader-logo {
      0%   { opacity: 0; transform: translateY(12px); }
      30%  { opacity: 1; transform: translateY(0); }
      70%  { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-8px); }
    }
    @keyframes preloader-bar {
      from { width: 0; }
      to   { width: 100%; }
    }
    .preloader {
      position: fixed;
      inset: 0;
      background: #0A0A0A;
      z-index: 9998;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 32px;
      animation: preloader-fade 2.6s ease forwards;
    }
    .preloader-logo {
      animation: preloader-logo 2.4s ease forwards;
    }
    .preloader-track {
      width: 160px;
      height: 1px;
      background: rgba(212,168,83,0.15);
      position: relative;
      overflow: hidden;
    }
    .preloader-track::after {
      content: '';
      position: absolute;
      left: 0; top: 0; height: 100%;
      background: #D4A853;
      animation: preloader-bar 2s ease forwards;
    }

    /* Back-to-top */
    .back-to-top {
      position: fixed;
      bottom: 32px;
      right: 32px;
      width: 44px; height: 44px;
      background: rgba(10,10,10,0.9);
      border: 1px solid rgba(212,168,83,0.35);
      color: #D4A853;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      z-index: 500;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(16px);
      pointer-events: none;
      backdrop-filter: blur(8px);
    }
    .back-to-top.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    .back-to-top:hover {
      background: #D4A853;
      color: #0A0A0A;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(212,168,83,0.25);
    }

    /* Contact cards */
    .contact-card {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(212,168,83,0.1);
      padding: 36px 32px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: transform 0.3s, border-color 0.3s, background 0.3s, box-shadow 0.3s;
      position: relative;
      overflow: hidden;
    }
    .contact-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #D4A853, transparent);
      transform: scaleX(0);
      transition: transform 0.4s ease;
    }
    .contact-card:hover {
      transform: translateY(-4px);
      border-color: rgba(212,168,83,0.3);
      background: rgba(212,168,83,0.04);
      box-shadow: 0 12px 40px rgba(0,0,0,0.3);
    }
    .contact-card:hover::before { transform: scaleX(1); }

    /* HQ map placeholder */
    .hq-map {
      background: rgba(212,168,83,0.03);
      border: 1px solid rgba(212,168,83,0.12);
      border-radius: 2px;
      padding: 32px;
      display: flex;
      align-items: center;
      gap: 20px;
      position: relative;
      overflow: hidden;
    }
    .hq-pin {
      width: 48px; height: 48px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      background: rgba(212,168,83,0.15);
      border: 2px solid rgba(212,168,83,0.4);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .hq-pin-inner {
      transform: rotate(45deg);
    }

    /* Social icon strip */
    .social-icon {
      width: 36px; height: 36px;
      background: rgba(212,168,83,0.05);
      border: 1px solid rgba(212,168,83,0.14);
      display: flex; align-items: center; justify-content: center;
      color: rgba(245,245,240,0.45);
      text-decoration: none;
      transition: all 0.25s;
      flex-shrink: 0;
    }
    .social-icon:hover {
      background: rgba(212,168,83,0.15);
      color: #D4A853;
      transform: translateY(-2px);
      border-color: rgba(212,168,83,0.3);
    }

    /* Footer column heading */
    .foot-col-head {
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #D4A853;
      font-weight: 700;
      margin-bottom: 20px;
    }

    /* Responsive Phase 4 */
    @media (max-width: 900px) {
      .contact-cards-grid { grid-template-columns: 1fr !important; }
      .back-to-top { bottom: 20px; right: 20px; }
    }
    @media (max-width: 600px) {
      .contact-cards-grid { grid-template-columns: 1fr !important; }
    }

    /* ── Phase 5 ── */

    /* Prevent all horizontal scroll */
    html, body { overflow-x: hidden; max-width: 100vw; }

    /* Blog / Insights */
    .blog-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
    }
    .blog-card {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(212,168,83,0.09);
      padding: 36px 32px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: transform 0.3s, border-color 0.3s, background 0.3s;
      position: relative;
      overflow: hidden;
    }
    .blog-card:hover {
      transform: translateY(-4px);
      border-color: rgba(212,168,83,0.25);
      background: rgba(212,168,83,0.03);
    }
    .blog-tag {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 20px;
      background: rgba(212,168,83,0.08);
      border: 1px solid rgba(212,168,83,0.18);
      color: #D4A853;
    }

    /* Newsletter */
    .newsletter-band {
      background: rgba(212,168,83,0.04);
      border: 1px solid rgba(212,168,83,0.12);
      padding: 36px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      flex-wrap: wrap;
      margin-bottom: 56px;
    }
    .newsletter-form {
      display: flex;
      gap: 0;
      flex: 1;
      max-width: 400px;
    }
    .newsletter-input {
      flex: 1;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(212,168,83,0.2);
      border-right: none;
      color: #F5F5F0;
      padding: 13px 18px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      outline: none;
      transition: border-color 0.25s;
    }
    .newsletter-input:focus { border-color: rgba(212,168,83,0.5); }
    .newsletter-input::placeholder { color: rgba(245,245,240,0.25); }
    .newsletter-btn {
      background: #D4A853;
      color: #0A0A0A;
      border: none;
      padding: 13px 20px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.25s;
      white-space: nowrap;
    }
    .newsletter-btn:hover { background: #F5D78E; }

    /* ── Comprehensive Responsive Fixes ── */

    /* Large screens — cap and centre */
    @media (min-width: 1920px) {
      section > div, footer > div, nav > div { max-width: 1400px !important; }
    }

    /* Tablet 768px */
    @media (max-width: 900px) {
      /* Venture detail flip — remove RTL on mobile */
      .vd-grid { direction: ltr !important; }
      /* Blog grid */
      .blog-grid { grid-template-columns: 1fr 1fr !important; }
      /* Newsletter band */
      .newsletter-band { flex-direction: column; align-items: flex-start; }
      .newsletter-form { max-width: 100%; width: 100%; }
      /* Footer top band */
      .footer-top-social { align-items: flex-start !important; }
      /* Process strip */
      .process-strip { flex-direction: column; gap: 16px !important; }
      .process-strip .process-arrow { display: none; }
    }

    /* Mobile 600px */
    @media (max-width: 640px) {
      /* Ecosystem — shrink and scroll */
      .eco-outer { transform: scale(0.55); transform-origin: top center; margin-bottom: -260px; }
      /* Blog */
      .blog-grid { grid-template-columns: 1fr !important; }
      /* Stats */
      .stats-bar { grid-template-columns: 1fr 1fr !important; }
      /* Trust strip */
      .trust-badge { min-width: 130px; }
      /* Section padding */
      section { padding-top: 80px !important; padding-bottom: 80px !important; }
      /* Partner cards */
      .cta-grid { grid-template-columns: 1fr !important; }
      /* Footer grid */
      .footer-grid { grid-template-columns: 1fr 1fr !important; }
      /* Contact HQ col */
      .hq-map { flex-direction: column; }
    }

    /* Mobile 375px */
    @media (max-width: 420px) {
      .footer-grid { grid-template-columns: 1fr !important; }
      .stats-bar { grid-template-columns: 1fr !important; }
      .eco-outer { transform: scale(0.42); margin-bottom: -330px; }
      .newsletter-form { flex-direction: column; }
      .newsletter-input { border-right: 1px solid rgba(212,168,83,0.2); border-bottom: none; }
      .newsletter-btn { width: 100%; text-align: center; justify-content: center; }
    }

    /* Touch targets */
    button, a, [role="button"] { min-height: 44px; }
    .nav-link { min-height: 44px; display: inline-flex; align-items: center; }
    .foot-link { min-height: 36px; display: flex; align-items: center; }

    /* ── Hero Globe ── */
    @keyframes globe-enter {
      0% {
        opacity: 0;
        transform: translate(-30%, -15%) scale(0.35) rotate(-25deg);
        filter: blur(8px);
      }
      60% {
        opacity: 0.85;
        filter: blur(0);
      }
      100% {
        opacity: 0.92;
        transform: translate(0, 0) scale(1) rotate(0);
        filter: blur(0);
      }
    }
    @keyframes globe-glow {
      0%, 100% { box-shadow: 0 0 80px 10px rgba(212,168,83,0.06); }
      50%       { box-shadow: 0 0 140px 20px rgba(212,168,83,0.12); }
    }
    .globe-hero {
      position: absolute;
      top: 15%;
      right: 5%;
      transform: translateY(-50%);
      width: min(920px, 75vw);
      height: min(920px, 75vw);
      pointer-events: none;
      z-index: 1;
      opacity: 0;
      animation: globe-enter 2.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
      will-change: transform, opacity;
    }
    .globe-hero canvas {
      display: block;
      mask-image: radial-gradient(circle at center, black 55%, transparent 85%);
      -webkit-mask-image: radial-gradient(circle at center, black 55%, transparent 85%);
    }
    /* Subtle radial glow behind the globe */
    .globe-hero::before {
      content: '';
      position: absolute;
      inset: 10%;
      border-radius: 50%;
      background: radial-gradient(circle at center, rgba(212,168,83,0.10) 0%, rgba(212,168,83,0.04) 35%, transparent 70%);
      animation: globe-glow 6s ease-in-out infinite;
      pointer-events: none;
      z-index: -1;
    }
    @media (max-width: 1100px) {
      .globe-hero {
        right: -20%;
        width: min(720px, 80vw);
        height: min(720px, 80vw);
        opacity: 0.5;
      }
      .globe-hero { animation-name: globe-enter-mobile; }
      @keyframes globe-enter-mobile {
        0%   { opacity: 0; transform: translate(-20%, -10%) scale(0.4); }
        100% { opacity: 0.45; transform: translateY(-50%) scale(1); }
      }
    }
    @media (max-width: 700px) {
      .globe-hero {
        right: -30%;
        top: 50%;
        opacity: 0.32;
      }
    }

    /* ── Scrolling columns (tools/integrations) ── */
    @keyframes scroll-down {
      from { transform: translateY(0); }
      to   { transform: translateY(-50%); }
    }
    @keyframes scroll-up {
      from { transform: translateY(-50%); }
      to   { transform: translateY(0); }
    }
    .scroll-viewport {
      overflow: hidden;
      height: 540px;
      position: relative;
      mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
    }
    .scroll-track-down {
      display: flex;
      flex-direction: column;
      gap: 12px;
      animation: scroll-down 22s linear infinite;
    }
    .scroll-track-up {
      display: flex;
      flex-direction: column;
      gap: 12px;
      animation: scroll-up 18s linear infinite;
    }
    .scroll-track-down:hover,
    .scroll-track-up:hover {
      animation-play-state: paused;
    }
    .tool-card {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(212,168,83,0.1);
      border-radius: 12px;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      white-space: nowrap;
      transition: border-color 0.3s, background 0.3s;
      cursor: default;
    }
    .tool-card:hover {
      border-color: rgba(212,168,83,0.3);
      background: rgba(212,168,83,0.04);
    }
    .tool-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    @media (max-width: 900px) {
      .tools-cols { grid-template-columns: 1fr 1fr !important; }
      .tools-col-hide { display: none !important; }
      .scroll-viewport { height: 480px; }
      .fulsuccess-header { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 560px) {
      .tools-cols { grid-template-columns: 1fr !important; }
      .scroll-viewport { height: 420px; }
    }
  `}</style>
)

/* ─── Data ───────────────────────────────────────────────────────────────── */
const VENTURES = [
  {
    name: 'India Therapist',
    displayName: 'India Therapist',
    domain: 'indiatherapist.com',
    tagline: "The leading online therapy platform for the global Indian diaspora.",
    desc: 'Connecting the Indian diaspora with licensed Indian therapists via video sessions and subscription-based mental health plans. Culturally rooted support for those who need it most.',
    url: 'https://indiatherapist.com',
    live: true,
    statusLabel: 'Live Platform',
    Icon: Brain,
    accent: '#7C6AF7',
  },
  {
    name: 'Indian Life Coaches',
    displayName: 'Indian Life Coaches',
    domain: 'indianlifecoaches.com',
    tagline: 'Holistic life coaching for NRIs seeking growth and freedom.',
    desc: 'Career coaching, financial freedom pathways, and personal development programs — delivered through subscription-based 1:1 video coaching sessions.',
    url: 'https://indianlifecoaches.com',
    live: true,
    statusLabel: 'Live Platform',
    Icon: Users,
    accent: '#4ECDC4',
  },
  {
    name: 'Indian Divorce Coach',
    displayName: 'Indian Divorce Coach',
    domain: 'indiandivorcecoach.com',
    tagline: 'Confidential divorce coaching for South Asians worldwide.',
    desc: 'Specialized emotional support and practical guidance for individuals navigating separation — with deep cultural sensitivity and zero judgment.',
    url: 'https://indiandivorcecoach.com',
    live: true,
    statusLabel: 'Live Platform',
    Icon: Heart,
    accent: '#F4788A',
  },
  {
    name: 'Krishnan Govindan',
    displayName: 'Krishnan Govindan',
    domain: 'krishnangovindan.com',
    tagline: "Founder's platform for thought leadership and mentorship.",
    desc: 'Speaking engagements, mentorship programs, and thought leadership at the intersection of mental wellness, entrepreneurship, and business innovation.',
    url: 'https://krishnangovindan.com',
    live: false,
    statusLabel: 'Launching 2025',
    Icon: Building2,
    accent: '#D4A853',
  },
  {
    name: 'Ful Success',
    displayName: 'Ful Success',
    domain: 'fulsuccess.com',
    tagline: 'Business automation, custom tools, and process optimisation for growing businesses.',
    desc: 'Neo Happy Lyf\'s business automation division — workflow automation, custom tool development, AI-powered solutions, and process optimisation that frees businesses to focus on what matters most.',
    url: 'https://fulsuccess.com',
    live: true,
    statusLabel: 'Live Platform',
    Icon: Zap,
    accent: '#D4A853',
  },
]


const VENTURE_DETAILS = [
  {
    num: '01',
    id: 'v-therapy',
    name: 'India Therapist',
    displayName: 'India Therapist',
    domain: 'indiatherapist.com',
    image: 'https://assets.cdn.filesafe.space/m9jCzEyKqM4xlMWTjcgS/media/69df092a190683601a3d8749.png',
    tagline: 'Online Therapy for the Global Indian Diaspora',
    desc: 'Connecting Non-Resident Indians worldwide with licensed therapists via secure, encrypted video sessions. Anxiety, depression, relationship issues, trauma, career stress — all addressed through culturally relevant mental health support from therapists who truly understand your world.',
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
    name: 'Indian Life Coaches',
    displayName: 'Indian Life Coaches',
    domain: 'indianlifecoaches.com',
    image: 'https://assets.cdn.filesafe.space/m9jCzEyKqM4xlMWTjcgS/media/69df0aa680b446d0fb903614.png',
    tagline: 'Complete Holistic Lifestyle Transformation for NRIs',
    desc: "Connecting NRIs globally with expert life coaches for financial freedom, career acceleration, personal empowerment, and relationship transformation. Subscription-based 1:1 video coaching with structured goal-setting, strategy sessions, and on-demand content.",
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
    name: 'Indian Divorce Coach',
    displayName: 'Indian Divorce Coach',
    domain: 'indiandivorcecoach.com',
    image: 'https://assets.cdn.filesafe.space/m9jCzEyKqM4xlMWTjcgS/media/69df098b109243d2cce01d0e.png',
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
    name: 'Krishnan Govindan',
    displayName: 'Krishnan Govindan',
    domain: 'krishnangovindan.com',
    image: 'https://assets.cdn.filesafe.space/m9jCzEyKqM4xlMWTjcgS/media/69df0b59190683601a3e012d.png',
    tagline: 'Founder. Thought Leader. Wellness Entrepreneur.',
    desc: "Krishnan Govindan's personal brand and thought leadership platform — at the intersection of mental wellness, entrepreneurship, and Ful Success. Speaking engagements, public mentorship, long-form writing, and a growing body of work that challenges how India thinks about health and efficiency.",
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
        <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: 16, letterSpacing: '0.02em', lineHeight: 1.1 }}>Neo Happy Lyf</div>
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
  const [form, setForm]               = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted]     = useState(false)
  const [loading, setLoading]         = useState(true)
  const [showTop, setShowTop]         = useState(false)
  const [newsEmail, setNewsEmail]     = useState('')
  const [newsSent, setNewsSent]       = useState(false)

  useReveal()

  /* Preloader — hide after 2.6 s (matches CSS animation) */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2700)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      setHeroShift(window.scrollY * 0.38)
      setShowTop(window.scrollY > 500)
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
    ['fulsuccess', 'Ful Success'],
    ['leadership', 'Leadership'],
    ['contact', 'Contact'],
  ]

  return (
    <>
      <GlobalStyles />

      {/* ── Preloader ── */}
      {loading && (
        <div className="preloader" aria-hidden="true">
          <div className="preloader-logo">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, background: '#D4A853', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: 20, color: '#0A0A0A' }}>N</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: 18, color: '#F5F5F0', letterSpacing: '0.02em' }}>Neo Happy Lyf</div>
                <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.3)' }}>Mind Care For U</div>
              </div>
            </div>
          </div>
          <div className="preloader-track" />
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.2)' }}>
            Healing Minds. Building Systems.
          </div>
        </div>
      )}

      {/* ── Back to Top ── */}
      <button
        className={`back-to-top${showTop ? ' visible' : ''}`}
        onClick={() => scrollTo('hero')}
        aria-label="Back to top"
      >
        <ChevronUp size={18} />
      </button>

      {/* ── Schema.org — Organization ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Neo Happy Lyf Mind Care For U Private Limited',
        alternateName: 'Neo Happy Lyf',
        url: 'https://neohappylyf.com',
        logo: 'https://neohappylyf.com/logo.png',
        description: "Global wellness and business automation conglomerate serving the Indian diaspora — operating India Therapist, Indian Life Coaches, Indian Divorce Coach, Krishnan Govindan, and Ful Success.",
        address: { '@type': 'PostalAddress', addressCountry: 'IN' },
        founder: { '@type': 'Person', name: 'Krishnan Govindan', jobTitle: 'Founder & CEO', url: 'https://krishnangovindan.com' },
        foundingDate: '2023-06-01',
        email: 'contact@neohappylyf.com',
        sameAs: [
          'https://www.linkedin.com/company/neohappylyf',
          'https://twitter.com/neohappylyf',
          'https://www.instagram.com/neohappylyf'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Wellness & Ful Success Platforms',
          itemListElement: VENTURES.map(v => ({ '@type': 'Offer', name: v.name, url: v.url }))
        }
      })}} />

      {/* ── Schema.org — WebSite ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Neo Happy Lyf',
        url: 'https://neohappylyf.com',
        description: 'Corporate website of Neo Happy Lyf Mind Care For U Private Limited',
        publisher: { '@type': 'Organization', name: 'Neo Happy Lyf Mind Care For U Private Limited' },
        potentialAction: { '@type': 'SearchAction', target: 'https://neohappylyf.com/?q={search_term_string}', 'query-input': 'required name=search_term_string' }
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

      {/* ══════════════════════════════════ MAIN CONTENT ══════════════════════════════════ */}
      <main id="main-content">

      {/* ══════════════════════════════════ HERO ══════════════════════════════════ */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '140px 40px 90px' }}>

        {/* Parallax vertical lines */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, transform: `translateY(${heroShift}px)`, pointerEvents: 'none', opacity: 0.04 }}>
          {[8, 22, 38, 54, 70, 86].map(p => (
            <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: 1, background: '#D4A853' }} />
          ))}
        </div>

        {/* 3D rotating globe — global NRI connections */}
        <GlobeHero />

        {/* Glow */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '28%', left: '55%', transform: 'translate(-50%,-50%)', width: 900, height: 900, background: 'radial-gradient(circle, rgba(212,168,83,0.055) 0%, transparent 68%)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36, animation: 'fadeInUp 0.7s ease both' }}>
            <div style={{ width: 36, height: 1, background: '#D4A853' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4A853', fontWeight: 600 }}>
              Est. 2023 &nbsp;·&nbsp; Serving the Global Indian Diaspora
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
            Neo Happy Lyf is a global wellness and automation conglomerate — five specialised platforms serving the mental, emotional, and operational needs of the Indian diaspora and businesses worldwide, powered by Ful Success.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animation: 'fadeInUp 0.7s ease 0.45s both' }}>
            <button className="btn-gold" onClick={() => nav('ventures')}>
              Explore Our Ventures <ArrowRight size={15} />
            </button>
            <button className="btn-ghost" onClick={() => nav('partner')}>
              Invest in Neo Happy Lyf
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: 'flex', gap: 52, marginTop: 80, flexWrap: 'wrap', animation: 'fadeInUp 0.7s ease 0.6s both' }}>
            {[
              ['2022', 'Operating Since'],
              ['20+', 'Countries Served'],
              ['NRI-Focused', 'Global Reach'],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="playfair" style={{ fontSize: 28, fontWeight: 700, color: '#D4A853', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
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
              <div className="reveal" style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.95, fontSize: 16 }}>
                <p style={{ marginBottom: 18 }}>
                  Neo Happy Lyf Mind Care For U Private Limited is a registered private limited company founded in June 2023 by Krishnan Govindan. The company operates at the intersection of mental wellness and technology innovation — serving clients across the globe.
                </p>
                <p style={{ marginBottom: 18 }}>
                  Our ecosystem addresses two of the most pressing challenges of our era: the mental health crisis among the Indian diaspora, and the operational inefficiencies that prevent growing businesses from scaling. We don't just build products — we build platforms that genuinely change lives.
                </p>
                <p>
                  With a growing portfolio of specialised platforms serving NRIs across 20+ countries, Neo Happy Lyf is positioned to become the defining wellness and Ful Success-powered company for the global Indian diaspora.
                </p>
              </div>
            </div>

            {/* Right — quad grid */}
            <div className="about-quad reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[
                { label: 'Mental Wellness', desc: 'Therapy, coaching & emotional support platforms for the Indian diaspora.' },
                { label: 'Ful Success', desc: 'Custom workflow & process automation systems for growing businesses via fulsuccess.com.' },
                { label: 'NRI-Focused', desc: 'Services designed with deep cultural context for Indians worldwide.' },
                { label: 'Culturally Rooted', desc: 'Solutions that honour South Asian values, family dynamics, and lived experience.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(212,168,83,0.03)', border: '1px solid rgba(212,168,83,0.1)', padding: '28px 24px' }}>
                  <div style={{ width: 7, height: 7, background: '#D4A853', borderRadius: '50%', marginBottom: 16 }} />
                  <div className="playfair" style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: 'rgba(245,245,240,0.45)', lineHeight: 1.65 }}>{item.desc}</div>
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
              Five Platforms. <em style={{ color: '#D4A853' }}>One Vision.</em>
            </h2>
            <p style={{ color: 'rgba(245,245,240,0.45)', marginTop: 16, maxWidth: 500, lineHeight: 1.85, fontSize: 17 }}>
              Each venture operates independently while contributing to the Neo Happy Lyf mission of making wellness and efficiency accessible to the Indian diaspora — wherever they are in the world.
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

                  <h3 className="playfair" style={{ fontSize: 22, fontWeight: 600, marginBottom: 4, color: '#F5F5F0' }}>{v.displayName}</h3>
                  <a href={v.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-block', fontSize: 12, color: 'rgba(245,245,240,0.45)', textDecoration: 'none', letterSpacing: '0.05em', marginBottom: 12, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = v.accent}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,240,0.45)'}>
                    {v.domain} ↗
                  </a>
                  <p style={{ fontSize: 15, color: '#D4A853', marginBottom: 12, fontWeight: 500, lineHeight: 1.55 }}>{v.tagline}</p>
                  <p style={{ fontSize: 16, color: 'rgba(245,245,240,0.45)', lineHeight: 1.8, marginBottom: 30 }}>{v.desc}</p>

                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="btn-ghost-sm" aria-label={`Visit ${v.displayName}`}>
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
              { value: '4+', label: 'Years of Impact', sub: 'Operating Since 2022' },
              { value: '20+', label: 'Countries Served', sub: 'NRI Communities Worldwide' },
              { value: '5', label: 'Platforms', sub: 'Wellness, Coaching & Automation' },
            ].map((s, i) => (
              <div key={i} className="stat-cell reveal">
                <div className="playfair" style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, color: '#D4A853', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#F5F5F0', marginBottom: 4, letterSpacing: '0.02em' }}>{s.label}</div>
                <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ ECOSYSTEM ══════════════════════════════════ */}
      <section id="ecosystem" style={{ padding: '120px 40px', background: 'rgba(255,255,255,0.008)', borderBottom: '1px solid rgba(212,168,83,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
            <span className="section-label">The Neo Happy Lyf Ecosystem</span>
            <div className="gold-rule" style={{ margin: '20px auto 28px' }} />
            <h2 className="playfair" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, lineHeight: 1.18, maxWidth: 600, margin: '0 auto 16px' }}>
              One Holding Company.<br /><em style={{ color: '#D4A853' }}>Five Focused Platforms.</em>
            </h2>
            <p style={{ color: 'rgba(245,245,240,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.85, fontSize: 15 }}>
              Neo Happy Lyf sits at the centre of a purpose-built ecosystem — each venture independently operated yet unified by a shared mission.
            </p>
          </div>

          {/* Ecosystem diagram */}
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
            <div className="eco-outer" style={{ position: 'relative', width: 560, height: 560 }}>

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
                  <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 11, color: '#0A0A0A', lineHeight: 1.2, letterSpacing: '0.05em' }}>Happy Lyf</span>
                </div>
              </div>

              {/* Spoke nodes — top, right, bottom, left */}
              {[
                { label: 'India Therapist',     sub: 'indiatherapist.com',     color: '#6C9FD4', Icon: Brain,     top: '0%',   left: '50%',  tx: '-50%', ty: '0' },
                { label: 'Indian Life Coaches', sub: 'indianlifecoaches.com',  color: '#D4A853', Icon: Users,     top: '50%',  left: '100%', tx: '-100%', ty: '-50%' },
                { label: 'Indian Divorce Coach', sub: 'indiandivorcecoach.com', color: '#9B8EC4', Icon: Heart,     top: '100%', left: '50%',  tx: '-50%', ty: '-100%' },
                { label: 'Krishnan Govindan',   sub: 'krishnangovindan.com',   color: '#F4788A', Icon: Building2, top: '50%',  left: '0%',   tx: '0',     ty: '-50%' },
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

              {/* Ful Success — offset node */}
              <div style={{ position: 'absolute', top: '22%', right: '-60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 5, animation: 'float-node 4s ease-in-out infinite' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={18} color="#D4A853" aria-hidden="true" />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(245,245,240,0.6)', letterSpacing: '0.04em' }}>Ful Success</div>
                  <div style={{ fontSize: 10, color: '#D4A853', fontWeight: 500 }}>fulsuccess.com</div>
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

                  <h2 className="playfair" style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 700, lineHeight: 1.18, marginBottom: 6, color: '#F5F5F0' }}>
                    {v.displayName}
                  </h2>
                  <a href={v.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-block', fontSize: 13, color: 'rgba(245,245,240,0.5)', textDecoration: 'none', letterSpacing: '0.05em', marginBottom: 18, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = v.accent}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,240,0.5)'}>
                    {v.domain} ↗
                  </a>
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
                      Visit {v.displayName} <ExternalLink size={13} />
                    </a>
                    {v.live
                      ? <span className="badge-live"><span className="live-dot" />Live & Operating</span>
                      : <span className="badge-upcoming"><span className="live-dot" />Launching 2025</span>
                    }
                  </div>
                </div>

                {/* Visual side — image on top, text fills remaining space */}
                <a href={v.url} target="_blank" rel="noopener noreferrer" className="reveal vd-visual" style={{ direction: 'ltr', background: `linear-gradient(135deg, ${v.gradStart} 0%, ${v.gradEnd} 100%)`, border: `1px solid ${v.accent}20`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch', textDecoration: 'none', overflow: 'hidden', position: 'relative', padding: 24 }}
                  aria-label={`Visit ${v.displayName}`}>
                  {/* Ambient glow */}
                  <div aria-hidden="true" style={{ position: 'absolute', top: '20%', left: '30%', width: 240, height: 240, borderRadius: '50%', background: `radial-gradient(circle, ${v.accent}10 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />

                  {/* Image — top */}
                  {v.image && (
                    <div style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, position: 'relative', zIndex: 1 }}>
                      <img
                        src={v.image}
                        alt={v.displayName}
                        loading="lazy"
                        style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', borderRadius: 4, boxShadow: `0 12px 40px -12px ${v.accent}40` }}
                      />
                    </div>
                  )}

                  {/* Text — bottom, fills remaining space */}
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${v.accent}25`, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: 13, color: `${v.accent}EE`, fontWeight: 500, letterSpacing: '0.05em', marginBottom: 6 }}>{v.domain} ↗</div>
                    <div style={{ fontSize: 14, color: 'rgba(245,245,240,0.7)', lineHeight: 1.55, maxWidth: 420, margin: '0 auto 8px' }}>{v.tagline}</div>
                    <span className="vd-tag" style={{ display: 'inline-block', marginTop: 6, background: v.visual.tagBg, color: v.visual.tagColor, border: `1px solid ${v.accent}25` }}>
                      {v.visual.label}
                    </span>
                  </div>
                </a>

              </div>
            </div>
          </section>
        )
      })}

      {/* ══════════════════════════════════ FULSUCCESS ══════════════════════════════════ */}
      <section id="fulsuccess" style={{ padding: '120px 40px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(212,168,83,0.07)', borderBottom: '1px solid rgba(212,168,83,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Header — two column with logo image */}
          <div className="reveal fulsuccess-header" style={{ marginBottom: 72, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div style={{ maxWidth: 620 }}>
              <span className="section-label">Service Division</span>
              <div className="gold-rule" />
              <h2 className="playfair" style={{ fontSize: 'clamp(30px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 10 }}>
                Ful Success<br /><em style={{ color: '#D4A853' }}>Innovation Lab</em>
              </h2>
              <a href="https://fulsuccess.com" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', fontSize: 13, color: 'rgba(245,245,240,0.55)', textDecoration: 'none', letterSpacing: '0.05em', marginBottom: 18, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#D4A853'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,240,0.55)'}>
                fulsuccess.com ↗
              </a>
              <p style={{ color: 'rgba(245,245,240,0.55)', fontSize: 17, lineHeight: 1.9, fontWeight: 300 }}>
                We build the systems that free businesses to focus on what matters.
              </p>
            </div>
            <a href="https://fulsuccess.com" target="_blank" rel="noopener noreferrer"
              aria-label="Visit Ful Success"
              style={{ display: 'block', background: 'linear-gradient(135deg, rgba(212,168,83,0.10) 0%, rgba(212,168,83,0.02) 100%)', border: '1px solid rgba(212,168,83,0.20)', padding: 24, textDecoration: 'none', position: 'relative', overflow: 'hidden', minHeight: 260 }}>
              <img
                src="https://assets.cdn.filesafe.space/m9jCzEyKqM4xlMWTjcgS/media/69df09c92b7a6ecd79a9688d.png"
                alt="Ful Success"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </a>
          </div>

          {/* Service cards grid */}
          <div className="lab-grid" style={{ marginBottom: 64 }}>
            {[
              {
                Icon: GitMerge,
                title: 'Workflow Automation',
                desc: 'Automating repetitive day-to-day business tasks — CRM flows, email sequences, data entry, and reporting pipelines that run without human intervention.',
                tag: 'Most Popular',
              },
              {
                Icon: Wrench,
                title: 'Custom Tool Development',
                desc: 'Bespoke internal tools and dashboards built precisely for your business — no bloated off-the-shelf software, just exactly what you need.',
                tag: null,
              },
              {
                Icon: BarChart3,
                title: 'Process Optimisation',
                desc: 'Analysing and restructuring your existing business processes for maximum efficiency — identifying bottlenecks, waste, and opportunities for automation.',
                tag: null,
              },
              {
                Icon: Bot,
                title: 'AI-Powered Solutions',
                desc: 'Leveraging AI for intelligent automation, conversational chatbots, data analysis, and decision-support tools that learn and improve over time.',
                tag: 'New',
              },
            ].map(({ Icon, title, desc, tag }, i) => (
              <div key={i} className="lab-card reveal">
                {tag && (
                  <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4A853', background: 'rgba(212,168,83,0.1)', border: '1px solid rgba(212,168,83,0.22)', padding: '3px 10px', borderRadius: 20, fontWeight: 700 }}>{tag}</div>
                )}
                <div className="lab-card-icon">
                  <Icon size={22} color="#D4A853" aria-hidden="true" />
                </div>
                <h3 className="playfair" style={{ fontSize: 19, fontWeight: 600, marginBottom: 12, color: '#F5F5F0' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(245,245,240,0.5)', lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Process strip */}
          <div className="reveal" style={{ background: 'rgba(212,168,83,0.03)', border: '1px solid rgba(212,168,83,0.1)', padding: '36px 40px', marginBottom: 52 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4A853', fontWeight: 600, marginBottom: 24 }}>How We Work</div>
            <div className="process-strip" style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
              {['Discovery & Audit', 'Process Mapping', 'Build & Test', 'Deploy & Support'].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 160 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(212,168,83,0.12)', border: '1px solid rgba(212,168,83,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="playfair" style={{ fontSize: 13, fontWeight: 700, color: '#D4A853' }}>0{i+1}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(245,245,240,0.75)' }}>{step}</span>
                  </div>
                  {i < 3 && <div className="process-arrow" style={{ flex: 1, height: 1, background: 'rgba(212,168,83,0.15)', minWidth: 20 }} />}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <a href="mailto:contact@neohappylyf.com?subject=Ful Success Enquiry"
              className="btn-gold" style={{ fontSize: 14, padding: '15px 32px' }}>
              Get Started with Ful Success <ArrowRight size={15} />
            </a>
            <span style={{ fontSize: 13, color: 'rgba(245,245,240,0.35)' }}>
              Free 30-minute discovery call available
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ LEADERSHIP ══════════════════════════════════ */}
      <section id="leadership" style={{ padding: '120px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div className="reveal" style={{ marginBottom: 72 }}>
            <span className="section-label">Founder & Leadership</span>
            <div className="gold-rule" />
            <h2 className="playfair" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.18 }}>
              The Vision Behind <em style={{ color: '#D4A853' }}>Neo Happy Lyf</em>
            </h2>
          </div>

          <div className="leader-grid" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 88, alignItems: 'start' }}>

            {/* Photo column */}
            <div className="reveal founder-photo-wrap">
              <div className="founder-photo-inner" aria-label="Founder photo placeholder">
                {/* Decorative corner marks */}
                {[['top:0;left:0', 'borderTop:2px solid #D4A853;borderLeft:2px solid #D4A853'],
                  ['top:0;right:0', 'borderTop:2px solid #D4A853;borderRight:2px solid #D4A853'],
                  ['bottom:0;left:0', 'borderBottom:2px solid #D4A853;borderLeft:2px solid #D4A853'],
                  ['bottom:0;right:0', 'borderBottom:2px solid #D4A853;borderRight:2px solid #D4A853'],
                ].map(([pos, borders], i) => {
                  const posStyle = Object.fromEntries(pos.split(';').map(s => { const [k,v] = s.split(':'); return [k, v] }))
                  const borderStyle = Object.fromEntries(borders.split(';').map(s => { const [k,v] = s.split(':'); return [k, v] }))
                  return <div key={i} aria-hidden="true" style={{ position: 'absolute', width: 20, height: 20, ...posStyle, ...borderStyle }} />
                })}

                {/* Ambient gradient blobs */}
                <div aria-hidden="true" style={{ position: 'absolute', top: '10%', right: '10%', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div aria-hidden="true" style={{ position: 'absolute', bottom: '15%', left: '5%', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <img
                  src="https://assets.cdn.filesafe.space/m9jCzEyKqM4xlMWTjcgS/media/685aa9b8f1a848bc1fe8873d.jpeg"
                  alt="Krishnan Govindan — Founder & CEO"
                  loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', zIndex: 0 }}
                />
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.75) 100%)', zIndex: 1, pointerEvents: 'none' }} />
                <span className="founder-role-tag" style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
                  <Star size={11} aria-hidden="true" />
                  Founder & CEO
                </span>
              </div>

              {/* Social links */}
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                {[
                  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { Icon: Twitter,  href: '#', label: 'Twitter' },
                  { Icon: Mail,     href: 'mailto:contact@neohappylyf.com', label: 'Email' },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label}
                    style={{ width: 38, height: 38, background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A853', textDecoration: 'none', transition: 'all 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,168,83,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,168,83,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                    <Icon size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bio column */}
            <div className="reveal">
              <h3 className="playfair" style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, marginBottom: 6 }}>Krishnan Govindan</h3>
              <p style={{ color: '#D4A853', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 32 }}>
                Founder & Chief Executive Officer · Neo Happy Lyf Mind Care For U Pvt. Ltd.
              </p>

              {/* Founder quote — editorial style */}
              <div className="founder-quote">
                <Quote size={20} color="rgba(212,168,83,0.4)" style={{ marginBottom: 12 }} aria-hidden="true" />
                <p className="founder-quote-text">
                  "Technology should serve humanity's deepest needs — healing minds and freeing hands."
                </p>
                <div style={{ marginTop: 16, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,168,83,0.6)', fontWeight: 600 }}>
                  — Krishnan Govindan
                </div>
              </div>

              {/* Bio paragraphs */}
              <div style={{ color: 'rgba(245,245,240,0.6)', lineHeight: 1.95, fontSize: 17, marginBottom: 36 }}>
                <p style={{ marginBottom: 16 }}>
                  Krishnan Govindan is the founder and driving force behind Neo Happy Lyf — a company built from the conviction that mental wellness and operational excellence are not trade-offs, but complements of a fully realised human life.
                </p>
                <p style={{ marginBottom: 16 }}>
                  Based in Tamil Nadu, India, Krishnan recognised an underserved gap: the Indian diaspora needed culturally rooted mental health and life coaching support, accessible through modern digital platforms. What began as India Therapist (indiatherapist.com) in 2022 — before the company was even formally incorporated — has since grown into a multi-vertical ecosystem that bridges continents.
                </p>
                <p>
                  An entrepreneur at heart, Krishnan simultaneously identified the operational pain points holding growing businesses back — and built Ful Success (fulsuccess.com) to address them head-on. He believes automation is a fundamentally humanist pursuit: free people from the mundane, and they flourish.
                </p>
              </div>

              {/* Expertise pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                {['Mental Wellness', 'Ful Success', 'NRI Services', 'Entrepreneurship', 'AI & Technology', 'Platform Building'].map(tag => (
                  <span key={tag} className="expertise-pill">
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#D4A853', flexShrink: 0 }} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Domain tags */}
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[
                  ['Mental Wellness', 'Domain Expert'],
                  ['Ful Success', 'Builder'],
                  ['NRI Services', 'Pioneer'],
                  ['Thought Leadership', 'Speaker'],
                ].map(([domain, role]) => (
                  <div key={domain} style={{ borderLeft: '2px solid rgba(212,168,83,0.5)', paddingLeft: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{domain}</div>
                    <div style={{ fontSize: 10, color: '#D4A853', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ TRUST SIGNALS ══════════════════════════════════ */}
      <section id="trust" style={{ padding: '100px 40px', background: '#060606', borderTop: '1px solid rgba(212,168,83,0.09)', borderBottom: '1px solid rgba(212,168,83,0.09)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div className="reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label">Built on Trust</span>
            <div className="gold-rule" style={{ margin: '20px auto 28px' }} />
            <h2 className="playfair" style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 700, lineHeight: 1.2 }}>
              Why Choose <em style={{ color: '#D4A853' }}>Neo Happy Lyf</em>
            </h2>
          </div>

          <div className="reveal trust-strip">
            {[
              { Icon: BadgeCheck,  title: 'Registered Company',           sub: 'Private Limited · Est. 2023',       color: '#22c55e' },
              { Icon: ShieldCheck, title: 'Data Privacy Committed',       sub: 'Secure & Confidential Platforms',   color: '#6C9FD4' },
              { Icon: Globe,       title: 'Serving 20+ Countries',        sub: 'Global NRI Communities',            color: '#9B8EC4' },
              { Icon: Clock,       title: '4+ Years in Operation',        sub: 'Continuously Operating Since 2022', color: '#F4788A' },
              { Icon: Award,       title: 'Culturally Rooted',            sub: 'Built for the Indian Diaspora',     color: '#D4A853' },
            ].map(({ Icon, title, sub, color }, i) => (
              <div key={i} className="trust-badge">
                <div className="trust-icon-wrap" style={{ background: `${color}10`, border: `1px solid ${color}28` }}>
                  <Icon size={22} color={color} aria-hidden="true" />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#F5F5F0', marginBottom: 4, letterSpacing: '0.01em' }}>{title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.38)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════ TOOLS & INTEGRATIONS ══════════════════════════════════ */}
      <section id="tools" style={{ padding: '100px 40px', background: 'rgba(255,255,255,0.008)', borderTop: '1px solid rgba(212,168,83,0.07)', borderBottom: '1px solid rgba(212,168,83,0.07)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-label">Tools & Integrations</span>
            <div className="gold-rule" style={{ margin: '20px auto 28px' }} />
            <h2 className="playfair" style={{ fontSize: 'clamp(26px, 3.5vw, 46px)', fontWeight: 700, lineHeight: 1.18, maxWidth: 560, margin: '0 auto 16px' }}>
              Platforms We Work With
            </h2>
            <p style={{ color: 'rgba(245,245,240,0.45)', maxWidth: 460, margin: '0 auto', lineHeight: 1.85, fontSize: 16 }}>
              Our wellness and Ful Success services integrate with the tools your business and clients already rely on.
            </p>
          </div>

          {/* Three scrolling columns */}
          <div className="tools-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>

            {/* Column 1 — scrolls downward */}
            {(() => {
              const items = [
                { label: 'Zoom',              sub: 'Video Sessions',      bg: '#2D8CFF18', border: '#2D8CFF30', icon: '🎥' },
                { label: 'Stripe',            sub: 'Payments',            bg: '#635BFF18', border: '#635BFF30', icon: '💳' },
                { label: 'Google Workspace',  sub: 'Productivity',        bg: '#EA433518', border: '#EA433530', icon: '📂' },
                { label: 'WhatsApp Business', sub: 'Client Messaging',    bg: '#25D36618', border: '#25D36630', icon: '💬' },
                { label: 'Calendly',          sub: 'Session Scheduling',  bg: '#006BFF18', border: '#006BFF30', icon: '📅' },
                { label: 'Notion',            sub: 'Knowledge Base',      bg: '#ffffff12', border: '#ffffff22', icon: '📋' },
                { label: 'Typeform',          sub: 'Client Intake',       bg: '#262627',   border: '#555',      icon: '📝' },
                { label: 'Loom',              sub: 'Async Video',         bg: '#625DF518', border: '#625DF530', icon: '▶️' },
              ]
              const doubled = [...items, ...items]
              return (
                <div className="scroll-viewport">
                  <div className="scroll-track-down">
                    {doubled.map((item, i) => (
                      <div key={i} className="tool-card">
                        <div className="tool-icon" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                          <span style={{ fontSize: 18 }} aria-hidden="true">{item.icon}</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F0', marginBottom: 2 }}>{item.label}</div>
                          <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.38)', letterSpacing: '0.04em' }}>{item.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* Column 2 — scrolls upward */}
            {(() => {
              const items = [
                { label: 'Zapier',          sub: 'Workflow Automation',  bg: '#FF4A0018', border: '#FF4A0030', icon: '⚡' },
                { label: 'Make',            sub: 'No-Code Automation',   bg: '#6E5CE618', border: '#6E5CE630', icon: '🔄' },
                { label: 'OpenAI',          sub: 'AI Integrations',      bg: '#10A37F18', border: '#10A37F30', icon: '🤖' },
                { label: 'Razorpay',        sub: 'India Payments',       bg: '#3395FF18', border: '#3395FF30', icon: '₹' },
                { label: 'Mailchimp',       sub: 'Email Marketing',      bg: '#FFE01B18', border: '#FFE01B30', icon: '📧' },
                { label: 'Airtable',        sub: 'Data Management',      bg: '#18BFFF18', border: '#18BFFF30', icon: '🗂️' },
                { label: 'PayPal',          sub: 'Global Payments',      bg: '#003087',   border: '#00308750', icon: '💰' },
                { label: 'Slack',           sub: 'Team Collaboration',   bg: '#4A154B18', border: '#4A154B40', icon: '💼' },
              ]
              const doubled = [...items, ...items]
              return (
                <div className="scroll-viewport">
                  <div className="scroll-track-up">
                    {doubled.map((item, i) => (
                      <div key={i} className="tool-card">
                        <div className="tool-icon" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                          <span style={{ fontSize: 18 }} aria-hidden="true">{item.icon}</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F0', marginBottom: 2 }}>{item.label}</div>
                          <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.38)', letterSpacing: '0.04em' }}>{item.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* Column 3 — scrolls downward */}
            {(() => {
              const items = [
                { label: 'Google Meet',    sub: 'Video Consultations',   bg: '#00897B18', border: '#00897B30', icon: '🎦' },
                { label: 'ConvertKit',     sub: 'Newsletter',            bg: '#FB6970',   border: '#FB697040', icon: '📨' },
                { label: 'HubSpot',       sub: 'CRM',                   bg: '#FF7A5918', border: '#FF7A5930', icon: '🏆' },
                { label: 'Google Analytics', sub: 'Platform Insights',   bg: '#F9AB0018', border: '#F9AB0030', icon: '📊' },
                { label: 'Hotjar',        sub: 'UX Analytics',          bg: '#FD3A2D18', border: '#FD3A2D30', icon: '🔥' },
                { label: 'Webflow',       sub: 'Landing Pages',         bg: '#4353FF18', border: '#4353FF30', icon: '🌐' },
                { label: 'n8n',           sub: 'Self-hosted Automation', bg: '#EA4B7118', border: '#EA4B7130', icon: '🔧' },
                { label: 'Intercom',      sub: 'Client Support',        bg: '#1F8DED18', border: '#1F8DED30', icon: '💭' },
              ]
              const doubled = [...items, ...items]
              return (
                <div className="scroll-viewport tools-col-hide" style={{ display: 'block' }}>
                  <div className="scroll-track-down" style={{ animationDuration: '26s' }}>
                    {doubled.map((item, i) => (
                      <div key={i} className="tool-card">
                        <div className="tool-icon" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                          <span style={{ fontSize: 18 }} aria-hidden="true">{item.icon}</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#F5F5F0', marginBottom: 2 }}>{item.label}</div>
                          <div style={{ fontSize: 12, color: 'rgba(245,245,240,0.38)', letterSpacing: '0.04em' }}>{item.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ INSIGHTS / BLOG ══════════════════════════════════ */}
      <section id="insights" style={{ padding: '100px 40px', borderTop: '1px solid rgba(212,168,83,0.07)', borderBottom: '1px solid rgba(212,168,83,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 52 }}>
            <div>
              <span className="section-label">Insights & Updates</span>
              <div className="gold-rule" />
              <h2 className="playfair" style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 700, lineHeight: 1.2 }}>
                Thinking Out Loud on <em style={{ color: '#D4A853' }}>Wellness & Systems</em>
              </h2>
            </div>
            <span className="badge-upcoming" style={{ fontSize: 11 }}>
              <span className="live-dot" />
              Blog Launching Soon
            </span>
          </div>

          <div className="blog-grid reveal">
            {[
              {
                tag: 'Mental Wellness',
                title: 'Why NRIs Struggle to Access Indian Therapy — And What We\'re Doing About It',
                excerpt: 'The gap between demand and supply in NRI mental health support is massive. Here\'s the data, the problem, and how India Therapist (indiatherapist.com) was built as the answer.',
                date: 'Coming Soon',
                readTime: '8 min read',
              },
              {
                tag: 'Ful Success',
                title: 'The Hidden Cost of Manual Processes: What Most Indian SMEs Don\'t Track',
                excerpt: 'Most small businesses underestimate how much time — and money — is lost to repetitive tasks. A practical breakdown of the Ful Success opportunity.',
                date: 'Coming Soon',
                readTime: '6 min read',
              },
              {
                tag: 'Entrepreneurship',
                title: 'Building a Global Wellness Conglomerate from India: The Neo Happy Lyf Story',
                excerpt: 'A candid account of building five platforms from South India to serve a global diaspora — the challenges, the lessons, and the vision that keeps it moving.',
                date: 'Coming Soon',
                readTime: '10 min read',
              },
            ].map((post, i) => (
              <article key={i} className="blog-card" aria-label={post.title}>
                {/* Coming soon overlay */}
                <div style={{ position: 'absolute', top: 16, right: 16 }}>
                  <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.25)', fontWeight: 600 }}>Draft</span>
                </div>

                <span className="blog-tag">{post.tag}</span>

                <h3 className="playfair" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4, color: '#F5F5F0' }}>{post.title}</h3>

                <p style={{ fontSize: 13, color: 'rgba(245,245,240,0.45)', lineHeight: 1.8, flexGrow: 1 }}>{post.excerpt}</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid rgba(212,168,83,0.08)' }}>
                  <span style={{ fontSize: 11, color: 'rgba(245,245,240,0.25)', letterSpacing: '0.06em' }}>{post.date}</span>
                  <span style={{ fontSize: 11, color: 'rgba(212,168,83,0.5)', letterSpacing: '0.06em' }}>{post.readTime}</span>
                </div>
              </article>
            ))}
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
              Invest in Wellness<br /><em style={{ color: '#D4A853' }}>&amp; Ful Success</em>
            </h2>
            <p style={{ color: 'rgba(245,245,240,0.5)', maxWidth: 520, margin: '0 auto', lineHeight: 1.88, fontSize: 16 }}>
              We are open to strategic partnerships, investment conversations, and collaboration opportunities that align with our mission of healing minds and building efficient systems.
            </p>
          </div>

          <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            {[
              { title: 'Strategic Investor', desc: 'Partner with us to scale our wellness platforms across Southeast Asia and the global Indian diaspora. Strong unit economics and underserved markets.' },
              { title: 'Platform Partner',   desc: 'Integrate your services with our growing ecosystem — therapists, coaches, and digital tools that serve a dedicated, engaged user base.' },
              { title: 'Technology Partner', desc: 'Collaborate on Ful Success or co-develop specialised digital health tools with an experienced team and clear market validation.' },
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
      <section id="contact" style={{ padding: '120px 40px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(212,168,83,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Header */}
          <div className="reveal" style={{ marginBottom: 64, maxWidth: 640 }}>
            <span className="section-label">Get In Touch</span>
            <div className="gold-rule" />
            <h2 className="playfair" style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 18 }}>
              Let's Build Something<br /><em style={{ color: '#D4A853' }}>Together</em>
            </h2>
            <p style={{ color: 'rgba(245,245,240,0.5)', lineHeight: 1.9, fontSize: 16 }}>
              Whether you're seeking wellness support, Ful Success solutions, or partnership opportunities — the right door is open for you.
            </p>
          </div>

          {/* Three contact channel cards */}
          <div className="contact-cards-grid reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, marginBottom: 64 }}>
            {[
              {
                Icon: Brain,
                color: '#6C9FD4',
                title: 'Wellness Platforms',
                desc: 'Enquiries about India Therapist, Indian Life Coaches, Indian Divorce Coach, or mental wellness partnerships.',
                email: 'contact@neohappylyf.com',
                label: 'General & Wellness',
              },
              {
                Icon: Cpu,
                color: '#D4A853',
                title: 'Ful Success',
                desc: 'Discuss your Ful Success project, custom tool development, process optimisation, or AI-powered solutions.',
                email: 'automation@neohappylyf.com',
                label: 'Ful Success Division',
              },
              {
                Icon: HeartHandshake,
                color: '#9B8EC4',
                title: 'Partnerships & Investment',
                desc: 'Strategic investment conversations, platform partnerships, media enquiries, and collaboration opportunities.',
                email: 'partnerships@neohappylyf.com',
                label: 'Investors & Partners',
              },
            ].map(({ Icon, color, title, desc, email, label }) => (
              <div key={title} className="contact-card">
                <div style={{ width: 50, height: 50, background: `${color}12`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                  <Icon size={22} color={color} aria-hidden="true" />
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color, fontWeight: 700, marginBottom: 6 }}>{label}</div>
                  <h3 className="playfair" style={{ fontSize: 19, fontWeight: 600, color: '#F5F5F0', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 15, color: 'rgba(245,245,240,0.48)', lineHeight: 1.75 }}>{desc}</p>
                </div>
                <a href={`mailto:${email}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color, fontSize: 13, fontWeight: 600, textDecoration: 'none', marginTop: 'auto', letterSpacing: '0.01em', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  <Mail size={13} aria-hidden="true" />
                  {email}
                </a>
              </div>
            ))}
          </div>

          {/* Form + HQ panel */}
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>

            {/* Contact form */}
            <div className="reveal">
              <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D4A853', fontWeight: 600, marginBottom: 24 }}>Send Us a Message</div>
              {submitted ? (
                <div style={{ background: 'rgba(212,168,83,0.05)', border: '1px solid rgba(212,168,83,0.2)', padding: '52px 40px', textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <BadgeCheck size={24} color="#22c55e" />
                  </div>
                  <div className="playfair" style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>Message Received</div>
                  <p style={{ color: 'rgba(245,245,240,0.5)', fontSize: 14, lineHeight: 1.8 }}>
                    Thank you for reaching out. We review all enquiries personally and will respond within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label className="field-label" htmlFor="c-name">Full Name *</label>
                      <input id="c-name" className="form-ctrl" name="name" value={form.name} onChange={handleForm} placeholder="Your name" required autoComplete="name" />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="c-email">Email *</label>
                      <input id="c-email" className="form-ctrl" type="email" name="email" value={form.email} onChange={handleForm} placeholder="your@email.com" required autoComplete="email" />
                    </div>
                  </div>
                  <div>
                    <label className="field-label" htmlFor="c-subject">Subject</label>
                    <select id="c-subject" className="form-ctrl" name="subject" value={form.subject} onChange={handleForm} style={{ cursor: 'pointer' }}>
                      <option value="">Select a topic</option>
                      <option value="wellness">Wellness Platforms</option>
                      <option value="fulsuccess">Ful Success</option>
                      <option value="partnership">Partnership / Investment</option>
                      <option value="media">Media / Press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="field-label" htmlFor="c-message">Message *</label>
                    <textarea id="c-message" className="form-ctrl" name="message" value={form.message} onChange={handleForm} placeholder="Tell us about your enquiry…" rows={5} style={{ resize: 'vertical' }} required />
                  </div>
                  <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '16px 24px', fontSize: 14 }}>
                    Send Message <ArrowRight size={15} />
                  </button>
                  <p style={{ fontSize: 11, color: 'rgba(245,245,240,0.22)', textAlign: 'center', letterSpacing: '0.04em' }}>
                    We respond to all enquiries within 48 hours · contact@neohappylyf.com
                  </p>
                </form>
              )}
            </div>

            {/* HQ + info */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="hq-map">
                <div aria-hidden="true" style={{ position: 'absolute', right: 20, top: 20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div className="hq-pin">
                  <div className="hq-pin-inner">
                    <MapPin size={18} color="#D4A853" />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.35)', fontWeight: 600, marginBottom: 4 }}>Headquarters</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#F5F5F0', marginBottom: 2 }}>Tamil Nadu, India</div>
                  <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.45)' }}>Serving Clients Worldwide</div>
                </div>
              </div>

              {/* Response time */}
              <div style={{ background: 'rgba(212,168,83,0.03)', border: '1px solid rgba(212,168,83,0.1)', padding: '24px 28px' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#D4A853', fontWeight: 600, marginBottom: 16 }}>Response Times</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    ['General Enquiries',      'Within 48 hours'],
                    ['Ful Success Projects',  'Within 24 hours'],
                    ['Investment / Partners',  'Within 72 hours'],
                  ].map(([type, time]) => (
                    <div key={type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: 'rgba(245,245,240,0.55)' }}>{type}</span>
                      <span style={{ fontSize: 12, color: '#D4A853', fontWeight: 600, letterSpacing: '0.04em' }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct emails */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'General & Wellness',    email: 'contact@neohappylyf.com' },
                  { label: 'Ful Success',          email: 'automation@neohappylyf.com' },
                  { label: 'Partnerships',          email: 'partnerships@neohappylyf.com' },
                ].map(({ label, email }) => (
                  <div key={email} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 34, height: 34, background: 'rgba(212,168,83,0.07)', border: '1px solid rgba(212,168,83,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={13} color="#D4A853" aria-hidden="true" />
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: 'rgba(245,245,240,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</div>
                      <a href={`mailto:${email}`} style={{ fontSize: 13, color: 'rgba(245,245,240,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#D4A853'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,240,0.7)'}>
                        {email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>{/* end #main-content */}

      {/* ══════════════════════════════════ FOOTER ══════════════════════════════════ */}
      <footer role="contentinfo" style={{ background: '#050505', borderTop: '1px solid rgba(212,168,83,0.1)', padding: '80px 40px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Top band — tagline + social */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, paddingBottom: 56, borderBottom: '1px solid rgba(212,168,83,0.07)', marginBottom: 56 }}>
            <div style={{ maxWidth: 420 }}>
              <Logo onClick={() => nav('hero')} />
              <p className="playfair" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', fontStyle: 'italic', color: 'rgba(245,245,240,0.35)', marginTop: 20, lineHeight: 1.5 }}>
                "Empowering Lives.<br />Powering Ful Success."
              </p>
            </div>
            {/* Social icons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.25)', fontWeight: 600 }}>Follow Us</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { Icon: Linkedin,  href: '#', label: 'LinkedIn' },
                  { Icon: Twitter,   href: '#', label: 'Twitter / X' },
                  { Icon: Instagram, href: '#', label: 'Instagram' },
                  { Icon: Youtube,   href: '#', label: 'YouTube' },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="social-icon">
                    <Icon size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter band */}
          <div className="newsletter-band">
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4A853', fontWeight: 700, marginBottom: 6 }}>Stay Informed</div>
              <div className="playfair" style={{ fontSize: 20, fontWeight: 600, color: '#F5F5F0', marginBottom: 4 }}>Join Our Newsletter</div>
              <div style={{ fontSize: 13, color: 'rgba(245,245,240,0.4)', maxWidth: 320 }}>
                Insights on mental wellness, Ful Success, and the Neo Happy Lyf ecosystem. No spam — ever.
              </div>
            </div>
            {newsSent ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#22c55e', fontSize: 14, fontWeight: 600 }}>
                <BadgeCheck size={18} /> You're on the list — thank you!
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={e => { e.preventDefault(); if (newsEmail) setNewsSent(true) }}>
                <input
                  className="newsletter-input"
                  type="email"
                  value={newsEmail}
                  onChange={e => setNewsEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="newsletter-btn">Subscribe</button>
              </form>
            )}
          </div>

          {/* Main link grid */}
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>

            {/* Brand column */}
            <div>
              <p style={{ fontSize: 15, color: 'rgba(245,245,240,0.4)', lineHeight: 1.9, maxWidth: 280, marginBottom: 20 }}>
                Neo Happy Lyf Mind Care For U Private Limited — building wellness platforms and Ful Success systems for the global Indian diaspora.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href="mailto:contact@neohappylyf.com" className="foot-link" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Mail size={12} aria-hidden="true" /> contact@neohappylyf.com
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 15, color: 'rgba(245,245,240,0.45)' }}>
                  <MapPin size={12} aria-hidden="true" /> Tamil Nadu, India · Serving Clients Worldwide
                </div>
              </div>
            </div>

            {/* Ventures */}
            <div>
              <div className="foot-col-head">Ventures</div>
              {VENTURES.map(v => (
                <a key={v.name} href={v.url} target="_blank" rel="noopener noreferrer" className="foot-link" style={{ display: 'block', lineHeight: 1.3 }}>
                  <span style={{ display: 'block' }}>{v.displayName}</span>
                  <span style={{ display: 'block', fontSize: 11, color: 'rgba(245,245,240,0.3)', letterSpacing: '0.04em' }}>{v.domain}</span>
                </a>
              ))}
            </div>

            {/* Company */}
            <div>
              <div className="foot-col-head">Company</div>
              {[
                ['about',      'About Us'],
                ['ventures',   'Our Ventures'],
                ['fulsuccess', 'Ful Success'],
                ['leadership', 'Leadership'],
                ['contact',    'Contact'],
              ].map(([id, label]) => (
                <span key={id} className="foot-link" onClick={() => nav(id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && nav(id)}>{label}</span>
              ))}
            </div>

            {/* Services */}
            <div>
              <div className="foot-col-head">Services</div>
              {[
                ['fulsuccess', 'Workflow Automation'],
                ['fulsuccess', 'Custom Tool Dev'],
                ['fulsuccess', 'Process Optimisation'],
                ['fulsuccess', 'AI Solutions'],
                ['partner',    'Partnerships'],
              ].map(([id, label]) => (
                <span key={label} className="foot-link" onClick={() => nav(id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && nav(id)}>{label}</span>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(212,168,83,0.07)', padding: '24px 0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
            <p style={{ fontSize: 12, color: 'rgba(245,245,240,0.2)' }}>
              © 2023–{new Date().getFullYear()} Neo Happy Lyf Mind Care For U Pvt. Ltd. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: 'rgba(245,245,240,0.18)', letterSpacing: '0.06em' }}>Made with purpose in India</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(212,168,83,0.25)', flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontSize: 12, color: 'rgba(245,245,240,0.18)', letterSpacing: '0.06em' }}>Serving the Global Indian Diaspora</span>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}
