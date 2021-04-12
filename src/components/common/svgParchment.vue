<template>
  <svg
    width="427"
    height="406"
    viewBox="0 0 427 406"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Frame 1">
      <g id="Frame 3">
        <rect width="427" height="406" fill="white" />
        <path
          id="Vector 1"
          d="M106.604 295L94 286.987L112.422 278.083L128.5 262.5L125 116L151.204 92L317 108.026H295.67L265.613 142.75L273.37 278.083L249.13 295H106.604Z"
          stroke="#5DAACB"
          stroke-width="10"
        />
      </g>
      <path
        id="Vector 2"
        d="M246.195 155.447L145.269 148.645"
        stroke="black"
        stroke-width="10"
      />
      <path
        id="Vector 3"
        d="M245.876 182.245L144.95 175.443"
        stroke="black"
        stroke-width="10"
      />
      <path
        id="Vector 4"
        d="M212.558 208.772L144.608 204.22"
        stroke="black"
        stroke-width="10"
      />
      <path
        id="sign"
        d="M207.914 241.698L239.03 257.729L286.559 214"
        stroke="rgb(102, 199, 102)"
        stroke-width="10"
      />
    </g>
  </svg>
</template>

<script>
export default {
  created() {

  },
};
</script>

<style >
/*
#Frame2 {
  animation: sign 2s ease-in-out 3s infinite alternate;
}

@keyframes sign {
  0% {
    transform: translate(0px, 0px);
  }
  20% {
    transform: translate(50px, 10px);
  }
  30% {
    transform: translate(40px, 5px);
  }
  40% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
*/

#sign {
  stroke-dasharray: 99.58;
  stroke-dashoffset: 99.58;
  animation: check 0.4s ease-in;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
}

@keyframes check {
  0% {
    stroke-dashoffset: 99.58;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>