<template>
	<div class="content" v-loading="loading">
        <el-button type="primary" @click="$router.back()" style="margin-bottom: 10px;">返回</el-button>
        <el-form label-width="80px" :rules="rules" :model="formLabelAlign" ref="ruleForm">
            <el-form-item label="接口名称">
                <el-input v-model="formLabelAlign.name" style="width: 400px"></el-input>
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
                <el-button type="primary" style="margin-left: 20px;" @click="requestAjax">请求</el-button>
                <el-button type="primary" style="margin-left: 20px;" @click="save">{{formLabelAlign.id?'修改':'保存'}}</el-button>
            </el-form-item>
            <el-form-item label="header：">
                <el-input v-model="formLabelAlign.header" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入JSON"></el-input>
            </el-form-item>
            <el-form-item label="data：">
                <el-input v-model="formLabelAlign.data" type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" placeholder="请输入JSON"></el-input>
            </el-form-item>
            <el-form-item label="返回：">
                <el-input :value="returnData" type="textarea" :autosize="{ minRows: 14, maxRows: 20 }" readonly class="red"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
                <el-input v-model="formLabelAlign.remarks" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }"></el-input>
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
                loading: false,
                uuid: (this.$route.params.id || '').split('_')[1],
                formLabelAlign: {
                    id: (this.$route.params.id || '').split('_')[0],
                    name: '',
                    host: '',
                    url: '',
                    method: 'get',
                    header: '',
                    data: '',
                    remarks: '',
                    returnData: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' }
                    ]
                }
			}
		},
		methods: {
            ...mapActions([
                'setSelectMenu',
                'addEdit',
                'projectList',
                'request'
            ]),
            // 保存
            async save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                if(!this.formLabelAlign.name) return this.$message.error('接口名不能为空');
                let data = JSON.parse(JSON.stringify(this.formLabelAlign));
                data.uuid = this.getMenuList[this.getSelectMenu[0]].children[this.getSelectMenu[1]].uuid;
                // 将""转义存储
                for(let key in data) {
                    if(typeof(data[key]) === 'string') {
                        data[key] = data[key].replace(/\"/g, '\\"');
                    }
                }
                this.loading = true;
                await this.addEdit({
                    data,
                    callBack: (data) => {
                        if(this.formLabelAlign.id) {
                            this.$message.success('修改成功');
                        } else {
                            this.$message.success('新增成功');
                            this.formLabelAlign.id = data;
                        }
                    }
                })
                this.loading = false;
            },
            // 请求详情
            async getDetail() {
                const data = {
                    id: this.formLabelAlign.id,
                    uuid: this.uuid
                }
                this.loading = true;
                await this.projectList({
                    data,
                    callBack: (data) => {
                        const obj = (data || [])[0] || {};
                        for(let key in this.formLabelAlign) {
                            this.formLabelAlign[key] = obj[key];
                        }
                    }
                })
                this.loading = false;
            },
            // 代理请求 --------------全部返回 单独写接口
            async requestAjax() {
                const { id, name, remarks, returnData, ...data} = this.formLabelAlign;
                let header = '';
                if(data.header) {
                    try {
                        header = JSON.parse(data.header);
                    } catch(err) {
                        return this.$message.error('header不是JSON格式');
                    }
                }
                if(header && header.constructor !== Object) {
                    return this.$message.error('header不是JSON格式');
                }
                let reqData = '';
                if(data.data) {
                    try {
                        reqData = JSON.parse(data.data);
                    } catch(err) {
                        return this.$message.error('data不是JSON格式');
                    }
                }
                if(reqData && reqData.constructor !== Object) {
                    return this.$message.error('data不是JSON格式');
                }
                let obj = JSON.parse(JSON.stringify(data));
                this.formLabelAlign.returnData = '';
                this.loading = true;
                await this.request({
                    data: obj,
                    callBack: (data) => {
                        this.formLabelAlign.returnData = JSON.stringify(data);
                    }
                })
                this.loading = false;
            }
        },
        computed: {
			...mapGetters([
                'getMenuList',
                'getSelectMenu',
                'getToDetailObj'
            ]),
            returnData() {
                if(this.formLabelAlign.returnData) {
                    return JSON.stringify(JSON.parse(this.formLabelAlign.returnData), null, 4);
                }
                return '';
            }
		},
		mounted() {
            const { id, uuid, data } = this.getToDetailObj;
            if(this.formLabelAlign.id && this.uuid) {
                if(this.formLabelAlign.id == id && this.uuid == uuid) {
                    for(let key in this.formLabelAlign) {
                        this.formLabelAlign[key] = data[key];
                    }
                } else {
                    this.getDetail();
                }
            } else {
                // 新增页且刷新
                if(this.getMenuList.length === 0) this.$router.push('/');
            }
        },
        watch: {
            // 刷新进入 菜单列表请求完
            getMenuList(val) {
                const uuid = (this.$route.params.id || '').split('_')[1];
                if(uuid) {
                    let arr = [];
                    this.getMenuList.map((e, index) => {
                        const findIndex = e.children.findIndex((e2, index2) => e2.uuid == this.$route.params.id.split('_')[1]);
                        if(findIndex !== -1) arr = [index, findIndex];
                    });
                    this.setSelectMenu(arr);
                }
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