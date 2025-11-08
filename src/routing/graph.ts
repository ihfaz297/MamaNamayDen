// src/routing/graph.ts
import type { Stop, Edge } from "./types";

// You can tweak names/stops later – this is just a starting mini-world.
export const stops: Stop[] = [
  { id: "SUST", name: "SUST Main Gate" },
  { id: "AKHALIA", name: "Akhalia" },
  { id: "SOBHANI", name: "Sobhanighat" },
  { id: "CHOWHATTA", name: "Chowhatta" },
  { id: "MADINA", name: "Madina Market" },
  { id: "AMBARKHANA", name: "Ambarkhana" },
  { id: "BONDOR", name: "Bondor" },
  { id: "ZINDABAZAR", name: "Zindabazar" },
];

// Bus edges: free bus time, fixed schedule; times are dummy for now
const busEdges: Edge[] = [
  { from: "SUST",     to: "AKHALIA",    mode: "bus", timeMins: 8 },
  { from: "AKHALIA",  to: "SOBHANI",    mode: "bus", timeMins: 7 },
  { from: "SOBHANI",  to: "CHOWHATTA",  mode: "bus", timeMins: 5 },
  { from: "CHOWHATTA",to: "MADINA",     mode: "bus", timeMins: 6 },

  // Branches for other routes
  { from: "AKHALIA",  to: "AMBARKHANA", mode: "bus", timeMins: 6 },
  { from: "CHOWHATTA",to: "BONDOR",     mode: "bus", timeMins: 5 },
  { from: "BONDOR",   to: "ZINDABAZAR", mode: "bus", timeMins: 4 },
];

// Local edges (rickshaw/CNG/walk) – more “expensive” in our logic
const localEdges: Edge[] = [
  { from: "SUST",   to: "AKHALIA",   mode: "local", timeMins: 10 },
  { from: "AKHALIA",to: "SOBHANI",   mode: "local", timeMins: 10 },
  { from: "SOBHANI",to: "CHOWHATTA", mode: "local", timeMins: 8 },
  { from: "CHOWHATTA", to: "MADINA", mode: "local", timeMins: 10 },

  { from: "CHOWHATTA", to: "AMBARKHANA", mode: "local", timeMins: 7 },
  { from: "CHOWHATTA", to: "ZINDABAZAR", mode: "local", timeMins: 10 },
];

function makeBidirectional(edges: Edge[]): Edge[] {
  return edges.flatMap(e => [
    e,
    { ...e, from: e.to, to: e.from },
  ]);
}

export const allEdges: Edge[] = [
  ...makeBidirectional(busEdges),
  ...makeBidirectional(localEdges),
];
