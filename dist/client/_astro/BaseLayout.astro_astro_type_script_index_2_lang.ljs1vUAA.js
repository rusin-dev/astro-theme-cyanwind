function e(){let e=document.createElement(`canvas`),t=e.getContext(`webgl`,{failIfMajorPerformanceCaveat:!0})||e.getContext(`experimental-webgl`,{failIfMajorPerformanceCaveat:!0});return e.getContext(`webgl`)||e.getContext(`experimental-webgl`)?t?{webglSupported:!0,hardwareAccelerated:!0}:{webglSupported:!0,hardwareAccelerated:!1}:{webglSupported:!1,hardwareAccelerated:!1}}function t(){let e=document.createElement(`canvas`),t=e.getContext(`webgl`)||e.getContext(`experimental-webgl`);if(!t)return null;let n=t,r=n.getExtension(`WEBGL_debug_renderer_info`);if(r){let e=n.getParameter(r.UNMASKED_RENDERER_WEBGL),t=n.getParameter(r.UNMASKED_VENDOR_WEBGL);return{isSoftwareRenderer:[`swiftshader`,`software`,`llvmpipe`,`microsoft basic render`].some(t=>e.toLowerCase().includes(t)),renderer:e,vendor:t}}return null}var n=`axi-blog-graphics-warning-shown`,r=`axi-blog-webgl-support`;function i(){try{return localStorage.getItem(n)===`true`}catch{return!1}}function a(){try{localStorage.setItem(n,`true`)}catch{}}function o(){try{let e=localStorage.getItem(r);if(!e)return null;let t=JSON.parse(e),n=Date.now();return t.version!==`1.0`||n-t.timestamp>6048e5?(localStorage.removeItem(r),null):t}catch{return null}}function s(e){try{let t={...e,timestamp:Date.now(),version:`1.0`};localStorage.setItem(r,JSON.stringify(t))}catch{}}function c(){let e=window.location.pathname;return e.includes(`/en/`)||e.endsWith(`/en`)?`en`:`zh`}var l={zh:{webglError:{title:`浏览器兼容性提醒`,content:`
        <strong>您的浏览器不支持 WebGL 技术</strong>，可能会影响网站的某些功能体验。
        
        <ul class="graphics-warning-list">
          <li>更新到最新版本的现代浏览器（Chrome、Firefox、Edge、Safari）</li>
          <li>确保您的设备支持硬件加速</li>
          <li>如果使用的是较老的设备，建议升级浏览器版本</li>
        </ul>
      `},performanceWarning:{title:`性能优化建议`,content:`
        <strong>检测到您的浏览器可能未启用硬件加速</strong>，这可能会影响网页性能和视觉效果。开启硬件加速通常<strong>不会导致性能开销明显增加</strong>，但是可能可以显著提升网页的渲染速度与浏览体验。
        
        <ul class="graphics-warning-list">
          <li><strong>Chrome:</strong> 设置 → 系统 → 使用图形加速功能（如果可用）</li>
          <li><strong>Firefox:</strong> 设置 → 常规 → 性能 → 使用推荐的性能设置 → 自动启用硬件加速</li>
          <li><strong>Edge:</strong> 设置 → 系统和性能 → 图形加速 → 在可用时使用图形加速</li>
          <li>重启浏览器让设置生效</li>
        </ul>
        
        <p style="margin-top: 16px; opacity: 0.8; font-size: 14px;">
          💡 如果您的设备较老或不支持硬件加速，网站仍可正常使用。
        </p>
      `},button:`我知道了`},en:{webglError:{title:`Browser Compatibility Notice`,content:`
        <strong>Your browser does not support WebGL technology</strong>, which may affect some website features and experience.
        
        <ul class="graphics-warning-list">
          <li>Update to the latest version of modern browsers (Chrome, Firefox, Edge, Safari)</li>
          <li>Ensure your device supports hardware acceleration</li>
          <li>For older devices, consider upgrading your browser version</li>
        </ul>
      `},performanceWarning:{title:`Performance Optimization Suggestion`,content:`
        <strong>Hardware acceleration may not be enabled in your browser</strong>, which could affect web performance and visual effects. Enabling hardware acceleration typically <strong>does not significantly increase performance overhead</strong>, but can significantly improve web rendering speed and browsing experience.
        
        <ul class="graphics-warning-list">
          <li><strong>Chrome:</strong> Settings → System → Use hardware acceleration when available</li>
          <li><strong>Firefox:</strong> Settings → General → Performance → Use recommended performance settings → Enable hardware acceleration</li>
          <li><strong>Edge:</strong> Settings → System and performance → Use hardware acceleration when available</li>
          <li>Restart your browser for settings to take effect</li>
        </ul>
        
        <p style="margin-top: 16px; opacity: 0.8; font-size: 14px;">
          💡 If your device is older or doesn't support hardware acceleration, the website will still work normally.
        </p>
      `},button:`Got it`}},u=`axi-blog-graphics-warning-shown`;function d(e,t,n=`warning`){let r=l[c()].button,i=document.createElement(`div`);i.className=`graphics-warning-overlay`;let o=document.createElement(`div`);o.className=`graphics-warning-dialog`,o.innerHTML=`
    <div class="graphics-warning-header">
      <div class="${n===`error`?`graphics-warning-icon error`:`graphics-warning-icon`}">${n===`error`?`🚫`:`⚠️`}</div>
      <h3 class="graphics-warning-title">${e}</h3>
    </div>
    <div class="graphics-warning-content">
      ${t}
    </div>
    <div class="graphics-warning-actions">
      <button class="graphics-warning-btn" onclick="this.closest('.graphics-warning-overlay').remove(); localStorage.setItem('${u}', 'true')">
        ${r}
      </button>
    </div>
  `,i.appendChild(o),document.body.appendChild(i),i.addEventListener(`click`,e=>{e.target===i&&(a(),i.remove())});let s=e=>{e.key===`Escape`&&(a(),i.remove(),document.removeEventListener(`keydown`,s))};document.addEventListener(`keydown`,s),a()}function f(){let e=document.getElementById(`gradient-background`);e&&(e.style.display=`block`,e.style.opacity=`1`);let t=document.createElement(`style`);t.textContent=`
    header-component.not-top {
      background-color: hsl(var(--background) / 0.0) !important;
    }
    .dark header-component.not-top {
      background-color: hsl(var(--muted) / 0.0) !important;
    }
  `,document.head.appendChild(t)}function p(){let e=document.getElementById(`gradient-background`);e&&(e.style.opacity=`0`,setTimeout(()=>{e.style.display=`none`},1e3))}function m(e,t){document.getElementById(`gradient-background`)&&(!e||!t?p():f())}function h(){try{let n=e(),r=t();s({webglSupported:n.webglSupported,hardwareAccelerated:n.hardwareAccelerated&&!(r&&r.isSoftwareRenderer)});let i=o();i&&(!i.webglSupported||!i.hardwareAccelerated?p():f())}catch{}}function g(){if(!i())try{let n=c(),r=e(),i=t();if(s({webglSupported:r.webglSupported,hardwareAccelerated:r.hardwareAccelerated&&!(i&&i.isSoftwareRenderer)}),!r.webglSupported){p();let e=l[n].webglError;d(e.title,e.content,`error`)}else if(!r.hardwareAccelerated||i&&i.isSoftwareRenderer){p();let e=l[n].performanceWarning;d(e.title,e.content,`warning`)}else f()}catch{}}function _(){let e=o();e&&e?(m(e.webglSupported,e.hardwareAccelerated),setTimeout(h,1500)):setTimeout(g,1500)}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,_):_();