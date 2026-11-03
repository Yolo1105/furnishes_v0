/**
 * The partners' names and marks, each set a little differently so they
 * read as separate companies' logos. These are made up to fill the design,
 * and shown for now; mark the real ones `confirmed` before going live. `mark` is drawn in a 32-unit square; `cut` lines are drawn in the
 * paper over it, `wave` lines are stroked, the rest filled.
 */
export type Partner = {
  name: string;
  confirmed: boolean;
  face: "tide" | "caps" | "serif" | "bold";
  mark: readonly { d: string; kind?: "cut" | "wave" }[];
};

export const PARTNERS: readonly Partner[] = [
  {
    confirmed: false,
    name: "Halden Birch",
    face: "tide",
    mark: [{ d: "M16 3 6 29h20Z" }, { d: "M16 12v17", kind: "cut" }],
  },
  { confirmed: false, name: "KALLANG JOINERY", face: "caps", mark: [{ d: "M4 4h11v11H4zM17 17h11v11H17z" }] },
  {
    confirmed: false,
    name: "Meranti & Co.",
    face: "serif",
    mark: [{ d: "M16 4a12 12 0 1 1 0 24 12 12 0 1 1 0-24Z" }, { d: "M16 4v24", kind: "cut" }],
  },
  { confirmed: false, name: "northbeam", face: "bold", mark: [{ d: "M4 28V4l24 24V4" }] },
  {
    confirmed: false,
    name: "SALTMARSH STUDIO",
    face: "caps",
    mark: [
      { d: "M3 20c4-6 9-6 13 0s9 6 13 0", kind: "wave" },
      { d: "M3 12c4-6 9-6 13 0s9 6 13 0", kind: "wave" },
    ],
  },
  {
    confirmed: false,
    name: "Tanjong Freight",
    face: "serif",
    mark: [{ d: "M10 9h12a7 7 0 0 1 0 14H10a7 7 0 0 1 0-14Z" }],
  },
];
