"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "en" | "zh";
type MissionState = "idle" | "running" | "paused" | "complete";

const COPY = {
  en: {
    nav: ["Mission", "System", "Model"],
    eyebrow: "Rapid response for constrained infrastructure",
    headlineA: "Reach the incident",
    headlineB: "before the road clears.",
    intro:
      "A mobile base launches a heterogeneous drone team to inspect, connect and control an incident while ground responders are still approaching.",
    openMission: "Open live mission",
    currentScenario: "Current scenario",
    scenarioName: "Bridge vehicle fire",
    scenarioMeta: "2 lanes · 1 shoulder · single island link",
    lab: "Interactive operations research lab",
    bridgeLength: "Bridge length",
    flightRadius: "Flight radius",
    controlRadius: "Control radius",
    deployment: "Coverage plan",
    endpointMode: "Two-end deployment",
    vesselMode: "Intermediate vessel stations",
    vesselUnit: "vessel",
    vesselUnits: "vessels",
    rangeNote: "Effective radius",
    groundRoute: "Ground fire route",
    droneRoute: "Drone flight route",
    normalTraffic: "Traffic moving · incident detected",
    fireStatus: "Fire suppression",
    contained: "Contained",
    activeFire: "Active",
    active: "Active incident",
    missionClock: "Mission clock",
    weather: "Crosswind 18 km/h",
    bridge: "Island Link · Sector 04",
    mainland: "MAINLAND",
    island: "ISLAND",
    incident: "Vehicle fire",
    safe: "ENTRY CLOSED · EXIT OPEN",
    control: "Mission control",
    start: "Start response",
    pause: "Pause",
    resume: "Resume",
    reset: "Reset",
    status: "Operational phase",
    phases: [
      "Awaiting incident confirmation",
      "Launching reconnaissance drone",
      "Establishing live situational view",
      "Deploying traffic and relay drones",
      "Clearing vehicles toward both exits",
      "Emergency access route confirmed",
    ],
    assets: "Air assets",
    firstEyes: "First eyes",
    routeReady: "Route ready",
    cleared: "Vehicles cleared",
    live: "LIVE",
    queued: "queued",
    scout: "Scout",
    scoutTask: "Thermal view",
    relay: "Relay",
    relayTask: "Network link",
    traffic: "Traffic",
    trafficTask: "Exit guidance",
    fireDrone: "Fire support",
    fireTask: "Initial suppression",
    fireEngine: "Fire engine",
    timeline: "Response sequence",
    stepLabels: ["Detect", "Inspect", "Coordinate", "Clear"],
    systemEyebrow: "One response loop, four decisions",
    systemTitle: "The drones arrive first. The emergency services arrive informed.",
    systemIntro:
      "The system does not replace firefighters or police. It reduces the blind period before they can safely reach an isolated incident.",
    cards: [
      ["01", "Pre-position", "Place mobile bases and vessel relays according to bridge length, flight radius and control range."],
      ["02", "Dispatch", "Select the closest capable base and the minimum useful mix of drone roles."],
      ["03", "Coordinate", "Assign observation, relay and traffic-control tasks without airspace conflicts."],
      ["04", "Re-optimize", "Update the plan when wind, fire, congestion, energy or communication changes."],
    ],
    modelEyebrow: "Operational model",
    modelTitle: "Optimize time, exposure and access — not spectacle.",
    objective: "Weighted objective",
    objectiveNote:
      "Confirmation time + vehicle exposure + emergency access time + energy + operational risk",
    decisions: "Core decisions",
    decisionItems: [
      "Which mobile base responds?",
      "Which drone performs each task?",
      "Where does every drone fly and hold?",
      "When is the emergency corridor safe?",
    ],
    compare: "Evaluation baselines",
    compareItems: ["Ground response only", "Single scout drone", "Rule-based team", "Rolling-horizon swarm"],
    boundaries: "Reality boundary",
    boundaryText:
      "Traffic commands assume authorized emergency equipment. Drones provide early intelligence, communication and limited support; trained ground crews remain responsible for major firefighting, rescue and medical work.",
    roadmap: "SCENARIO ROADMAP",
    roadmapItems: ["Bridge fire", "Elevated road", "Remote highway", "Rail corridor"],
    now: "NOW",
    next: "NEXT",
    footer: "Emergency Drone · Research prototype for coordinated emergency response",
  },
  zh: {
    nav: ["任务", "系统", "模型"],
    eyebrow: "受限基础设施快速响应",
    headlineA: "在道路清空之前，",
    headlineB: "先抵达事故现场。",
    intro:
      "移动基地派出异构无人机团队，在地面救援尚未抵达时完成侦察、通信与交通引导。",
    openMission: "进入实时任务",
    currentScenario: "当前场景",
    scenarioName: "跨海大桥车辆起火",
    scenarioMeta: "双向两车道 · 一条应急车道 · 岛屿唯一陆路连接",
    lab: "交互式运筹优化实验室",
    bridgeLength: "桥梁长度",
    flightRadius: "飞行半径",
    controlRadius: "遥控距离",
    deployment: "覆盖方案",
    endpointMode: "两端基地覆盖",
    vesselMode: "中间无人船站点",
    vesselUnit: "艘无人船",
    vesselUnits: "艘无人船",
    rangeNote: "有效半径",
    groundRoute: "地面消防路线",
    droneRoute: "无人机飞行路线",
    normalTraffic: "车流行驶中 · 已发现事故",
    fireStatus: "火势压制",
    contained: "已控制",
    activeFire: "燃烧中",
    active: "事故处理中",
    missionClock: "任务计时",
    weather: "侧风 18 km/h",
    bridge: "跨海通道 · 04 区段",
    mainland: "大陆端",
    island: "岛屿端",
    incident: "车辆起火",
    safe: "入口关闭 · 出口保持开放",
    control: "任务控制",
    start: "启动响应",
    pause: "暂停",
    resume: "继续",
    reset: "重置",
    status: "当前阶段",
    phases: [
      "等待事故确认",
      "派出侦察无人机",
      "建立实时现场态势",
      "部署交通与通信无人机",
      "引导车辆向两端撤离",
      "应急救援通道已确认",
    ],
    assets: "空中力量",
    firstEyes: "首次抵达",
    routeReady: "通道就绪",
    cleared: "已疏散车辆",
    live: "实时",
    queued: "等待",
    scout: "侦察",
    scoutTask: "热成像",
    relay: "中继",
    relayTask: "通信链路",
    traffic: "交通",
    trafficTask: "撤离引导",
    fireDrone: "消防支援",
    fireTask: "初期火势压制",
    fireEngine: "消防车",
    timeline: "响应序列",
    stepLabels: ["发现", "侦察", "协同", "疏散"],
    systemEyebrow: "一次响应，四类决策",
    systemTitle: "无人机先抵达，让地面救援带着信息进入。",
    systemIntro:
      "系统并不替代消防和交警，而是缩短救援人员安全抵达隔离事故现场之前的信息盲区。",
    cards: [
      ["01", "事前布设", "根据桥长、飞行半径和遥控距离配置陆上基地及水上中继站。"],
      ["02", "快速派遣", "选择最近且能力匹配的基地，并确定最小有效无人机组合。"],
      ["03", "现场协同", "分配侦察、中继和交通任务，同时避免空域冲突。"],
      ["04", "滚动优化", "根据风、火势、拥堵、电量和通信变化持续更新方案。"],
    ],
    modelEyebrow: "运行模型",
    modelTitle: "优化时间、暴露与通行，而不是展示效果。",
    objective: "加权目标",
    objectiveNote: "现场确认时间 + 车辆危险暴露 + 救援通道时间 + 能耗 + 运行风险",
    decisions: "核心决策",
    decisionItems: [
      "哪一个移动基地响应？",
      "每项任务由哪架无人机执行？",
      "无人机在哪里飞行和悬停？",
      "何时可以确认应急通道安全？",
    ],
    compare: "对比基准",
    compareItems: ["仅地面救援", "单架侦察无人机", "规则式无人机团队", "滚动时域优化集群"],
    boundaries: "现实边界",
    boundaryText:
      "交通指令假设由获得授权的应急设备发出。无人机承担早期侦察、通信和有限辅助；主要灭火、救援及医疗工作仍由专业地面人员完成。",
    roadmap: "场景路线图",
    roadmapItems: ["大桥火情", "城市高架", "偏远高速", "铁路走廊"],
    now: "当前",
    next: "后续",
    footer: "Emergency Drone · 面向协同应急响应的研究原型",
  },
} as const;

const vehicles = [
  { id: 1, side: "left", start: 16, lane: 0 },
  { id: 2, side: "left", start: 24, lane: 1 },
  { id: 3, side: "left", start: 31, lane: 0 },
  { id: 4, side: "left", start: 39, lane: 1 },
  { id: 5, side: "right", start: 64, lane: 0 },
  { id: 6, side: "right", start: 71, lane: 1 },
  { id: 7, side: "right", start: 78, lane: 0 },
  { id: 8, side: "right", start: 86, lane: 1 },
] as const;

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function Drone({ className, label, task, active, style }: { className: string; label: string; task: string; active: boolean; style: React.CSSProperties }) {
  return (
    <div className={`drone-wrap ${className} ${active ? "is-active" : ""}`} style={style}>
      <div className="drone-tag"><strong>{label}</strong><span>{task}</span></div>
      <div className="drone-icon" aria-hidden="true"><i /><i /><b /><i /><i /></div>
      <span className="drone-scan" />
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [missionState, setMissionState] = useState<MissionState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [bridgeLength, setBridgeLength] = useState(8);
  const [flightRadius, setFlightRadius] = useState(8);
  const [controlRadius, setControlRadius] = useState(6);
  const t = COPY[language];

  const effectiveRadius = Math.min(flightRadius, controlRadius);
  const vesselCount = Math.max(0, Math.min(3, Math.ceil(bridgeLength / (2 * effectiveRadius)) - 1));
  const missionDistance = bridgeLength / (2 * (vesselCount + 1));
  const firstEyesTarget = Math.round(25 + (missionDistance / 90) * 3600);
  const routeReadyTarget = firstEyesTarget + Math.round(90 + bridgeLength * 7 + vesselCount * 25);
  const missionDuration = routeReadyTarget + 45;

  useEffect(() => {
    if (missionState !== "running") return;
    const simulationStep = Math.max(3, Math.ceil(missionDuration / 72));
    const interval = window.setInterval(() => {
      setElapsed((current) => {
        if (current >= missionDuration) { setMissionState("complete"); return missionDuration; }
        return Math.min(missionDuration, current + simulationStep);
      });
    }, 240);
    return () => window.clearInterval(interval);
  }, [missionState, missionDuration]);

  const ratio = elapsed / missionDuration;
  const phase = elapsed === 0 ? 0 : ratio < .18 ? 1 : ratio < .34 ? 2 : ratio < .53 ? 3 : ratio < .82 ? 4 : 5;
  const progress = Math.min(1, Math.max(0, (ratio - .42) / .40));
  const cleared = Math.min(8, Math.floor(progress * 9));
  const fireSuppressed = ratio >= .72;
  const truckProgress = Math.min(1, Math.max(0, (ratio - .75) / .23));
  const launchX = vesselCount > 0 ? 50 : 8;
  const dronePositions = useMemo(() => ({
    scout: { left: `${ratio < .30 ? launchX + (ratio / .30) * (51 - launchX) : 51}%`, top: `${ratio < .30 ? 76 - (ratio / .30) * 47 : 29}%` },
    relay: { left: `${ratio < .50 ? 91 - Math.max(0, (ratio - .18) / .32) * 36 : 55}%`, top: `${ratio < .50 ? 74 - Math.max(0, (ratio - .18) / .32) * 60 : 14}%` },
    traffic: { left: `${ratio < .56 ? 91 - Math.max(0, (ratio - .24) / .32) * 21 : 70}%`, top: `${ratio < .56 ? 74 - Math.max(0, (ratio - .24) / .32) * 30 : 44}%` },
    fire: { left: `${ratio < .62 ? launchX + Math.max(0, (ratio - .30) / .32) * (51 - launchX) : 51}%`, top: `${ratio < .62 ? 78 - Math.max(0, (ratio - .30) / .32) * 36 : 42}%` },
  }), [ratio, launchX, vesselCount]);

  function startMission() { if (missionState === "complete") setElapsed(0); setMissionState("running"); }
  function resetMission() { setMissionState("idle"); setElapsed(0); }
  function updateParameter(setter: (value: number) => void, value: number) {
    setter(value);
    setMissionState("idle");
    setElapsed(0);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Emergency Drone home"><span className="brand-mark"><i /><i /><i /><i /></span><span>EMERGENCY DRONE</span></a>
        <nav aria-label="Primary navigation">{t.nav.map((item, index) => <a key={item} href={index === 0 ? "#mission" : index === 1 ? "#system" : "#model"}>{item}</a>)}</nav>
        <button className="language-switch" onClick={() => setLanguage(language === "en" ? "zh" : "en")}>{language === "en" ? "中文" : "EN"}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span />{t.eyebrow}</p>
          <h1>{t.headlineA}<br /><em>{t.headlineB}</em></h1>
          <p className="hero-intro">{t.intro}</p>
          <a className="primary-link" href="#mission">{t.openMission}<span>↘</span></a>
        </div>
        <aside className="scenario-card">
          <div className="scenario-topline"><span>{t.currentScenario}</span><b>01 / 04</b></div>
          <div className="scenario-visual" aria-hidden="true"><div className="radar-ring ring-one" /><div className="radar-ring ring-two" /><div className="radar-line" /><div className="mini-bridge" /><div className="mini-incident" /><div className="mini-drone">+</div></div>
          <h2>{t.scenarioName}</h2><p>{t.scenarioMeta}</p>
        </aside>
        <div className="hero-index"><span>ED—01</span><span>{t.lab}</span></div>
      </section>

      <section className="mission-section" id="mission">
        <div className="section-heading mission-heading">
          <div><p className="eyebrow"><span />{t.active}</p><h2>{t.bridge}</h2></div>
          <div className="mission-meta"><div><span>{t.missionClock}</span><strong>{formatTime(elapsed)}</strong></div><div className="weather"><i />{t.weather}</div></div>
        </div>

        <div className="parameter-strip">
          <label className="parameter-control">
            <span>{t.bridgeLength}<b>{bridgeLength} km</b></span>
            <input aria-label={t.bridgeLength} type="range" min="2" max="30" step="2" value={bridgeLength} onChange={(event) => updateParameter(setBridgeLength, Number(event.target.value))} />
          </label>
          <label className="parameter-control">
            <span>{t.flightRadius}<b>{flightRadius} km</b></span>
            <input aria-label={t.flightRadius} type="range" min="3" max="16" step="1" value={flightRadius} onChange={(event) => updateParameter(setFlightRadius, Number(event.target.value))} />
          </label>
          <label className="parameter-control">
            <span>{t.controlRadius}<b>{controlRadius} km</b></span>
            <input aria-label={t.controlRadius} type="range" min="3" max="16" step="1" value={controlRadius} onChange={(event) => updateParameter(setControlRadius, Number(event.target.value))} />
          </label>
          <div className={`deployment-result ${vesselCount > 0 ? "needs-vessel" : ""}`}>
            <span>{t.deployment}<small>{t.rangeNote}: {effectiveRadius} km</small></span>
            <strong>{vesselCount === 0 ? t.endpointMode : `${t.vesselMode} · ${vesselCount} ${vesselCount === 1 ? t.vesselUnit : t.vesselUnits}`}</strong>
          </div>
        </div>

        <div className="mission-layout">
          <div className="simulation-panel">
            <div className="scene-status"><span><i />{missionState === "idle" ? t.normalTraffic : t.live}</span><b>{bridgeLength} km · {t.safe}</b></div>
            <div className={`bridge-scene ${bridgeLength > 14 ? "long-span" : ""} ${bridgeLength > 24 ? "extra-long-span" : ""}`}>
              <div className="water-lines" /><div className="land land-left"><span>{t.mainland}</span></div><div className="land land-right"><span>{t.island}</span></div><div className="bridge-shadow" />
              <svg className="mission-routes" viewBox="0 0 1000 510" preserveAspectRatio="none" aria-hidden="true">
                <path className={`route-line ground-route ${phase >= 4 ? "route-active" : ""}`} d="M 60 245 L 495 245" />
                <path className={`route-line drone-route ${phase >= 1 ? "route-active" : ""}`} d={vesselCount > 0 ? "M 500 460 Q 500 335 510 230" : "M 65 430 Q 285 105 510 230"} />
                <path className={`route-line relay-route ${phase >= 3 ? "route-active" : ""}`} d="M 930 430 Q 760 60 555 90" />
              </svg>
              <div className="route-legend"><span><i className="legend-ground" />{t.groundRoute}</span><span><i className="legend-drone" />{t.droneRoute}</span></div>
              <div className="bridge-deck">
                <div className="lane-divider" /><div className="shoulder-line" /><span className="direction dir-left">‹ ‹ ‹</span><span className="direction dir-right">› › ›</span>
                {vehicles.map((vehicle, index) => {
                  const offset = vehicle.side === "left" ? -progress * (vehicle.start + 8) : progress * (102 - vehicle.start);
                  const cruise = missionState === "idle" ? `cruising-${vehicle.side}` : "";
                  return <span key={vehicle.id} className={`vehicle lane-${vehicle.lane} ${cruise} ${index < cleared ? "vehicle-cleared" : ""}`} style={{ left: `calc(${vehicle.start}% + ${offset}%)`, animationDelay: `-${vehicle.id * .62}s` }} />;
                })}
                <div className={`incident-car ${fireSuppressed ? "suppressed" : ""}`}><span className="flame flame-a" /><span className="flame flame-b" /><span className="smoke smoke-a" /><span className="smoke smoke-b" /><small>{t.incident}</small></div>
                <div className={`fire-engine ${phase >= 4 ? "engine-visible" : ""}`} style={{ left: `${7 + truckProgress * 42}%` }}><span>{t.fireEngine}</span><i /><i /></div>
              </div>
              <div className="mobile-base base-left"><span>MB—01</span><i /><i /></div><div className="mobile-base base-right"><span>MB—02</span><i /><i /></div>
              {Array.from({ length: vesselCount }, (_, index) => <div className="support-vessel" key={index} style={{ left: `${9 + ((index + 1) / (vesselCount + 1)) * 82}%` }}><span>USV—0{index + 1}</span><i /></div>)}
              <Drone className="scout-drone" label={t.scout} task={t.scoutTask} active={phase >= 1} style={dronePositions.scout} />
              <Drone className="relay-drone" label={t.relay} task={t.relayTask} active={phase >= 3} style={dronePositions.relay} />
              <Drone className="traffic-drone" label={t.traffic} task={t.trafficTask} active={phase >= 3} style={dronePositions.traffic} />
              <Drone className="fire-drone" label={t.fireDrone} task={t.fireTask} active={phase >= 3} style={dronePositions.fire} />
              <span className={`suppression-stream ${phase >= 3 && !fireSuppressed ? "stream-active" : ""}`} />
            </div>
            <div className="sequence"><div className="sequence-title"><span>{t.timeline}</span><b>{Math.round((elapsed / missionDuration) * 100)}%</b></div><div className="sequence-track"><i style={{ width: `${(elapsed / missionDuration) * 100}%` }} /></div><div className="sequence-labels">{t.stepLabels.map((label, index) => <span key={label} className={phase >= index + 1 ? "done" : ""}>{label}</span>)}</div></div>
          </div>

          <aside className="control-panel">
            <div className="control-header"><span>{t.control}</span><i className={missionState === "running" ? "pulse" : ""} /></div>
            <div className="phase-block"><span>{t.status}</span><strong><b>0{phase + 1}</b>{t.phases[phase]}</strong></div>
            <div className="mission-buttons">
              {missionState === "running" ? <button className="main-control" onClick={() => setMissionState("paused")}>{t.pause}<span>Ⅱ</span></button> : <button className="main-control" onClick={startMission}>{missionState === "paused" ? t.resume : t.start}<span>▶</span></button>}
              <button className="reset-control" onClick={resetMission} aria-label={t.reset}>↺</button>
            </div>
            <div className="metric-grid"><div><span>{t.firstEyes}</span><strong>{elapsed >= firstEyesTarget ? formatTime(firstEyesTarget) : "—"}</strong></div><div><span>{t.routeReady}</span><strong>{elapsed >= routeReadyTarget ? formatTime(routeReadyTarget) : "—"}</strong></div><div><span>{t.cleared}</span><strong>{cleared}<small>/ 8</small></strong></div><div className={fireSuppressed ? "fire-contained" : ""}><span>{t.fireStatus}</span><strong>{fireSuppressed ? t.contained : t.activeFire}</strong></div></div>
            <div className="asset-list">
              <div className="list-title"><span>{t.assets}</span><b>4</b></div>
              {[["SC—01", t.scout, t.scoutTask, phase >= 1], ["RL—02", t.relay, t.relayTask, phase >= 3], ["TC—03", t.traffic, t.trafficTask, phase >= 3], ["FS—04", t.fireDrone, t.fireTask, phase >= 3]].map(([id, name, task, isActive]) => (
                <div className="asset-row" key={String(id)}><i className={isActive ? "asset-active" : ""} /><b>{id}</b><span>{name}</span><small>{isActive ? t.live : t.queued} · {task}</small></div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="system-section" id="system">
        <div className="system-intro"><p className="eyebrow dark"><span />{t.systemEyebrow}</p><h2>{t.systemTitle}</h2><p>{t.systemIntro}</p></div>
        <div className="decision-grid">{t.cards.map(([number, title, body], index) => <article key={number}><div><span>{number}</span><i>{index === 0 ? "◎" : index === 1 ? "↗" : index === 2 ? "⌁" : "↻"}</i></div><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="model-section" id="model">
        <div className="model-heading"><p className="eyebrow"><span />{t.modelEyebrow}</p><h2>{t.modelTitle}</h2></div>
        <div className="model-grid">
          <article className="objective-card"><span>{t.objective}</span><div className="formula">min <i>ω</i><sub>1</sub>T<sub>confirm</sub> + <i>ω</i><sub>2</sub>E<sub>exposure</sub> + <i>ω</i><sub>3</sub>T<sub>access</sub> + <i>ω</i><sub>4</sub>C<sub>energy</sub> + <i>ω</i><sub>5</sub>R</div><p>{t.objectiveNote}</p></article>
          <article className="list-card"><span>{t.decisions}</span><ul>{t.decisionItems.map((item, index) => <li key={item}><b>0{index + 1}</b>{item}</li>)}</ul></article>
          <article className="list-card compare-card"><span>{t.compare}</span><ul>{t.compareItems.map((item, index) => <li key={item}><b>{String.fromCharCode(65 + index)}</b>{item}</li>)}</ul></article>
          <article className="boundary-card"><span>{t.boundaries}</span><p>{t.boundaryText}</p></article>
        </div>
      </section>

      <section className="roadmap-section"><div className="roadmap-title">{t.roadmap}</div><div className="roadmap-list">{t.roadmapItems.map((item, index) => <div key={item} className={index === 0 ? "roadmap-current" : ""}><span>0{index + 1}</span><strong>{item}</strong><small>{index === 0 ? t.now : t.next}</small></div>)}</div></section>
      <footer><span>© 2026 MARS GUO</span><p>{t.footer}</p><a href="#top">↑</a></footer>
    </main>
  );
}
