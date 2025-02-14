<template>
    <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
            <AccordionTrigger>{{ preview }}</AccordionTrigger>
            <AccordionContent>
                <slot></slot>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>

<script lang="ts" setup>
import Accordion from "@/components/ui/accordion/Accordion.vue";
import AccordionItem from "@/components/ui/accordion/AccordionItem.vue";
import AccordionTrigger from "@/components/ui/accordion/AccordionTrigger.vue";
import AccordionContent from "@/components/ui/accordion/AccordionContent.vue";

const props = defineProps<{
    preview?: string
}>();

const { preview } = props;

</script>