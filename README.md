# Emergency Drone

An interactive operations-research prototype for mobile drone-swarm response across constrained infrastructure.

The first scenario models a vehicle fire on a narrow bridge that is the only road connection to an island. New traffic is stopped, vehicles already on the bridge are directed toward safe exits, and a mobile base launches a heterogeneous drone team before ground responders can reach the incident.

## Current prototype

- Bilingual English/Chinese interface
- Interactive start, pause, resume and reset controls
- Deterministic bridge-evacuation simulation
- Scout, communications-relay and traffic-guidance drone roles
- Mission clock, response phases and operational metrics
- Responsive desktop, tablet and mobile layout
- Explicit optimization objective, decision scope, baselines and reality boundary

## Project position

Emergency Drone focuses on decisions rather than hardware control:

1. pre-position mobile drone bases along vulnerable corridors;
2. dispatch a capable base and select the drone mix;
3. allocate tasks and coordinate safe flight paths;
4. re-optimize when wind, fire, congestion, energy or communication changes.

The drones provide early intelligence, communications and limited assistance. They do not replace authorized traffic control, firefighting, rescue or medical teams.

## Optimization direction

```text
min ω₁ T_confirm + ω₂ E_exposure + ω₃ T_access + ω₄ C_energy + ω₅ R
```

Planned comparisons: ground response only; one reconnaissance drone; a rule-based heterogeneous team; and rolling-horizon swarm optimization.

## Scenario roadmap

1. Bridge vehicle fire
2. Elevated-road incident
3. Remote-highway incident
4. Rail-corridor emergency

The repository currently focuses on drones. The architecture may later admit other emergency robots without changing the product's present scope.

## Local development

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

GitHub Pages publishing will be added after the first interaction and model review.
