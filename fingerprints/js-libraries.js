(() => {
  const entries = [
    {
      name: "jQuery",
      category: "js-library",
      icon: "jquery",
      detect: {
        // "jQuery" global reste fiable ; "$" trop générique pour être utilisé seul
        globals: ["jQuery"],
        scriptSrc: [/jquery(\.min)?\.js/i, /jquery-\d/i],
      },
      versionDetect: (w) => w.jQuery?.fn?.jquery ?? null,
    },
    {
      name: "Three.js",
      category: "js-library",
      icon: "three",
      detect: {
        globals: ["THREE"],
        scriptSrc: [/three(\.min)?\.js/i, /three\.module\.js/i],
      },
      versionDetect: (w) => w.THREE?.REVISION ? `r${w.THREE.REVISION}` : null,
    },
    {
      name: "D3.js",
      category: "js-library",
      icon: "d3",
      detect: {
        globals: ["d3"],
        scriptSrc: [/\/d3(\.min)?\.js/i, /d3\.v\d/i],
      },
      versionDetect: (w) => w.d3?.version ?? null,
    },
    {
      name: "Chart.js",
      category: "js-library",
      icon: "chartjs",
      detect: {
        globals: ["Chart"],
        scriptSrc: [/chart(\.min)?\.js/i, /chart\.umd/i],
      },
      versionDetect: (w) => w.Chart?.version ?? null,
    },
    {
      name: "GSAP",
      category: "js-library",
      icon: "gsap",
      detect: {
        globals: ["gsap", "TweenMax"],
        scriptSrc: [/gsap/i, /TweenMax/i],
      },
      versionDetect: (w) => w.gsap?.version ?? null,
    },
    {
      name: "Moment.js",
      category: "js-library",
      icon: "moment",
      detect: {
        globals: ["moment"],
        scriptSrc: [/moment(\.min)?\.js/i],
      },
      versionDetect: (w) => w.moment?.version ?? null,
    },
    {
      name: "Day.js",
      category: "js-library",
      icon: "dayjs",
      detect: {
        globals: ["dayjs"],
        scriptSrc: [/dayjs/i],
      },
      versionDetect: null,
    },
  ];

  window.PokewebFingerprints = window.PokewebFingerprints || [];
  window.PokewebFingerprints.push(...entries);
})();
