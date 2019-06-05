<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div >
      {{html}}
    </div>
  </div>
</template>
<script>
import { get } from '@/api'
export default {
  data(){
    return {
      html: ''
    }
  },
  created() {
    get('').then(res => {
      console.log(res.data)
      this.html = res.data
    })
  }
}
</script>
