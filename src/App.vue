<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
export default {
    name:"App",
}
</script>

<style lang="scss">

:root{
    --main-color:#f74646;
    --select-box-color: rgb(57, 60, 61);
    --select-point-width:6px;
}

*{
    box-sizing: border-box;
    font-size: 14px;
    color: #222;
}

body{
    margin: 0;
}

</style>
