<template>
	<div class="content" v-if="uuid">
        <el-form label-width="80px">
            <el-form-item label="名称：">
                {{name}}
            </el-form-item>
            <el-form-item label="HOST：">
                <el-input v-model="formLabelAlign.host" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="URL：">
                <el-input v-model="formLabelAlign.url" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="method：">
                 <el-select v-model="formLabelAlign.method">
                    <el-option label="get" value="get"></el-option>
                    <el-option label="post" value="post"></el-option>
                    <el-option label="put" value="put"></el-option>
                    <el-option label="delete" value="delete"></el-option>
                </el-select>
                <el-button type="primary" style="margin-left: 20px;">请求</el-button>
                <el-button type="primary" style="margin-left: 20px;">保存</el-button>
            </el-form-item>
            <el-form-item label="data：">
                <el-input v-model="formLabelAlign.data" type="textarea" :autosize="{ minRows: 6, maxRows: 10 }"></el-input>
            </el-form-item>
            <el-form-item label="返回：">
                <el-input :value="formLabelAlign.return" type="textarea"  :autosize="{ minRows: 14, maxRows: 20 }" readonly class="red"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input v-model="formLabelAlign.remarks" type="textarea"  :autosize="{ minRows: 4, maxRows: 8 }"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
	export default {
        props: ['name'],
		data() {
			return {
                uuid: this.$route.params.id,
                formLabelAlign: {
                    host: '',
                    url: '',
                    method: 'get',
                    data: '',
                    remarks: '',
                    return: '121'
                }
			}
		},
		methods: {
            
        },
        computed: {
			...mapGetters([
				'getMenuList'
            ])
		},
		mounted() {
			
        },
        watch: {
            $route(to,from) {
                this.uuid = this.$route.params.id;
            }
        }
	}
</script>

<style scoped lang="less">
    .content {
        .red {
            textarea {
                color: red;
                font-size: 18px;
            }
        }
    }
</style>