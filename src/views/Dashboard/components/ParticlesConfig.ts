export const ParticlesConfig = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: false,
        value_area: 800,
      },
    },
    color: {
      value: '#fadec2',
    },
    opacity: {
      value: 0.1,
      random: false,
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 6,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 6,
      random: false,
      straight: false,
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#4a5690',
      opacity: 0.4,
      width: 1,
    },
  },
  retina_detect: true,
};
