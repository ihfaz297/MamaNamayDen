// src/routing/routeAlgo.ts
import type { Edge, RouteLeg, RouteResult } from "./types";
import { allEdges } from "./graph";

interface NodeState {
  id: string;
  localTime: number;
  totalTime: number;
  prev?: { from: string; via: Edge };
}

// Compare [localTime, totalTime] lexicographically
function better(a: NodeState, b: NodeState) {
  if (a.localTime < b.localTime) return true;
  if (a.localTime > b.localTime) return false;
  return a.totalTime < b.totalTime;
}

// Simple Dijkstra-like search with custom cost
export function findBestRoute(
  startId: string,
  endId: string,
  edges: Edge[] = allEdges
): RouteResult | null {
  const states = new Map<string, NodeState>();

  const getState = (id: string): NodeState => {
    let s = states.get(id);
    if (!s) {
      s = { id, localTime: Infinity, totalTime: Infinity };
      states.set(id, s);
    }
    return s;
  };

  const start = getState(startId);
  start.localTime = 0;
  start.totalTime = 0;

  const visited = new Set<string>();

  while (true) {
    // pick best unvisited node
    let current: NodeState | undefined;
    for (const s of states.values()) {
      if (visited.has(s.id)) continue;
      if (!current || better(s, current)) current = s;
    }

    if (!current || current.totalTime === Infinity) break;
    if (current.id === endId) break;

    visited.add(current.id);

    const outgoing = edges.filter(e => e.from === current!.id);
    for (const edge of outgoing) {
      const next = getState(edge.to);

      const extraLocal = edge.mode === "local" ? edge.timeMins : 0;
      const candidate: NodeState = {
        id: next.id,
        localTime: current.localTime + extraLocal,
        totalTime: current.totalTime + edge.timeMins,
        prev: { from: current.id, via: edge },
      };

      if (better(candidate, next)) {
        next.localTime = candidate.localTime;
        next.totalTime = candidate.totalTime;
        next.prev = candidate.prev;
      }
    }
  }

  const target = states.get(endId);
  if (!target || target.totalTime === Infinity) return null;

  // Rebuild path
  const legs: RouteLeg[] = [];
  let cursor: NodeState | undefined = target;
  while (cursor && cursor.prev) {
    const { from, via } = cursor.prev;
    legs.push({
      from,
      to: via.to,
      mode: via.mode,
      timeMins: via.timeMins,
    });
    cursor = states.get(from);
  }
  legs.reverse();

  const totalLocalTime = legs
    .filter(l => l.mode === "local")
    .reduce((sum, l) => sum + l.timeMins, 0);

  const totalTime = legs.reduce((s, l) => s + l.timeMins, 0);
  const totalBusTime = totalTime - totalLocalTime;

  return {
    path: legs,
    totalBusTime,
    totalLocalTime,
    totalTime,
  };
}
