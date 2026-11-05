with open(r'c:\Projects\SAMARIA\src\templates\scope.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace $8k  $14k with clean $8k – $14k
text = text.replace('$8k \ufffd $14k', '$8k – $14k')
text = text.replace('$16k \ufffd $28k', '$16k – $28k')
text = text.replace('$22k \ufffd $35k', '$22k – $35k')
text = text.replace('$30k \ufffd $45k', '$30k – $45k')
text = text.replace('$18k \ufffd $30k', '$18k – $30k')
text = text.replace('$32k \ufffd $50k+', '$32k – $50k+')
text = text.replace('$12k \ufffd $18k', '$12k – $18k')
text = text.replace('3 \ufffd 4 Weeks', '3 – 4 Weeks')
text = text.replace('6 \ufffd 8 Weeks', '6 – 8 Weeks')
text = text.replace('10 \ufffd 12 Weeks', '10 – 12 Weeks')

# Update mobile CSS
old_mobile_css = """    @media screen and (max-width: 991px) {
      .scope-layout {
        grid-template-columns: 1fr;
      }

      .scope-spine {
        position: static;
        height: auto;
        border-right: none;
        border-bottom: 1px solid var(--border-zinc);
        padding: 2rem 1.5rem;
      }

      .scope-canvas {
        padding: 2.5rem 1.5rem;
      }

      .plates-grid,
      .capabilities-grid,
      .velocity-grid,
      .form-row {
        grid-template-columns: 1fr;
      }

      .stage-title {
        font-size: 2rem;
      }
    }"""

new_mobile_css = """    @media screen and (max-width: 991px) {
      .scope-layout {
        grid-template-columns: 1fr;
      }

      .scope-nav-links {
        display: none;
      }

      .scope-mobile-home-btn {
        display: inline-flex !important;
      }

      .scope-spine {
        position: static;
        height: auto;
        border-right: none;
        border-bottom: 1px solid var(--border-zinc);
        padding: 1.5rem 1.25rem;
      }

      .spine-steps {
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 1.25rem;
      }

      .spine-step-title {
        display: none;
      }

      .scope-canvas {
        padding: 2.25rem 1.25rem 4rem;
      }

      .plates-grid,
      .capabilities-grid,
      .velocity-grid,
      .form-row {
        grid-template-columns: 1fr;
      }

      .stage-title {
        font-size: 1.875rem;
      }
    }

    .scope-mobile-home-btn {
      display: none;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #fff;
      background-color: var(--maroon);
      padding: 0.5rem 1rem;
      text-decoration: none;
    }"""

assert old_mobile_css in text, "old_mobile_css not found"
text = text.replace(old_mobile_css, new_mobile_css)

# Update nav to add mobile home button
nav_target = '<div class="scope-nav-links">'
nav_replacement = '<a href="/" class="scope-mobile-home-btn">Return to Home</a>\n    <div class="scope-nav-links">'
assert nav_target in text, "nav_target not found"
text = text.replace(nav_target, nav_replacement)

with open(r'c:\Projects\SAMARIA\src\templates\scope.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated scope.html with mobile navigation fixes!")
