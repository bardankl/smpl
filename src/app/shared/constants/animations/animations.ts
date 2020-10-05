export const ANIMATIONS = {
  'Slider from right to left': {
    class: 'slideRight',
    code: `.slideRight {
      animation-name: slideRight;
      -webkit-animation-name: slideRight;

      animation-duration: 2s;
      -webkit-animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      -webkit-animation-timing-function: ease-in-out;

      visibility: visible !important;
    }

    @keyframes slideRight {
      0% {
        transform: translateX(-150%);
      }
      50% {
        transform: translateX(8%);
      }
      65% {
        transform: translateX(-4%);
      }
      80% {
        transform: translateX(4%);
      }
      95% {
        transform: translateX(-2%);
      }
      100% {
        transform: translateX(0%);
      }
    }

    @-webkit-keyframes slideRight {
      0% {
        -webkit-transform: translateX(-150%);
      }
      50% {
        -webkit-transform: translateX(8%);
      }
      65% {
        -webkit-transform: translateX(-4%);
      }
      80% {
        -webkit-transform: translateX(4%);
      }
      95% {
        -webkit-transform: translateX(-2%);
      }
      100% {
        -webkit-transform: translateX(0%);
      }
    }`,
  },
  'Slider from left to right': {
    class: 'slideLeft',
    code: `.slideLeft {
      animation-name: slideLeft;
      -webkit-animation-name: slideLeft;

      animation-duration: 2s;
      -webkit-animation-duration: 2s;
      animation-iteration-count: infinite;
      -webkit-animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      -webkit-animation-timing-function: ease-in-out;

      visibility: visible !important;
    }

    @keyframes slideLeft {
      0% {
        transform: translateX(150%);
      }
      50% {
        transform: translateX(-8%);
      }
      65% {
        transform: translateX(4%);
      }
      80% {
        transform: translateX(-4%);
      }
      95% {
        transform: translateX(2%);
      }
      100% {
        transform: translateX(0%);
      }
    }

    @-webkit-keyframes slideLeft {
      0% {
        -webkit-transform: translateX(150%);
      }
      50% {
        -webkit-transform: translateX(-8%);
      }
      65% {
        -webkit-transform: translateX(4%);
      }
      80% {
        -webkit-transform: translateX(-4%);
      }
      95% {
        -webkit-transform: translateX(2%);
      }
      100% {
        -webkit-transform: translateX(0%);
      }
    }`,
  },
  'Without animation': {
    class: '',
    code: '',
  },
};
