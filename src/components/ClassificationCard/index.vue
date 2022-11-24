<template>
    <div class="box">
        <ul>
            <li>
                <h3>分类专栏:</h3>
                <a href="#">
                    <div class="bg">{{ article.cate_name }}</div>
                </a>
            </li>
            <li>
                <section>
                    <h3>文章标签:</h3>
                    <a href="#">
                        <div class="bg">{{ article.cate_name }}</div>
                    </a>
                </section>
            </li>
            <li>
                <section>
                    <h3>浏览次数</h3>
                    <div style="display:inline-block;vertical-align:middle;padding-top: 5px;">
                        <svg t="1669281140779" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2845" width="20" height="20">
                            <path
                                d="M904.533333 541.866667c-12.8 0-21.333333-4.266667-29.866666-17.066667-98.133333-179.2-226.133333-281.6-362.666667-281.6S247.466667 341.333333 149.333333 524.8c-8.533333 17.066667-29.866667 21.333333-46.933333 12.8-17.066667-8.533333-21.333333-29.866667-12.8-46.933333C204.8 290.133333 354.133333 179.2 512 179.2c162.133333 0 311.466667 110.933333 422.4 315.733333 8.533333 17.066667 4.266667 34.133333-12.8 46.933334h-17.066667z"
                                p-id="2846"></path>
                            <path
                                d="M512 844.8c-162.133333 0-311.466667-110.933333-422.4-315.733333-8.533333-17.066667-4.266667-34.133333 12.8-42.666667 17.066667-8.533333 34.133333-4.266667 46.933333 12.8 98.133333 179.2 226.133333 281.6 362.666667 281.6s264.533333-98.133333 362.666667-281.6c8.533333-17.066667 29.866667-21.333333 46.933333-12.8 17.066667 8.533333 21.333333 29.866667 12.8 46.933333-115.2 200.533333-264.533333 311.466667-422.4 311.466667z"
                                p-id="2847"></path>
                            <path
                                d="M512 691.2c-93.866667 0-174.933333-76.8-174.933333-174.933333 4.266667-93.866667 81.066667-170.666667 174.933333-170.666667 93.866667 0 174.933333 76.8 174.933333 174.933333 0 93.866667-76.8 170.666667-174.933333 170.666667z m0-277.333333c-59.733333 0-106.666667 46.933333-106.666667 106.666666s46.933333 106.666667 106.666667 106.666667 106.666667-46.933333 106.666667-106.666667-46.933333-106.666667-106.666667-106.666666z"
                                p-id="2848"></path>
                        </svg>
                    </div>
                    <div style="display:inline-block" class="see">{{ article.visit_number }}</div>
                </section>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'ClassificationCard',
    data() {
        return {
            //name:'Tom'
        }
    },
    computed: {
        ...mapState({ article: (state) => state.Homepage.article }),
    },
}
</script>
<style scoped lang="less">
.box {
    box-sizing: border-box;
    background-color: #eee;
    // height: 80px;
    margin-right: 3%;
    margin-left: 1%;
    margin-bottom: 10px;
    padding: 10px 20px;
    line-height: 60px;

    ul {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: center;
        flex-wrap: nowrap;

        li {
            margin: 0 10px 0 0;

            h3 {
                display: inline-block;
                font-weight: 500;
                font-size: 16px;
                margin-right: 5px;
            }

            .bg {
                display: inline-block;
                height: 20px;
                line-height: 20px;
                padding: 5px 10px 5px 10px;
                margin: 5px;
                color: #50A1E1;
                background-color: #fff;
            }

            .see {
                font-size: 14px;
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .box {
        width: 95vw;
        padding-right: 8vw;

        ul {
            justify-content: space-around;
        }

        h3 {
            font-size: 12px !important;
        }

        .bg {
            display: block !important;
        }

        .see {
            display: block !important;
        }
    }
}
</style>