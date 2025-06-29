<template>
  <div class="h2c-home">
    <header class="h2c-header">
      <div class="h2c-logo">
      </div>
      <h1 class="h2c-title">html2canvas</h1>
      <p class="h2c-subtitle">Screenshots with JavaScript</p>
    </header>
    <main class="h2c-main">
      <div class="h2c-codes">
        <div class="h2c-code-block">
          <div class="h2c-code-title">HTML</div>
          <pre class="h2c-pre"><code>&lt;div id="capture" style="padding: 10px; background: #f5da55"&gt;
  &lt;h4 style="color: #000;"&gt;Hello world!&lt;/h4&gt;
&lt;/div&gt;</code></pre>
        </div>
        <div class="h2c-code-block">
          <div class="h2c-code-title">JavaScript</div>
          <pre class="h2c-pre"><code>html2canvas(document.querySelector("#capture")).then(canvas =&gt; {
  document.body.appendChild(canvas)
});</code></pre>
        </div>
      </div>
      <div class="h2c-btns">
        <button class="h2c-btn">Try it out</button>
        <button class="h2c-btn h2c-btn-outline">Documentation</button>
      </div>
      <div class="h2c-bottom-row">
        <div class="h2c-col h2c-col-install">
          <div class="h2c-install-title">Install NPM</div>
          <div class="h2c-install-cmd">npm install --save html2canvas</div>
          <div class="h2c-install-title">Install Yarn</div>
          <div class="h2c-install-cmd">yarn add html2canvas</div>
          <div class="h2c-download-btns">
            <button class="h2c-btn-sm">html2canvas.js</button>
            <button class="h2c-btn-sm">html2canvas.min.js</button>
            <span class="h2c-size">45kb gzipped</span>
          </div>
        </div>
        <div class="h2c-col h2c-col-empty"></div>
        <div class="h2c-col h2c-col-connect">
          <div class="h2c-connect-title">Connect</div>
          <div class="h2c-connect-btns">
            <button class="h2c-btn-star">
              <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="M8 12.027l-4.472 2.353.854-4.98L.764 5.62l5.012-.728L8 0.5l2.224 4.392 5.012.728-3.618 3.78.854 4.98z" />
              </svg>
              Star <span class="h2c-star-count">31,344</span>
            </button>
            <button class="h2c-btn-follow">&#120143; Follow</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 无需特殊逻辑
</script>

<style scoped>
.h2c-home {
  min-height: 100vh;
  background: linear-gradient(180deg, #7ac142 0%, #6bb13f 100%);
  font-family: 'Segoe UI', 'Arial', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #f5f5f5;
}

.h2c-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 48px;
  padding-bottom: 16px;
}

.h2c-logo {
  margin-bottom: 12px;
}

.h2c-title {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.h2c-subtitle {
  font-size: 1.4rem;
  color: #e0e0e0;
  margin: 8px 0 0 0;
  font-weight: 400;
  letter-spacing: 1px;
}

.h2c-main {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.h2c-codes {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  width: 100%;
  justify-content: center;
}

.h2c-code-block {
  background: #fff;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: 0 0 12px 0;
  min-width: 320px;
  max-width: 400px;
  flex: 1 1 320px;
  display: flex;
  flex-direction: column;
}

.h2c-code-title {
  font-size: 1.2rem;
  font-weight: 700;
  background: #eaf7d1;
  color: #7ac142;
  border-radius: 8px 8px 0 0;
  padding: 10px 0;
  text-align: center;
  letter-spacing: 1px;
}

.h2c-pre {
  background: transparent;
  margin: 0;
  padding: 16px 18px 0 18px;
  font-size: 1.05rem;
  font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
  color: #333;
  white-space: pre;
  overflow-x: auto;
}

.h2c-btns {
  display: flex;
  gap: 18px;
  margin: 24px 0 32px 0;
}

.h2c-btn {
  background: #fff;
  color: #7ac142;
  border: none;
  border-radius: 4px;
  padding: 10px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  transition: background 0.2s, color 0.2s;
}

.h2c-btn:hover {
  background: #eaf7d1;
}

.h2c-btn-outline {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  box-shadow: none;
}

.h2c-btn-outline:hover {
  background: #eaf7d1;
  color: #7ac142;
  border-color: #eaf7d1;
}

.h2c-bottom-row {
  display: flex;
  width: 100%;
  margin-top: 32px;
  gap: 32px;
  justify-content: center;
}

.h2c-col {
  flex: 1 1 260px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.h2c-col-empty {
  flex: 1 1 220px;
}

.h2c-install-title {
  font-size: 1.1rem;
  color: #eaf7d1;
  margin-bottom: 6px;
  margin-top: 18px;
  font-weight: 600;
}

.h2c-install-cmd {
  background: #eaf7d1;
  color: #7ac142;
  border-radius: 4px;
  padding: 7px 14px;
  font-size: 1rem;
  margin-bottom: 8px;
  font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
}

.h2c-download-btns {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.h2c-btn-sm {
  background: #fff;
  color: #7ac142;
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  transition: background 0.2s, color 0.2s;
}

.h2c-btn-sm:hover {
  background: #eaf7d1;
}

.h2c-size {
  color: #eaf7d1;
  font-size: 0.98rem;
  margin-left: 8px;
}

.h2c-connect-title {
  font-size: 1.1rem;
  color: #eaf7d1;
  margin-bottom: 10px;
  font-weight: 600;
}

.h2c-connect-btns {
  display: flex;
  gap: 10px;
  align-items: center;
}

.h2c-btn-star {
  background: #fff;
  color: #7ac142;
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  transition: background 0.2s, color 0.2s;
}

.h2c-btn-star:hover {
  background: #eaf7d1;
}

.h2c-star-count {
  margin-left: 4px;
  font-weight: 500;
  color: #7ac142;
}

.h2c-btn-follow {
  background: #fff;
  color: #7ac142;
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  transition: background 0.2s, color 0.2s;
}

.h2c-btn-follow:hover {
  background: #eaf7d1;
}

@media (max-width: 1100px) {

  .h2c-main,
  .h2c-bottom-row {
    max-width: 98vw;
    flex-wrap: wrap;
  }

  .h2c-codes {
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }
}

@media (max-width: 700px) {
  .h2c-header {
    padding-top: 24px;
  }

  .h2c-title {
    font-size: 2.1rem;
  }

  .h2c-main {
    padding: 12px 0 0 0;
  }

  .h2c-codes {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .h2c-code-block {
    min-width: 0;
    width: 98vw;
    max-width: 98vw;
  }

  .h2c-bottom-row {
    flex-direction: column;
    gap: 18px;
    align-items: stretch;
  }

  .h2c-col {
    min-width: 0;
    width: 100%;
    align-items: flex-start;
  }
}
</style>