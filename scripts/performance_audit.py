import sys, json, time
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

results = {}

def audit_performance():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        print("\n==========================================")
        print("  SAMARIA TECH - SYSTEM PERFORMANCE AUDIT ")
        print("==========================================")

        # ---------------- 1. HOMEPAGE AUDIT ----------------
        print("\n--- 1. AUDITING HOMEPAGE (/) ---")
        page.goto('http://localhost:3000', wait_until='networkidle')
        time.sleep(3.5) # Wait for preloader & initial scene stabilization

        nav_metrics = page.evaluate('''() => {
            const nav = performance.getEntriesByType('navigation')[0];
            return {
                ttfb: nav.responseStart - nav.requestStart,
                domInteractive: nav.domInteractive - nav.startTime,
                domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
                loadComplete: nav.loadEventEnd - nav.startTime,
                transferSize: nav.transferSize,
                decodedBodySize: nav.decodedBodySize
            };
        }''')

        cwv_metrics = page.evaluate('''() => {
            return new Promise((resolve) => {
                let lcp = 0;
                let cls = 0;

                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    if (entries.length > 0) {
                        lcp = entries[entries.length - 1].startTime;
                    }
                }).observe({ type: 'largest-contentful-paint', buffered: true });

                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            cls += entry.value;
                        }
                    }
                }).observe({ type: 'layout-shift', buffered: true });

                setTimeout(() => {
                    resolve({ lcp, cls });
                }, 1000);
            });
        }''')

        memory_metrics = page.evaluate('''() => {
            if (performance.memory) {
                return {
                    usedJSHeapSizeMB: (performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2),
                    totalJSHeapSizeMB: (performance.memory.totalJSHeapSize / (1024 * 1024)).toFixed(2)
                };
            }
            return { usedJSHeapSizeMB: 'N/A', totalJSHeapSizeMB: 'N/A' };
        }''')

        # Measure FPS over a 120-frame scroll & card interaction loop
        fps_metrics = page.evaluate('''() => {
            return new Promise((resolve) => {
                let frames = [];
                let lastTime = performance.now();
                let count = 0;

                function step(now) {
                    const delta = now - lastTime;
                    lastTime = now;
                    frames.push(delta);
                    count++;

                    // Simulate gentle scroll
                    if (count < 60) {
                        window.scrollBy(0, 15);
                    } else if (count < 120) {
                        window.scrollBy(0, -15);
                    }

                    if (count < 120) {
                        requestAnimationFrame(step);
                    } else {
                        const avgDelta = frames.reduce((a, b) => a + b, 0) / frames.length;
                        const fps = 1000 / avgDelta;
                        const droppedFrames = frames.filter(d => d > 20).length; // >20ms is <50fps
                        resolve({
                            averageFPS: fps.toFixed(1),
                            averageFrameDurationMs: avgDelta.toFixed(2),
                            droppedFramesCount: droppedFrames,
                            totalFramesSampled: frames.length
                        });
                    }
                }
                requestAnimationFrame(step);
            });
        }''')

        # Resource Payload Breakdown
        resources = page.evaluate('''() => {
            const list = performance.getEntriesByType('resource');
            let breakdown = {
                scriptCount: 0, scriptBytes: 0,
                cssCount: 0, cssBytes: 0,
                imgCount: 0, imgBytes: 0,
                totalBytes: 0,
                totalRequests: list.length
            };
            for (const r of list) {
                const size = r.transferSize || 0;
                breakdown.totalBytes += size;
                if (r.initiatorType === 'script') {
                    breakdown.scriptCount++;
                    breakdown.scriptBytes += size;
                } else if (r.initiatorType === 'css' || r.initiatorType === 'link') {
                    breakdown.cssCount++;
                    breakdown.cssBytes += size;
                } else if (r.initiatorType === 'img' || r.initiatorType === 'image') {
                    breakdown.imgCount++;
                    breakdown.imgBytes += size;
                }
            }
            return breakdown;
        }''')

        results['homepage'] = {
            'navigation': nav_metrics,
            'core_web_vitals': cwv_metrics,
            'fps': fps_metrics,
            'memory': memory_metrics,
            'resources': resources
        }

        # ---------------- 2. BLOG AUDIT ----------------
        print("\n--- 2. AUDITING BLOG (/blog) ---")
        page.goto('http://localhost:3000/blog', wait_until='networkidle')
        time.sleep(1.5)

        blog_nav = page.evaluate('''() => {
            const nav = performance.getEntriesByType('navigation')[0];
            return {
                ttfb: nav.responseStart - nav.requestStart,
                domInteractive: nav.domInteractive - nav.startTime,
                domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
                loadComplete: nav.loadEventEnd - nav.startTime
            };
        }''')
        results['blog'] = {'navigation': blog_nav}

        # ---------------- 3. BESPOKE 404 AUDIT ----------------
        print("\n--- 3. AUDITING BESPOKE 404 PAGE ---")
        page.goto('http://localhost:3000/route-does-not-exist', wait_until='networkidle')
        time.sleep(1)

        p404_nav = page.evaluate('''() => {
            const nav = performance.getEntriesByType('navigation')[0];
            return {
                ttfb: nav.responseStart - nav.requestStart,
                domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
                loadComplete: nav.loadEventEnd - nav.startTime
            };
        }''')
        results['404'] = {'navigation': p404_nav}

        browser.close()

    print("\n================ AUDIT SUMMARY ================")
    print(json.dumps(results, indent=2))

    with open('performance_audit_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

if __name__ == '__main__':
    audit_performance()
