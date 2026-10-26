# Aura Ladies Fitness Club — Design Specification & Architectural System

## 1. Brand Identity & Design Constitution
**Name:** Aura Ladies Fitness Club (أورا جيم النسائي الفاخر)  
**Positioning:** An ultra-premium, intimate, boutique fitness sanctuary dedicated exclusively to women. Designed with serene elegance, privacy, and warm luxury.  
**Tone & Mood:** Empowering, private, calming, motivating, and fast.

---

## 2. Color System & Contrast Discipline (60-30-10 Rule)
- **60% Dominant Neutral Canvas:**
  - Soft Alabaster & Warm Pearl: `#FAF7F5` (background)
  - Pure Warm White: `#FFFFFF` (card surfaces)
- **30% Structural Surfaces & Typography:**
  - Deep Onyx Cocoa: `#2D2422` (primary titles, WCAG AAA contrast ratio 12:1)
  - Warm Earth Taupe: `#6E625F` (subtitles, body prose, 7:1 contrast)
  - Subtle Champagne Hairline: `#EFE8E4` (clean borders, no heavy shadows)
- **10% High-Intent Accent Budget:**
  - Rose Gold & Dusty Blush: `#D4A396` / `#B87B6D` (primary CTAs, active highlights)
  - Emerald Mint Badge: `#3D8A66` (approval status, active indicators)

---

## 3. Typographic Hierarchy
- **Arabic Display & Body:** Google Font `Cairo` (300 light, 400 regular, 600 semi-bold, 700 bold).
- **Latin & Numbers:** `Plus Jakarta Sans` paired with `tabular-nums` for precise alignment of times, weights, and metrics.
- **Direction:** Native `dir="rtl"` with fluid responsive scaling.

---

## 4. Trainee & Secret Code Authentication Flow
1. **Public Browsing:** Any visitor can freely explore classes, coaches, pricing plans, interactive fitness calculators, and gym facilities.
2. **Onboarding / Registration:**
   - Trainee submits Name, Phone (WhatsApp), Email, Target Goal, and their own **Personal Secret Code** (كود سري تنشئه المتدربة).
   - Upon submitting, a trainee record is instantly initialized with `status: 'pending'`.
3. **Pending Approval Screen:**
   - Trainee gets a chic personalized card displaying their unique Member ID, assigned Captain, and current pending review state.
4. **Login:**
   - Trainee can log back in at any time from any device by entering their **Secret Code** and phone/email.

---

## 5. Captain (Admin) Approval & Private Chat Gateway
1. **Captain Mode ("بوابة الكابتن والمدربة"):**
   - Direct access for the head coach and training staff.
   - Live roster of pending member applications with one-click **"قبول واعتماد المشتركة"** or decline.
   - Assignment of personal workout plan, nutrition advice, and target body metrics.
2. **1-on-1 Direct Private Chat:**
   - Once approved, an isolated real-time chat channel opens between the trainee and her assigned Captain.
   - Trainee asks fitness questions, shares daily meal updates, reports progress, and receives customized workout adjustments directly from her coach.
   - Zero latency with optimistic local updates and Firestore real-time synchronization.
