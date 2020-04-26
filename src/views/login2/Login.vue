<template>
    <div id="login">
        <div id="bgd">
            <canvas
                    id='myCanvas'
                    :width='width'
                    :height='height'
            >
            </canvas>
        </div>
        <div id="homeBox">
            <el-button class="homeBtn" type="text" @click="toHome">首页</el-button>
        </div>
        <div id="loginBox">
            <h4>管理员登录</h4>
            <el-form
                    :model="loginForm"
                    :rules="loginRules"
                    ref="loginForm"
                    label-width="0px"
                    class="form-counter"
            >
                <el-form-item
                        label=""
                        prop="username"
                        style="margin-top:40px;"
                >
                    <el-row>
                        <el-col :span='2'>
                            <i class="el-icon-user"></i>
                        </el-col>
                        <el-col :span='22'>
                            <el-input
                                    class="inps"
                                    placeholder='用户名'
                                    v-model="loginForm.username"
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                        label=""
                        prop="password"
                >
                    <el-row>
                        <el-col :span='2'>
                            <i class="el-icon-key"></i>
                        </el-col>
                        <el-col :span='22'>
                            <el-input
                                    class="inps"
                                    placeholder='密码'
                                    v-model="loginForm.password"
                                    :type="pwdType"
                            >
                                <i v-if="pwdType == 'password'" class="el-icon-lock" slot="suffix" @click="changePass()"></i>
                                <i v-else class="el-icon-unlock" slot="suffix" @click="changePass()"></i>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <!--<el-form-item-->
                        <!--label=""-->
                        <!--prop="captcha"-->
                <!--&gt;-->
                    <!--<el-row>-->
                        <!--<el-col :span='2'>-->
                            <!--<i class="el-icon-user"></i>-->
                        <!--</el-col>-->
                        <!--<el-col :span='12'>-->
                            <!--<el-input-->
                                    <!--class="inps"-->
                                    <!--placeholder='验证码'-->
                                    <!--v-model="loginForm.captcha"-->
                            <!--&gt;</el-input>-->
                        <!--</el-col>-->
                        <!--<el-col :span='10'>-->
                            <!--<img class="captcha-show" title="刷新验证码" @click="getCaptcha()" :src="captcheImg">-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                <!--</el-form-item>-->

                <el-form-item style="margin-top: 40px;text-align: center">
                    <el-button
                            type="primary"
                            round
                            class="submitBtn"
                            @click="submitForm('loginForm')"
                    >登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    import CryptoJS from "crypto-js";
    export default {
        data() {
            return {
                canvas: null,
                context: null,
                stars: [], //星星数组
                shadowColorList: [
                    "#39f",
                    "#ec5707",
                    "#b031d4",
                    "#22e6c7",
                    "#92d819",
                    "#14d7f1",
                    "#e23c66"
                ], //阴影颜色列表
                directionList: ["leftTop", "lftBottom", "rightTop", "rightBottom"], //星星运行方向
                speed: 10, //星星运行速度
                last_star_created_time: new Date(), //上次重绘星星时间
                Ball: class Ball {
                    constructor(radius) {
                        this.x = 0;
                        this.y = 0;
                        this.radius = radius;
                        this.color = "";
                        this.shadowColor = "";
                        this.direction = "";
                    }

                    draw(context) {
                        context.save();
                        context.translate(this.x, this.y);
                        context.lineWidth = this.lineWidth;
                        var my_gradient = context.createLinearGradient(0, 0, 0, 8);
                        my_gradient.addColorStop(0, this.color);
                        my_gradient.addColorStop(1, this.shadowColor);
                        context.fillStyle = my_gradient;
                        context.beginPath();
                        context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
                        context.closePath();

                        context.shadowColor = this.shadowColor;
                        context.shadowOffsetX = 0;
                        context.shadowOffsetY = 0;
                        context.shadowBlur = 10;

                        context.fill();
                        context.restore();
                    }
                }, //工厂模式定义Ball类
                width: window.innerWidth,
                height: window.innerHeight,
                loginForm: {
                    username: "",
                    password: "",
                    captcha: ""
                },
                pwdType: 'password',
                captcheImg: '',
                loginRules: {
                    username: [
                        { required: true, message: "请输入用户名", trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "blur" }
                        ]
                }
            };
        },

        created(){

        },

        methods: {
            //提交登录
            submitForm(formName) {

                let pwd = false;
                let iv = '1234567890123456';
                let key = '1234567890654321';
                let oldPwd = this.loginForm.password;

                pwd = this.encrypt(oldPwd,key,iv);

                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        // 通过验证
                        if (pwd){
                            this.loginForm.password = pwd;
                            this.$store.dispatch('Login', this.loginForm).then(res => {
                                window.location.href = '/';
                            }).catch( (error) =>{
                                    let message = "程序错误!";
                                    if(error.response){
                                        message =  error.response.data.message;
                                        // 打印错误信息
                                        this.$message({
                                            message: message,
                                            type: 'error'
                                        });
                                    }
                                this.loginForm.password = oldPwd;
                                // this.getCaptcha();
                            })
                    }else{
                        //加密错误
                        this.loginForm.password = oldPwd;
                        this.$message({
                            message: '加密错误',
                            type: 'error'
                        });
                    }
                }
                })
            },

            /**
             * 接口数据加密函数
             * @param str string 需加密的json字符串
             * @param key string 加密key(16位)
             * @param iv string 加密向量(16位)
             * @return string 加密密文字符串
             */
            encrypt(str, key, iv){
                //密钥16位
                let keyd = CryptoJS.enc.Utf8.parse(key);
                //加密向量16位
                let ivd = CryptoJS.enc.Utf8.parse(iv);

                let encrypted = CryptoJS.AES.encrypt(str, keyd, {
                    iv: ivd,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.ZeroPadding
                }).toString();
                return encrypted;
            },


            //验证码
            getCaptcha(){
                axios.get('/api/user/captcha').then((res)=>{
                    console.log(res);
                    // this.captcheImg = res.data.url;
                })
            },

            //跳转到首页
            toHome(){
                window.location.href = "/home";
            },
            //控制密码显示
            changePass() {
                if (this.pwdType === 'password') this.pwdType = '';
                else this.pwdType = 'password';
            },
            //重复动画
            drawFrame() {
                let animation = requestAnimationFrame(this.drawFrame);
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.createStar(false);
                this.stars.forEach(this.moveStar);
            },
            //展示所有的星星
            createStar(params) {
                let now = new Date();
                if (params) {
                    //初始化星星
                    for (var i = 0; i < 50; i++) {
                        const radius = Math.random() * 3 + 2;
                        let star = new this.Ball(radius);
                        star.x = Math.random() * this.canvas.width + 1;
                        star.y = Math.random() * this.canvas.height + 1;
                        star.color = "#ffffff";
                        star.shadowColor = this.shadowColorList[
                            Math.floor(Math.random() * this.shadowColorList.length)
                            ];
                        star.direction = this.directionList[
                            Math.floor(Math.random() * this.directionList.length)
                            ];
                        this.stars.push(star);
                    }
                } else if (!params && now - this.last_star_created_time > 3000) {
                    //每隔3秒重绘修改颜色其中30个球阴影颜色
                    for (var i = 0; i < 30; i++) {
                        this.stars[i].shadowColor = this.shadowColorList[
                            Math.floor(Math.random() * this.shadowColorList.length)
                            ];
                    }
                    this.last_star_created_time = now;
                }
            },
            //移动
            moveStar(star, index) {
                if (star.y - this.canvas.height > 0) {
                    //触底
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "leftTop";
                    } else {
                        star.direction = "rightTop";
                    }
                } else if (star.y < 2) {
                    //触顶
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "rightBottom";
                    } else {
                        star.direction = "leftBottom";
                    }
                } else if (star.x < 2) {
                    //左边
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "rightTop";
                    } else {
                        star.direction = "rightBottom";
                    }
                } else if (star.x - this.canvas.width > 0) {
                    //右边
                    if (Math.floor(Math.random() * 2) === 1) {
                        star.direction = "leftBottom";
                    } else {
                        star.direction = "leftTop";
                    }
                }
                if (star.direction === "leftTop") {
                    star.y -= star.radius / this.speed;
                    star.x -= star.radius / this.speed;
                } else if (star.direction === "rightBottom") {
                    star.y += star.radius / this.speed;
                    star.x += star.radius / this.speed;
                } else if (star.direction === "leftBottom") {
                    star.y += star.radius / this.speed;
                    star.x -= star.radius / this.speed;
                } else if (star.direction === "rightTop") {
                    star.y -= star.radius / this.speed;
                    star.x += star.radius / this.speed;
                }
                star.draw(this.context);
            }
        },

        mounted() {
            this.canvas = document.getElementById("myCanvas");
            this.context = this.canvas.getContext("2d");
            this.createStar(true);
            this.drawFrame();
        }
    };
</script>

<style lang='less' scoped>
    #login {
        width: 100vw;
        padding: 0;
        margin: 0;
        height: 100vh;
        font-size: 16px;
        /*background-repeat: no-repeat;*/
        background-position: left top;
        background-color: #242645;
        color: #fff;
        font-family: "Source Sans Pro";
        background-size: 100%;
        background-repeat: round;
        background-image: url("../../assets/images/login/Starry.png");
        position: relative;
        #bgd {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }
        #homeBox{
            position: absolute;
            top: 0;
            margin: auto;
            width: 100vw;
            height: 30px;
            text-align: center;
            .homeBtn{
                margin-right: 20px;
                font-size: 16px;
                font-family: "Source Sans Pro";
                width: 50px;
                height: 30px;
                float: right;
                cursor: pointer;
                text-align: center;
            }
        }
        #loginBox {
            width: 240px;
            height: 280px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            padding: 30px 40px 40px 40px;
            box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
            opacity: 1;
            background: linear-gradient(
                    230deg,
                    rgba(53, 57, 74, 0) 0%,
                    rgb(0, 0, 0) 100%
            );
            /deep/ .inps input {
                border: none;
                color: #ffffff;
                background-color: transparent;
                font-size: 12px;
            }
            .submitBtn {
                background-color: transparent;
                color: #39f;
                width: 200px;
            }
            .iconfont {
                color: #fff;
            }
            .captcha-show{
                cursor: pointer;
                margin-top: 0;
                width: 120px;
                height: 34px;
            }

        }
    }
</style>
