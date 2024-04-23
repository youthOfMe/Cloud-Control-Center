import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePermStore = defineStore(
    'cp-perm',
    () => {
        const permList = ref({})
        const setPermList = (data) => {
            permList.value = data
        }
        const getPermList = () => permList.value

        const selectIdData = ref([])
        const setSelectIdData = (data) => {
            selectIdData.value = data
        }
        const getSelectIdData = () => selectIdData.value

        return {
            permList,
            setPermList,
            getPermList,
            selectIdData,
            setSelectIdData,
            getSelectIdData,
        }
    },
    {
        persist: true,
    },
)
