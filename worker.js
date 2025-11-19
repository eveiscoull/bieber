export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/today') {
      const random = Math.floor(Math.random() * 20) + 1; // 1–20
      return Response.redirect(`https://get.bieber.party/bieber${random}.jpg`, 302);
    }

    const html = `  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="https://get.bieber.party/favicon.ico" type="image/x-icon">
    <title>You've been Biebered!</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa; /* Light background for the page */
            color: #212529;
        }

        .content-wrapper { /* Added wrapper for centering content */
            max-width: 800px;
            margin: 0 auto;
        }

        h1 {
            text-align: center;
            font-size: 2.8em; /* Large title */
            margin-bottom: 0.5em;
            color: #343a40;
        }

        .intro-paragraph { /* Specific class for intro paragraph */
            text-align: center;
            margin-bottom: 2em;
        }

        h3 { /* Styling for OS titles */
            font-size: 1.4em;
            color: #495057;
            margin-top: 2em; /* Space above each OS section */
            margin-bottom: 0.5em;
            border-bottom: 1px solid #dee2e6; /* Subtle separator */
            padding-bottom: 0.3em;
        }

        /* Code Container Styling (like the image) */
        .code-container {
            background-color: #282c34; /* Dark background for code block */
            border-radius: 6px;
            padding: 15px 20px;
            margin-top: 0.5em; /* Space below h3 or previous element */
            margin-bottom: 0.5em; /* Space below code block */
            position: relative; /* Needed for absolute positioning of the button */
            display: flex; /* Use flexbox to align items */
            align-items: center; /* Vertically center content */
            justify-content: space-between; /* Push code and button apart */
            overflow-x: auto; /* Allow horizontal scrolling if code is too long */
        }

        .code-container pre {
            margin: 0; /* Remove default pre margin */
            flex-grow: 1; /* Allow pre to take available space */
            overflow-x: auto; /* Scroll inside pre if needed */
            padding-right: 15px; /* Space before button */
        }

        .code-container code {
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            color: #abb2bf; /* Light text color for code */
            font-size: 0.9em;
            white-space: pre; /* Preserve whitespace and line breaks */
            display: block; /* Make code block-level */
        }

        /* Copy Button Styling */
        .copy-btn {
            background-color: #495057; /* Button background */
            color: #ced4da; /* Button text color */
            border: 1px solid #6c757d;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            font-size: 0.8em;
            font-family: inherit;
            transition: background-color 0.2s ease, color 0.2s ease;
            flex-shrink: 0; /* Prevent button from shrinking */
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 50px; /* Ensure minimum width */
        }

        .copy-btn:hover {
            background-color: #6c757d;
            color: #fff;
        }

        .copy-btn:active {
            background-color: #343a40;
        }

        /* Details/Summary for Dropdowns */
        details {
            /* max-width: 800px; */ /* Removed, width handled by parent */
            margin-top: 0; /* Attached directly below command block */
            margin-bottom: 1em; /* Space after dropdown */
            background-color: #fff;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            overflow: hidden; /* Contain the background and border */
        }

        summary {
            padding: 10px 15px;
            padding-left: 35px; /* Make space for custom marker */
            font-weight: bold;
            cursor: pointer;
            background-color: #e9ecef;
            border-bottom: 1px solid transparent; /* Default transparent border */
            outline: none; /* Remove focus outline */
            list-style: none; /* Remove default marker */
            position: relative;
            transition: background-color 0.2s ease;
        }
        summary:hover {
            background-color: #dee2e6;
        }

        details[open] summary {
            border-bottom-color: #dee2e6; /* Separator when open */
        }


        summary::-webkit-details-marker {
            display: none; /* Hide default marker (Chrome/Safari) */
        }

        summary::before { /* Custom marker */
            content: '▶';
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%) rotate(0deg);
            transition: transform 0.2s ease-in-out;
            font-size: 0.8em;
            color: #6c757d;
        }

        details[open] summary::before {
            transform: translateY(-50%) rotate(90deg);
        }

        /* Adjust code container when inside details */
        details .code-container {
             max-width: none; /* Take full width of details */
             margin: 0;
             border-radius: 0 0 6px 6px; /* Match details rounding */
             border: none; /* Remove extra border */
             border-top: 1px solid #dee2e6; /* Line between summary and code */
        }

        .chromeos-note { /* Styling for ChromeOS note */
             text-align: center;
             margin-top: 2.5em;
             padding: 1em;
             background-color: #fff3cd; /* Warning background */
             border: 1px solid #ffeeba;
             color: #856404; /* Warning text color */
             border-radius: 6px;
        }

        /* Footer Styling */
        footer {
            margin-top: 3em;
            padding: 20px;
            background-color: #343a40;
            color: #ced4da;
            text-align: center;
            border-radius: 6px;
        }

        footer a {
            color: #ced4da;
            text-decoration: none;
            font-weight: bold;
        }

        footer a:hover {
            color: #fff;
        }

        footer .github-icon {
            width: 24px;
            height: 24px;
            margin-left: 10px;
            vertical-align: middle;
        }
        /* customizable snowflake styling using image */
        .snowflake, .snowflake .inner {
          animation-iteration-count: infinite;
          animation-play-state: running;
        }

        @keyframes snowflakes-fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(110vh); }
        }

        @keyframes snowflakes-shake {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(80px); }
        }

        .snowflake {
          position: fixed;
          top: -10%;
          z-index: -1;
          user-select: none;
          pointer-events: none;
          animation-name: snowflakes-shake;
          animation-duration: 3s;
          animation-timing-function: ease-in-out;
          opacity: 50%
        }

        .snowflake .inner {
          animation-duration: 10s;
          animation-name: snowflakes-fall;
          animation-timing-function: linear;
        }

        .snowflake img {
          width: 24px; /* adjust size as needed */
          height: 24px;
          pointer-events: none;
        }

        .snowflake:nth-of-type(0) { left: 1%; animation-delay: 0s; }
        .snowflake:nth-of-type(0) .inner { animation-delay: 0s; }
        .snowflake:first-of-type { left: 10%; animation-delay: 1s; }
        .snowflake:first-of-type .inner, .snowflake:nth-of-type(8) .inner { animation-delay: 1s; }
        .snowflake:nth-of-type(2) { left: 20%; animation-delay: .5s; }
        .snowflake:nth-of-type(2) .inner, .snowflake:nth-of-type(6) .inner { animation-delay: 6s; }
        .snowflake:nth-of-type(3) { left: 30%; animation-delay: 2s; }
        .snowflake:nth-of-type(11) .inner, .snowflake:nth-of-type(3) .inner { animation-delay: 4s; }
        .snowflake:nth-of-type(4) { left: 40%; animation-delay: 2s; }
        .snowflake:nth-of-type(10) .inner, .snowflake:nth-of-type(4) .inner { animation-delay: 2s; }
        .snowflake:nth-of-type(5) { left: 50%; animation-delay: 3s; }
        .snowflake:nth-of-type(5) .inner { animation-delay: 8s; }
        .snowflake:nth-of-type(6) { left: 60%; animation-delay: 2s; }
        .snowflake:nth-of-type(7) { left: 70%; animation-delay: 1s; }
        .snowflake:nth-of-type(7) .inner { animation-delay: 2.5s; }
        .snowflake:nth-of-type(8) { left: 80%; animation-delay: 0s; }
        .snowflake:nth-of-type(9) { left: 90%; animation-delay: 1.5s; }
        .snowflake:nth-of-type(9) .inner { animation-delay: 3s; }
        .snowflake:nth-of-type(10) { left: 25%; animation-delay: 0s; }
        .snowflake:nth-of-type(11) { left: 65%; animation-delay: 2.5s; }
    </style>
</head>
<body>

    <h1>You've been Biebered!</h1>

    <div class="content-wrapper">
        <p class="intro-paragraph">Bieber someone by using one of these commands:</p>

        <h3>Windows</h3>
        <div class="code-container">
            <pre><code id="cmd-windows">iex (iwr 'https://get.bieber.party/windows')</code></pre>
            <button class="copy-btn" data-target="cmd-windows" title="Copy command">Copy</button>
        </div>
        <details>
            <summary>Show script</summary>
            <div class="code-container" id="script-windows-container">
                <!-- Script content will load dynamically here -->
            </div>
            <button class="copy-btn" data-target="script-windows-container" title="Copy script">Copy</button>
        </details>

        <h3>macOS</h3>
        <div class="code-container">
            <pre><code id="cmd-macos">bash <(curl -s https://get.bieber.party/macos)</code></pre>
            <button class="copy-btn" data-target="cmd-macos" title="Copy command">Copy</button>
        </div>
        <details>
            <summary>Show script</summary>
            <div class="code-container" id="script-macos-container">
                <!-- Script content will load dynamically here -->
            </div>
            <button class="copy-btn" data-target="script-macos-container" title="Copy script">Copy</button>
        </details>

        <h3>GNOME (Linux)</h3>
        <div class="code-container">
            <pre><code id="cmd-gnome">bash <(curl -s https://get.bieber.party/gnome)</code></pre>
            <button class="copy-btn" data-target="cmd-gnome" title="Copy command">Copy</button>
        </div>
        <details>
            <summary>Show script</summary>
            <div class="code-container" id="script-gnome-container">
                <!-- Script content will load dynamically here -->
            </div>
            <button class="copy-btn" data-target="script-gnome-container" title="Copy script">Copy</button>
        </details>

        <h3>KDE Plasma (Linux)</h3>
        <div class="code-container">
            <pre><code id="cmd-kde">bash <(curl -s https://get.bieber.party/kde)</code></pre>
            <button class="copy-btn" data-target="cmd-kde" title="Copy command">Copy</button>
        </div>
        <details>
            <summary>Show script</summary>
            <div class="code-container" id="script-kde-container">
                <!-- Script content will load dynamically here -->
            </div>
            <button class="copy-btn" data-target="script-kde-container" title="Copy script">Copy</button>
        </details>

        <p class="chromeos-note"><strong>ChromeOS:</strong> Sorry, ChromeOS is too locked down to allow this to work :(</p>
    </div>

    <!-- Bieber snow -->
    <div class="snowflakes" aria-hidden="true">
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
      <div class="snowflake"><div class="inner"><img src="https://get.bieber.party/bieberbackground.jpg" alt="Snowflake"></div></div>
    </div>

    <!-- Footer -->
    <footer>
        <p>Created by <a href="https://oe.tc/" target="_blank" rel="noopener noreferrer"><strong>eveiscoull</strong></a></p>
        <a href="https://github.com/eveiscoull/bieber" target="_blank" rel="noopener noreferrer">
            <img class="github-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png" alt="GitHub">
            GitHub Repository
        </a>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const copyButtons = document.querySelectorAll('.copy-btn');

            copyButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetId = button.getAttribute('data-target');
                    const targetCodeElement = document.getElementById(targetId);

                    if (targetCodeElement) {
                        const textToCopy = targetCodeElement.innerText;
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            // Success feedback
                            const originalText = button.innerText;
                            button.innerText = 'Copied!';
                            button.disabled = true; // Briefly disable button
                            setTimeout(() => {
                                button.innerText = originalText;
                                button.disabled = false;
                            }, 1500); // Reset after 1.5 seconds
                        }).catch(err => {
                            console.error('Failed to copy text: ', err);
                            // Optional: Provide error feedback to the user
                            alert('Failed to copy text. Please try manually.');
                        });
                    } else {
                        console.error('Target code element not found for ID:', targetId);
                    }
                });
            });

            // Function to fetch and display script content
            function loadScriptContent(url, containerId) {
              fetch(url, { mode: 'cors' })
                .then(response => response.text())
                .then(scriptContent => {
                  const container = document.getElementById(containerId);
                  // Use textContent to safely insert script content
                  const pre = document.createElement('pre');
                  const code = document.createElement('code');
                  code.textContent = scriptContent; // Avoid HTML interpretation
                  pre.appendChild(code);
                  container.innerHTML = ''; // Clear the container before inserting new content
                  container.appendChild(pre);
                })
                .catch(function(err) {
                  console.error("Failed to load script from " + url + ": " + err);
                });
}



            // Load the script content dynamically for each platform
            loadScriptContent('https://get.bieber.party/windows', 'script-windows-container');
            loadScriptContent('https://get.bieber.party/macos', 'script-macos-container');
            loadScriptContent('https://get.bieber.party/gnome', 'script-gnome-container');
            loadScriptContent('https://get.bieber.party/kde', 'script-kde-container');
        });
    </script>

</body>
</html>`;
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

