<script lang="ts" setup>
const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="restriction">
    <span> {{ props.text }}
    </span>
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
  font-size: 20px;
  font-weight: 700;
  color: var(--accent-200);
  font-family: 'Spiegel';

  &:hover {
    color: var(--accent-600);
  }

}

@media (max-width:992px) {
  .restriction {
    width: 9rem;
    height: 9rem;
    font-size: 15px;

  }


}

@media (max-width:768px) {
  .restriction {
    width: 8rem;
    height: 8rem;


    font-size: 14px;

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
    font-size: 12px;
  }

}
</style>