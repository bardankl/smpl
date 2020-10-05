export const ANIMATIONS = {
  'Slider from right to left': {
    class: 'slideRight',
    code: `@keyframes slideRightAnim {
      0% {
        background-position: -300px 0;
      }
      100% {
        background-position: 0 0;
      }
    }
    @-moz-keyframes slideRightAnim {
      0% {
        background-position: -300px 0;
      }
      100% {
        background-position: 0 0;
      }
    }
    @-webkit-keyframes slideRightAnim {
      0% {
        background-position: -300px 0;
      }
      100% {
        background-position: 0 0;
      }
    }
    @-ms-keyframes slideRightAnim {
      0% {
        background-position: -300px 0;
      }
      100% {
        background-position: 0 0;
      }
    }
    @-o-keyframes slideRightAnim {
      0% {
        background-position: -300px 0;
      }
      100% {
        background-position: 0 0;
      }
    }

    .slideRight {
      background-position: 0px 0px;

      animation: slideRightAnim 20s linear infinite;
      -moz-animation: slideRightAnim 20s linear infinite;
      -webkit-animation: slideRightAnim 20s linear infinite;
      -ms-animation: slideRightAnim 20s linear infinite;
      -o-animation: slideRightAnim 20s linear infinite;
    }
    `,
  },
  'Slider from left to right': {
    class: 'slideLeft',
    code: `@keyframes slideLeftAnim {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -300px 0;
      }
    }
    @-moz-keyframes slideLeftAnim {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -300px 0;
      }
    }
    @-webkit-keyframes slideLeftAnim {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -300px 0;
      }
    }
    @-ms-keyframes slideLeftAnim {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -300px 0;
      }
    }
    @-o-keyframes slideLeftAnim {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -300px 0;
      }
    }

    .slideLeft {
      background-position: 0px 0px;

      animation: slideLeftAnim 20s linear infinite;
      -moz-animation: slideLeftAnim 20s linear infinite;
      -webkit-animation: slideLeftAnim 20s linear infinite;
      -ms-animation: slideLeftAnim 20s linear infinite;
      -o-animation: slideLeftAnim 20s linear infinite;
    }
    `,
  },
  'Without animation': {
    class: '',
    code: '',
  },
};
