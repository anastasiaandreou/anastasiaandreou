<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Anastasia Andreou — CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#2A1608;
    --clay-900:#7A2E0C;
    --clay-700:#B14612;
    --clay-600:#D65A1A;
    --clay-500:#F1732B;
    --clay-400:#FF9552;
    --clay-100:#FBE3D2;
    --cream:#FFF8F2;
    --sidebar-1:#3B1707;
    --sidebar-2:#7A2E0C;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{
    font-family:'Inter', sans-serif;
    background:#EDE3D9;
    display:flex;
    align-items:center;
    justify-content:center;
    min-height:100vh;
    padding:32px 16px;
    color:var(--ink);
  }
  .card{
    width:100%;
    max-width:1040px;
    display:grid;
    grid-template-columns:280px 1fr;
    border-radius:20px;
    overflow:hidden;
    box-shadow:0 30px 60px -20px rgba(122,46,12,0.35);
    background:var(--cream);
  }

  /* Sidebar */
  .sidebar{
    background:linear-gradient(165deg, var(--sidebar-2) 0%, var(--sidebar-1) 100%);
    color:#FBE3D2;
    padding:40px 28px;
    display:flex;
    flex-direction:column;
    align-items:center;
    text-align:center;
    position:relative;
  }
  .lang-toggle{
    position:absolute;
    top:24px;
    right:24px;
    display:flex;
    gap:6px;
    font-size:11px;
    font-weight:600;
    letter-spacing:0.02em;
  }
  .lang-toggle span{opacity:0.55;}
  .lang-toggle span.active{opacity:1;text-decoration:underline;text-underline-offset:3px;}
  .avatar{
    width:92px;
    height:92px;
    border-radius:50%;
    background:var(--clay-400);
    border:3px solid rgba(255,255,255,0.25);
    margin-top:24px;
    margin-bottom:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family:'Fraunces', serif;
    font-size:30px;
    font-weight:500;
    color:var(--sidebar-1);
  }
  .sidebar h1{
    font-family:'Fraunces', serif;
    font-weight:500;
    font-size:22px;
    color:#FFFFFF;
  }
  .sidebar .role{
    font-size:13px;
    color:var(--clay-400);
    margin-top:4px;
    margin-bottom:22px;
    font-weight:500;
  }
  .socials{
    display:flex;
    gap:12px;
    margin-bottom:28px;
  }
  .socials a{
    width:32px;
    height:32px;
    border-radius:50%;
    border:1px solid rgba(255,255,255,0.25);
    display:flex;
    align-items:center;
    justify-content:center;
    color:#FBE3D2;
    text-decoration:none;
    font-size:13px;
  }
  .contact{
    font-size:13px;
    line-height:1.9;
    color:#F1D5BE;
    margin-bottom:30px;
  }
  .download-btn{
    width:100%;
    padding:12px;
    border-radius:10px;
    border:1.5px solid #FBE3D2;
    background:transparent;
    color:#FFFFFF;
    font-family:'Inter', sans-serif;
    font-weight:600;
    font-size:13px;
    cursor:pointer;
    margin-top:auto;
  }
  .rights{
    font-size:10.5px;
    color:rgba(251,227,210,0.5);
    margin-top:18px;
  }

  /* Main content */
  .main{
    padding:48px 44px;
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content:center;
    overflow:hidden;
  }
  .eyebrow{
    font-size:13px;
    color:var(--clay-600);
    font-weight:500;
    margin-bottom:10px;
  }
  .main h2{
    font-family:'Fraunces', serif;
    font-weight:500;
    font-size:44px;
    line-height:1.1;
    color:var(--ink);
    margin-bottom:18px;
  }
  .main p{
    max-width:360px;
    font-size:14.5px;
    line-height:1.75;
    color:#6B5545;
    margin-bottom:28px;
  }
  .cta-row{
    display:flex;
    gap:12px;
  }
  .btn-primary{
    padding:13px 22px;
    border-radius:10px;
    border:none;
    background:var(--clay-500);
    color:#FFFFFF;
    font-weight:600;
    font-size:13.5px;
    cursor:pointer;
  }
  .btn-secondary{
    padding:13px 22px;
    border-radius:10px;
    border:1.5px solid #E3D3C4;
    background:transparent;
    color:var(--ink);
    font-weight:600;
    font-size:13.5px;
    cursor:pointer;
  }
  .portrait{
    position:absolute;
    right:-40px;
    top:0;
    bottom:0;
    width:340px;
    background:
      radial-gradient(circle at 60% 50%, var(--clay-400) 0%, var(--clay-600) 100%);
    border-radius:50% 0 0 50% / 55% 0 0 55%;
    display:flex;
    align-items:flex-end;
    justify-content:center;
    overflow:hidden;
  }
  .portrait svg{
    width:220px;
    height:auto;
    display:block;
  }
  .nav-rail{
    position:absolute;
    right:0;
    top:0;
    bottom:0;
    width:56px;
    background:rgba(255,255,255,0.6);
    border-left:1px solid #EEDFCF;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:22px;
  }
  .nav-rail .dot{
    width:34px;
    height:34px;
    border-radius:10px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:var(--clay-700);
    font-size:15px;
  }
  .nav-rail .dot.active{
    background:var(--clay-500);
    color:#FFFFFF;
  }

  @media (max-width:720px){
    .card{grid-template-columns:1fr;}
    .portrait{display:none;}
    .nav-rail{display:none;}
    .main{padding:40px 28px;}
    .main h2{font-size:34px;}
  }
</style>
</head>
<body>

<div class="card">

  <div class="sidebar">
    <div class="lang-toggle"><span class="active">En</span><span>Fr</span></div>
    <div class="avatar">AA</div>
    <h1>Anastasia Andreou</h1>
    <div class="role">Web Developer</div>
    <div class="socials">
      <a href="#" aria-label="Twitter">𝕏</a>
      <a href="#" aria-label="LinkedIn">in</a>
      <a href="#" aria-label="GitHub">gh</a>
    </div>
    <div class="contact">
      +357 123 456 789<br>
      anastasia@andreou.com
    </div>
    <button class="download-btn">Download CV</button>
    <div class="rights">© 2026 All rights reserved.</div>
  </div>

  <div class="main">
    <div class="nav-rail">
      <div class="dot active">●</div>
      <div class="dot">▲</div>
      <div class="dot">■</div>
      <div class="dot">✉</div>
    </div>

    <div class="eyebrow">Frontend developer</div>
    <h2>Anastasia<br>Andreou</h2>
    <p>
      I build clean, fast interfaces and enjoy turning ideas into
      products people actually want to use. Currently focused on
      React, design systems, and accessible front-end architecture.
    </p>
    <div class="cta-row">
      <button class="btn-primary">Download CV</button>
      <button class="btn-secondary">Contact</button>
    </div>

    <div class="portrait">
      <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="230" rx="90" ry="60" fill="#3B1707" opacity="0.15"/>
        <path d="M40 260 L40 190 Q40 120 100 120 Q160 120 160 190 L160 260 Z" fill="#3B1707"/>
        <circle cx="100" cy="80" r="52" fill="#F1CBAA"/>
        <path d="M50 80 Q45 30 100 25 Q155 30 150 80 Q150 55 100 50 Q50 55 50 80 Z" fill="#2A1608"/>
      </svg>
    </div>
  </div>

</div>

</body>
</html>
