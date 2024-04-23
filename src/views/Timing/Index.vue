<template>
    <div class="schedule">
        <div class="add_app" style="margin-top: 20px">
            <a-button style="margin-bottom: 20px" @click="showScheduleModal">新建周期任务</a-button>
        </div>

        <a-modal
            v-model:visible="ScheduleModalVisible"
            title="新建周期任务"
            @ok="handOk"
            ok-text="添加"
            cancel-text="取消"
        >
            <a-form
                ref="ruleForm"
                :model="form"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <a-form-item ref="task_name" label="任务名称：" prop="task_name">
                    <a-input v-model:value="form.task_name" />
                </a-form-item>
                <a-form-item label="请选择主机：" prop="hosts">
                    <a-select
                        mode="multiple"
                        v-model:value="form.hosts"
                        style="width: 100%"
                        placeholder="请选择主机"
                        @change="handleHostChange"
                    >
                        <a-select-option
                            v-for="(host_value, host_index) in host_list"
                            :key="host_index"
                            :value="host_value.id"
                        >
                            {{ host_value.ip_addr }}--{{ host_value.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="请选择周期方式：" prop="hosts">
                    <a-select
                        style="width: 120px"
                        v-model:value="form.period_way"
                        @change="handlePeriodChange"
                    >
                        <a-select-option
                            v-for="(period_value, period_index) in period_way_choices"
                            :value="period_value[0]"
                            :key="period_index"
                        >
                            {{ period_value[1] }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item ref="period_content" label="任务周期值：" prop="period_content">
                    <a-input v-model:value="form.period_content" />
                </a-form-item>
                <a-form-item ref="task_cmd" label="任务指令：" prop="task_cmd">
                    <v-ace-editor
                        v-model:value="form.task_cmd"
                        lang="html"
                        theme="chrome"
                        style="height: 200px"
                    />
                </a-form-item>
            </a-form>
        </a-modal>

        <div class="release">
            <div class="app_list">
                <a-table :columns="columns" :data-source="ScheduleList" row-key="id">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'action'">
                            <a v-if="record.enabled" @click="change_schedule_status(record)">
                                暂停
                            </a>
                            <a v-else @click="change_schedule_status(record)">激活</a>
                            <span style="color: lightgray">|</span>
                            <a>删除</a>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'

import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/theme-chrome'

import {
    reqScheduleTaskList,
    reqPeriodData,
    addScheduleTask,
    changeScheduleStatus,
} from '@/api/timing'
import { reqHostList } from '@/api/host'
import { ElMessage } from 'element-plus'

export default {
    components: {
        VAceEditor,
    },
    setup() {
        // 表格字段列设置
        const columns = [
            {
                title: '任务ID',
                dataIndex: 'id',
                key: 'id',
                sorter: true,
                width: 230,
            },
            {
                title: '任务名称',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                width: 150,
            },
            {
                title: '任务类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '操作',
                dataIndex: 'action',
                width: 300,
                key: 'action',
                scopedSlots: { customRender: 'action' },
            },
        ]

        // 周期任务列表
        const ScheduleList = ref([])

        const get_tasks_list = () => {
            reqScheduleTaskList()
                .then((response) => {
                    console.log(response)
                    ScheduleList.value = response
                })
                .catch((error) => {
                    ElMessage({
                        type: 'error',
                        message: '获取任务周期列表失败！',
                    })
                })
        }

        get_tasks_list()

        const labelCol = reactive({ span: 4 })
        const wrapperCol = reactive({ span: 14 })
        const other = ref('')
        const period_way_choices = ref([]) // 所有周期类型数据
        const host_list = ref([]) // 主机列表数据

        const form = reactive({
            task_name: '',
            hosts: [],
            period_way: 1,
            task_cmd: '',
            period_content: '',
        })

        const rules = reactive({
            task_name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
        })

        // 获取主机列表
        const get_host_list = () => {
            reqHostList()
                .then((response) => {
                    host_list.value = response.results
                })
                .catch((error) => {
                    ElMessage({
                        message: '获取主机列表失败！',
                        type: 'error',
                    })
                })
        }

        get_host_list()

        const get_period_data = () => {
            reqPeriodData().then((response) => {
                period_way_choices.value = response
            })
        }

        get_period_data()

        // 是否显示添加周期任务的弹窗
        const ScheduleModalVisible = ref(false)
        const showScheduleModal = () => {
            ScheduleModalVisible.value = true
        }

        const handleHostChange = () => {}

        // 提交表单
        const handOk = () => {
            addScheduleTask(form)
                .then((response) => {
                    ScheduleList.value.unshift(response)
                    ElMessage({
                        message: '添加定时任务成功！',
                        type: 'success',
                    })
                })
                .catch((error) => {
                    ElMessage({
                        message: '添加定时任务失败！',
                        type: 'error',
                    })
                })
        }

        // 切换计划任务的状态
        const change_schedule_status = (record) => {
            changeScheduleStatus(record.id)
                .then((response) => {
                    record.enabled = !record.enabled
                    ElMessage({
                        message: '修改状态成功！',
                        type: 'success',
                    })
                })
                .catch((error) => {
                    ElMessage({
                        message: '修改状态失败！',
                        type: 'error',
                    })
                })
        }

        return {
            columns,
            labelCol,
            wrapperCol,
            other,
            period_way_choices,
            host_list,
            form,
            rules,
            ScheduleList,
            ScheduleModalVisible,
            showScheduleModal,
            handleHostChange,
            handOk,
            change_schedule_status,
        }
    },
}
</script>

<style scoped></style>
