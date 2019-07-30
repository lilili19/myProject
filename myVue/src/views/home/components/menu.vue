<template>
	<ul class="menu">
        <li v-for="(item,index) in menuList" :key="index">
            <div class="title" @click="$emit('changeHidden', index)" @contextmenu='(e) => groupDetail(e, index)'>
                <span>{{item.title}}</span>
                <i class="el-icon-caret-top" :class="{ tran : !item.hidden, tran2 : item.hidden}"></i>
            </div>
            <ul :style="{ height: item.hidden ? 0 : (42 * item.children.length + 'px')}">
                <li 
                    v-for="(item2,index2) in item.children" 
                    :key="index2" 
                    class="title2" 
                    @contextmenu='(e) => groupDetail(e, index, index2)'
                    :class="{ tabItem: getSelectMenu[0] === index && getSelectMenu[1] === index2 }"
                    @click="tab(index, index2)"
                >
                    {{item2.title}}
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
	export default {
        props: ['menuList', 'getSelectMenu'],
		data() {
			return {
                
			}
		},
		methods: {
            // 右键分组
            groupDetail(e, index, index2) {
                e.preventDefault();
                this.$emit('showGroupPopup', [
                    index, 
                    index2
                ], {
                    X: e.pageX,
                    Y: e.pageY
                });
            },
            tab(index, index2) {
                if(this.getSelectMenu[0] === index && this.getSelectMenu[1] === index2) return;
                this.$emit('changeSelectMenu', [index, index2]);
                this.$emit('routerView', index, index2);
            },
            select() {
                const uuid = this.$route.params.id;
                let arr = [];
                this.menuList.map((e, index) => {
                    const findIndex = e.children.findIndex((e2, index2) => e2.uuid === uuid);
                    if(findIndex !== -1) arr = [index, findIndex];
                });
                this.$emit('changeSelectMenu', arr);
            }
		},
		mounted() {
			if(this.$route.name === 'home') this.$emit('changeSelectMenu', []);
        },
        watch: {
            $route(to, from) {
                if(to.name === 'home') this.$emit('changeSelectMenu', []);
            },
            // 刷新 找到id 展开
            getSelectMenu(val) {
                const list = this.menuList;
                if(val.length !== 0) {
                    list[val[0]].hidden = false;
                    this.$emit('changeSetMenuList', list);
                }
            }
        }
	}
</script>

<style scoped lang="less">
    .menu {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, .3);
        &>li {
            color: white;
            font-size: 16px;
            .height {
                height: auto;
            }
            .title {
                width: 100%;
                padding: 10px;
                height: 42px;
                background-color: rgba(0, 0, 0, .5);
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                i {
                    transition: 0.3s;
                }
                .tran {
                    transform: rotate(180deg);
                }
                .tran2 {
                    transform: rotate(0deg);
                }
            }
            ul {
                transition: 0.3s;
                overflow: hidden;
                li {
                    width: 100%;
                    height: 42px;
                    padding: 10px 0px 10px 50px;
                    background-color: rgba(0, 0, 0, .8);
                    cursor: pointer;
                }
                .tabItem {
                    background-color: #20a0ff;
                    color: white;
                }
            }
        }
    }
</style>