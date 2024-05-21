<template>
    <div class="loading-box" :style="customStyle">
      <div class="spinner" :style="spinnerCustomStyle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  
  </template>
  
  <script>
  export default {
    name: 'ComponentLoading',
    props: {
      height: {
        type: String,
        default: "5vh"
      },
      backgroundColor: {
        type: String,
        default: "#fff"
      },
      spinnerColor: {
        type: String,
        default: "#facc15"
      },
      spinnerColorSecondary: {
        type: String,
        default: "rgba(0, 0, 0, 0.2)"
      },
      spinnerSize: {
        type: String,
        default: "2.375rem"
      },
      spinnerWeight: {
        type: String,
        default: "5px"
      }
    },
    computed: {
      customStyle() {
        return `background-color: ${this.backgroundColor};
          height: ${this.height};`.replace(/\s\s+/g, '')
      },
      spinnerCustomStyle() {
        return `border-color: ${this.spinnerColorSecondary};
          border-top-color: ${this.spinnerColor};
          border-width: ${this.spinnerWeight};
          height: ${this.spinnerSize};
          width: ${this.spinnerSize};`.replace(/\s\s+/g, '')
      }
    }
  }
  </script>
  
  <style>
  .loading-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .spinner {
    border-style: solid;
    border-radius: 50%;
    animation: spin 0.5s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>