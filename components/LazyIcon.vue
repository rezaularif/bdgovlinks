 <template>
   <img
     ref="imgRef"
     :src="currentSrc"
     :alt="alt"
     :class="className"
     @error="onError"
   />
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted, onBeforeUnmount } from 'vue';
 
 const props = defineProps<{
   src: string;
   alt: string;
   className?: string;
 }>();
 
 const PLACEHOLDER = '/site-icons/fall_back-favicon.png';
 const imgRef = ref<HTMLImageElement | null>(null);
 const currentSrc = ref(PLACEHOLDER);
 let observer: IntersectionObserver | null = null;
 
 const onError = () => {
   currentSrc.value = PLACEHOLDER;
 };
 
 onMounted(() => {
   if (!imgRef.value) return;
   
   observer = new IntersectionObserver(
     (entries) => {
       entries.forEach((entry) => {
         if (entry.isIntersecting) {
           currentSrc.value = props.src;
           observer?.disconnect();
         }
       });
     },
     { rootMargin: '100px' }
   );
   
   observer.observe(imgRef.value);
 });
 
 onBeforeUnmount(() => {
   observer?.disconnect();
 });
 </script>
