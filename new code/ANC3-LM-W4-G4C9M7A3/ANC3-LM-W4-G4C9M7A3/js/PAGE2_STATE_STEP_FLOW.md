# Page 2: State and Step Flow (Ruler Measurement)

Chronological description of states **C**, **B**, **A**, and **complete**, and steps **1**, **2**, **3** (no step 4 on page 2). Default start and end are included.

---

## Default start

- **State:** `C`
- **Step:** `1`
- **Instruction:** "Drag the ruler to vertex B to measure the side BC"

*(Set on page 2 init and when navigating to page 2; e.g. `window.page2State = 'C'`, `window.page2Step = 1`.)*

---

## State C (measure side BC)

| Step | Instruction | Trigger to advance |
|------|-------------|--------------------|
| **1** | Drag the ruler to vertex B to measure the side BC | Ruler zero mark snaps to vertex B → step 2 |
| **2** | Align the ruler length along the side BC (blinking) | Ruler snaps to line BC → step 3 |
| **3** | Now, measure the length of BC using the measurement marker | User drags movable marker to vertex C; when snapped, label shows "BC = X cm" and flow advances → state **B**, step **1** |

- **Next (on measurement snap):** **B step 1** (ruler resets to original position; user drags to vertex B for AB).

---

## State B (measure side AB)

| Step | Instruction | Trigger to advance |
|------|-------------|--------------------|
| **1** | Drag the ruler to vertex B to measure the side AB | Ruler zero mark snaps to vertex B → step 2 |
| **2** | Align the ruler length along the side AB (blinking) | Ruler snaps to line AB → step 3 |
| **3** | Now, measure the length of AB using the measurement marker | User drags movable marker to vertex A; when snapped, label shows "AB = X cm" and flow advances → state **A**, step **1** |

- **Next (on measurement snap):** **A step 1**.

---

## State A (measure side AC)

| Step | Instruction | Trigger to advance |
|------|-------------|--------------------|
| **1** | Drag the ruler to vertex A to measure the side AC | Ruler zero mark snaps to vertex A → step 2 |
| **2** | Align the ruler length along the side AC (blinking) | Ruler snaps to line AC → step 3 |
| **3** | Now, measure the length of AC using the measurement marker | User drags movable marker to vertex C; when snapped, label shows "AC = X cm" and flow advances → **complete** |

- **Next (on measurement snap):** **complete**.

---

## Complete (end)

- **State:** `complete`
- **Step:** `null`
- **Meaning:** Page 2 quiz is done (e.g. "Tap » to continue" / next button enabled).

---

## Chronological default flow (start → end)

1. **C, 1** — Drag ruler to vertex B (measure BC).
2. **C, 2** — Align ruler along BC.
3. **C, 3** — Measure BC with marker; on snap → advance to B step 1.
4. **B, 1** — Ruler resets to original position; drag ruler to vertex B (measure AB).
5. **B, 2** — Align ruler along AB.
6. **B, 3** — Measure AB with marker; on snap → advance to A step 1.
7. **A, 1** — Drag ruler to vertex A (measure AC).
8. **A, 2** — Align ruler along AC.
9. **A, 3** — Measure AC with marker; on snap → advance to complete.
10. **complete, null** — End of page 2.

---

## Summary table

| State     | Steps | What happens | Next |
|----------|-------|--------------|------|
| **C**    | 1, 2, 3 | Measure BC; advance to B step 1 on measurement snap. | B step 1 |
| **B**    | 1, 2, 3 | Measure AB; advance to A step 1 on measurement snap. | A step 1 |
| **A**    | 1, 2, 3 | Measure AC; advance to complete on measurement snap. | complete |
| **complete** | —   | Step = null; quiz done. | — |

Step 3 in every state: measurement label appears on snap; **advance happens automatically when the measurement marker snaps** (no click required).
