# Samaria Featured Case Studies: 3-Act Editorial Copy

> Grounded, witty, and deeply professional case study copy for Samaria's flagship production engineering projects. Written without corporate fluff or synthetic AI jargon.

---

## 01. HEMS: Emergency Telemetry Platform

* **Category:** Mobile & Cloud Systems
* **Tags:** Mobile Engineering · Cloud Infrastructure · Telemetry
* **Tagline:** When every second counts, WhatsApp voice notes don't cut it.
* **Key Metrics:** 
  * **98%+** Shift Uptime
  * **0** Lost GPS Fixes
  * **<40s** Triage Awareness
* **Assets:**
  * Primary: `/assets/projects/hems_console.webp` (Apple-native dispatch console)
  * Secondary: `/assets/projects/hems_mobile_tracker.webp` (Rugged Blackview BV7300 mobile tracker)

### Act 1: The Hassle
**Emergency fleets running on radio static and guesswork.**

In emerging markets, ambulance dispatching is often terrifyingly analog. Control rooms shout over crackling two-way radios, drivers text approximate landmarks into chaotic WhatsApp groups, and operators lose all line of sight the moment a vehicle pulls out of the bay.

When an ambulance hits a cellular dead zone or stalls in gridlock, nobody knows if the crew is five minutes away or stranded on the shoulder. Paramedics shouldn't have to balance patient stabilization with manually typing directions into their personal phones.

### Act 2: The Engine
**Rugged edge hardware paired with an unkillable offline queue.**

We skipped delicate consumer tablets and mounted rugged Blackview BV7300 Android units directly into every vehicle cab. Our custom background telemetry daemon runs continuously, pulling high-accuracy GNSS fixes every 10 meters.

When mobile connectivity drops out in rural valleys or dense urban pockets, nothing gets dropped. Coordinates flow into an encrypted, write-ahead SQLite queue on the handset and flush the moment a tower connection returns. Telemetry is authenticated using RSA-OAEP sealed PINs and routes straight to low-latency Cloud Functions deployed in Johannesburg (`africa-south1`) to keep round-trip times well under 50ms.

Back at headquarters, dispatchers manage the entire fleet through an Apple-native desktop console built for instant multi-monitor workflows without the lag of heavy web portals.

* **Edge Hardware:** Blackview BV7300 (MIL-STD-810H, Android 13 Kiosk, GNSS)
* **Edge Persistence:** Encrypted SQLite WAL journal with automatic backpressure flushing
* **Security:** RSA-OAEP hardware-bound PIN sealing per driver shift
* **Cloud Routing:** GCP Cloud Functions (`africa-south1`) + Firestore Realtime Engine
* **Dispatch Client:** Native macOS Swift application with MapKit GPU acceleration

### Act 3: The Win
**Zero lost telemetry points and sub-minute response clarity.**

The system replaced frantic phone trees with instant situational awareness across every active shift.

Dispatchers can see vehicle speeds, heading, fuel levels, and real-time transit estimates at a single glance. More importantly, emergency response teams now arrive prepared before wheels even stop turning.

* **98%+ Tracked Uptime:** Handsets reliably run through full 12-hour shifts without overheating or crashing under intense dashboard sun.
* **Zero Lost GPS Fixes:** Every single coordinate breadcrumb is preserved through dead zones and safely committed to central records.
* **Sub-Minute Triage:** Emergency routing and hospital bay handoffs were cut from 5-minute phone calls to under 40 seconds of visual dispatch.

**Call to Action:** Discuss Telemetry Architecture →

---

## 02. Kinetic: Autonomous Sports Highlight Extraction Engine

* **Category:** Computer Vision & AI Automation
* **Tags:** Computer Vision · Automated Video · Audio Intelligence
* **Tagline:** Stop paying interns to watch 90 minutes of video for a five-second clip.
* **Key Metrics:**
  * **<12s** Clip Turnaround
  * **100%** Goal Verification
  * **-90%** Compute Costs
* **Assets:**
  * Primary: `/assets/projects/kinetic_clipper.webp` (Computer vision player tracking frame)
  * Secondary: `/assets/projects/kinetic_hud.webp` (Extraction HUD: audio spike waveform + scoreboard bounding box)

### Act 1: The Hassle
**Sitting through 90 minutes of footage just to post after everyone stopped caring.**

Traditional sports highlight clipping is slow, tedious, and expensive. Production teams pay editors to sit in dark rooms watching full matches with their finger on a record button, frantically logging timestamps when a goal lands.

By the time someone manually trims the clip, pans the camera to keep the striker centered, burns captions, and exports an MP4 for social media, 20 minutes have passed. The internet has already seen the bootleg phone recording on X and moved on.

### Act 2: The Engine
**Loudness spike sweeps, ground-truth match stats, and surgical vision cuts.**

Running heavyweight vision models across every single frame of a 1080p 60fps broadcast is a fast way to bankrupt your cloud account. Instead, Kinetic uses an intelligent, staged detection funnel:

1. **Audio Spike Sweep:** An ultra-fast FFmpeg `ebur128` audio filter sweeps the audio track at 40x speed, hunting for the unmistakable decibel spike of an erupting stadium crowd.
2. **Ground-Truth Cross-Check:** Next, instead of blindly trusting crowd noise (which could just be an angry penalty call or referee whistle), the engine validates the timestamp against official live match event APIs.
3. **Multimodal Scoreboard Snipe:** Once confirmed, Kinetic fires a single Gemini Vision frame snipe directly at the broadcast scoreboard to verify the score change and clock.
4. **Surgical Sub-Second Cut:** Finally, FFmpeg performs a sub-second, keyframe-accurate cut, tracking player action into a clean vertical 9:16 crop ready for social feeds.

* **Audio Analysis:** FFmpeg `ebur128` integrated loudness & RMS spike detection (40x speed)
* **Verification:** Live match data feed reconciliation (zero false triggers)
* **Visual Validation:** Single-frame Gemini 1.5 Flash scoreboard OCR & state validation
* **Video Transformation:** Dynamic 16:9 to 9:16 framing with motion-centered player crop
* **Encoding Speed:** Keyframe-accurate stream-copy slice in under 4.2 seconds

### Act 3: The Win
**Social-ready vertical highlights delivered before the replay even ends.**

Kinetic strips the friction out of high-stakes sports content publishing. Brands and leagues publish professional, broadcast-grade vertical highlights while the live stadium crowd is still celebrating on the pitch.

No human intervention, no missed game-winners, and compute bills that scale with the game rather than burn through budgets.

* **12-Second Delivery:** From the ball crossing the goal line to a fully rendered vertical video landing on social channels.
* **Zero False Positives:** Multi-stage audio verification and scoreboard checks ensure only real match highlights get clipped.
* **90% Compute Savings:** Inspecting one targeted frame instead of 160,000 video frames slashes AI inference costs to pennies.

**Call to Action:** Explore Video Automation Engine →

---

## 03. Bambino: Interactive 3D Festival World & Ticketing

* **Category:** Interactive 3D & Spatial Web
* **Tags:** 3D WebGL · Interactive Spatial · Event Platforms
* **Tagline:** Nobody wants to squint at a soggy PDF map with a crying toddler in tow.
* **Key Metrics:**
  * **<800ms** Mobile Load Time
  * **0%** Lost Attendees
  * **+34%** Workshop Bookings
* **Assets:**
  * Primary: `/assets/projects/bambino_world_map.webp` (3D festival isometric world map)
  * Secondary: `/assets/projects/bambino_booking_ui.webp` (Interactive zone details & booking drawer)

### Act 1: The Hassle
**Static PDF maps that turn family outings into frustrating scavenger hunts.**

Outdoor family festivals are wonderful in theory, but navigating them is often exhausting. Organizers usually hand visitors a crinkled paper map at the gate or link to an unwieldy 15MB PDF on their website.

Parents find themselves desperately pinching and zooming on their phones, trying to figure out where the toddler sensory tent is, which food truck has gluten-free snacks, and where the closest restroom is hiding. When families get lost, queues back up, stage performances start with half-empty crowds, and festival-goers leave early feeling worn out.

### Act 2: The Engine
**A lightweight 3D world built directly into the mobile browser.**

We built Bambino as an interactive 3D miniature festival world that loads instantly right inside mobile Safari and Chrome—no App Store download required.

Powered by custom Three.js and lean GLTF assets with Meshopt Draco compression, parents can pan, tilt, and explore an isometric recreation of the festival grounds at a silky 60 frames per second. Tapping any attraction brings up a clean slide-over drawer displaying showtimes, wait times, age recommendations, and accessibility notes.

We layered subtle spatial Web Audio that shifts gently as you explore different themed zones, and built an instant booking checkout wizard directly into the attraction pins so parents can reserve workshop spots without ever leaving the map.

* **3D Graphics:** Three.js WebGL with custom low-draw-call isometric camera rigging
* **Asset Optimization:** Meshopt Draco mesh compression + KTX2 Basis Universal textures
* **Spatial Sound:** Web Audio API positional nodes dynamically tied to camera coordinates
* **Booking Engine:** Integrated ticket reservation drawer with instant mobile checkout
* **Performance:** Locked 60 FPS on standard mobile browsers with sub-800ms initial paint

### Act 3: The Win
**Smooth crowd flow, happy parents, and record workshop ticket sales.**

By turning a flat piece of paper into an intuitive digital playground, Bambino kept thousands of families oriented and engaged throughout the festival weekend.

Attendees spent less time asking information booths for directions and more time enjoying the experiences, while organizers gained clear visibility into which zones were seeing the highest visitor traffic.

* **Sub-800ms Load Time:** Ultra-lean 3D asset packaging guarantees immediate loading even on saturated mobile festival networks.
* **0% Lost Attendees:** Information booths reported zero map-related confusion or lost family complaints over the entire weekend.
* **34% More Bookings:** Allowing parents to preview attractions in 3D and tap to book directly from the scene unlocked record ticket conversions.

**Call to Action:** Build Interactive 3D Platforms →
