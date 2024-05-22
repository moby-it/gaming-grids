export function navigateList(eventName:string,
    results: globalThis.Ref<string[] | null>,
    focusedChoice:globalThis.Ref<number | null>,
    focusedListItem:HTMLLIElement|null,
   emits: (event:'playerChosen', ...args: any[]) => void
):void{
 
        if (results.value?.length) {
          if (focusedChoice.value === null){ 
            focusedChoice.value = 0;
          return;
          }
          if (eventName === 'ArrowUp' && focusedChoice.value > 0) {
            focusList(focusedListItem as HTMLLIElement,eventName);
             --focusedChoice.value;
             return;
          }
          if (eventName === 'ArrowDown' && focusedChoice.value < results.value.length - 1) {
            focusList(focusedListItem as HTMLLIElement, eventName);
             ++focusedChoice.value;
             return;
          }
          if (eventName=== 'Enter'){
             emits('playerChosen', results.value[focusedChoice.value]);
            };
      }
}