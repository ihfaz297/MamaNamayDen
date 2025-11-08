// src/routing/types.ts

export type Mode = "bus" | "local";

export interface Stop {
  id: string;        // "SUST", "MADINA", ...
  name: string;      // human-readable
}

export interface Edge {
  from: string;      // stop id
  to: string;        // stop id
  mode: Mode;        // "bus" or "local"
  timeMins: number;  // travel time
}

export interface RouteLeg {
  from: string;
  to: string;
  mode: Mode;
  timeMins: number;
}

export interface RouteResult {
  path: RouteLeg[];
  totalBusTime: number;
  totalLocalTime: number;
  totalTime: number;
}
