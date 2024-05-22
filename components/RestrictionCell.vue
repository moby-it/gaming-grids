<script lang="ts" setup>
const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="restriction">
    <h5> {{ props.text }} </h5>
  </div>
</template>

<style>
.restriction {
  display: flex;
  width: 9rem;
  height: 9rem;
  text-align: baseline;
  justify-content: center;
  align-items: center;

  h5 {
    font-size: 20px;
  }
}

@media (max-width:992px) {
  .restriction {
    width: 9rem;
    height: 9rem;

    h5 {
      font-size: 15px;
    }
  }


}

@media (max-width:768px) {
  .restriction {
    width: 8rem;
    height: 8rem;

    h5 {
      font-size: 14px;
    }
  }

}

@media (max-width:576px) {
  .restriction {
    width: 6rem;
    height: 6rem;
  }
}

@media (width <=425px) {
  .restriction {
    width: 5rem;
    height: 5rem;

    h5 {
      font-size: 12px;
    }
  }

}
</style>