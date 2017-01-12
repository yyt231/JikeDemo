/**
 * Created by Tony on 2016/11/25.
 */

$(document).ready(function () {
    secondMenuView();

    listType();
    // itemClassHover();

    var  type=window.localStorage.getItem("type");
    // if(type==="list"){
    //     listType()
    // }else if(type==="kuai"){
    //     kuaiType()
    // }else{
    //     listType()
    // }


    if(type==="list"){
        // play-icon的动画
        $(".item-class").mouseenter(function () {
            $(this).find(".play-button").stop().fadeIn(500);
        }).mouseleave(function () {
            $(this).find(".play-button").stop().fadeOut(500);
        });
    }else if(type==="kuai"){
        $(".item-class").mouseenter(function () {
            $(this).find(".play-button").stop().fadeIn(500);
            $(this).find(".class-description").stop().show(500);
            $(this).find(".dis-inlineblock").stop().css({
                "height":"120px"
            });
        }).mouseleave(function () {
            $(this).find(".play-button").stop().fadeOut(500);
            $(this).find(".class-description").stop().hide(500);
            $(this).find(".dis-inlineblock").stop().css({
                "height":"86px"
            });
        });
    }


});
var div = undefined;
//二级菜单视图
function secondMenuView() {
    div = $("<div>").addClass("second-menu");

    var allClass = $(".all-class");
    var item = allClass.children();
    item.each(function () {
        var index = $(this).index();
        var li = $(this);
        li.css(
            {"z-index": "1"}
        );

        div.css({
            "background-color": "#fff",
            "min-height": "507px",
            "width": "402px",
            "position": "absolute",
            "left": "209px",
            "top": "-31px",
            "border": "1px solid #eee",
            "border-left": "1px solid #fff",
            "z-index": "98",
            "padding": "10px"
        });

        $(this).hover(function () {
                // console.log("index---" + index);
                div.appendTo(li);
                secondMenu(index)
            },
            function () {
                $(this).css("color", "#000");
                div.empty();
                div.remove();
                //div=undefined;
            })
    })
}

//显示二级菜单
function secondMenu(index) {

    switch (index) {
        case 0://移动开发
            addElement("js/yd_json.js");
            break;
        case 1://前端开发
            addElement("js/h5_json.js");
            break;
        case 2://后端开发
            addElement("js/dev_json.js");
            break;
        case 3://基础知识
            addElement("js/base_json.js");
            break;
        case 4://云计算大数据
            addElement("js/clouddata_json.js");
            break;
        case 5://智能硬件
            addElement("js/intellegence_json.js");
            break;
        case 6://数据库
            addElement("js/db_json.js");
            break;
        case 7://认证考试
            addElement("js/certificate_json.js");
            break;
        case 8://企业IT
            addElement("js/enterpriseit_json.js");
            break;
        case 9://设计产品
            addElement("js/productdesign_json.js");
            break;
    }
}
//加载二级menu数据
function addElement(jsonSrc) {
    $.getJSON(jsonSrc, function (jsonData) {

        for (var i = 0; i < jsonData.length; i++) {
            var div1 = $("<div>");
            var a_f = $("<a>").addClass("link");


            a_f.appendTo(div1);


            a_f.text(jsonData[i].faterMenu);
            a_f.attr("href", jsonData[i].faterLink);
            var childArr = jsonData[i].childMenu

            var ul = $("<ul>");
            ul.appendTo(div1);
            ul.css({
                "width":"402px"
            });
            var listDiv=$("<div>");
            ul.appendTo(listDiv);
            ul.css({
                "height":"30px",
                "border-top":"1px solid #eee"
            });
            listDiv.appendTo(div1);

            div1.appendTo(div);
            for (var j = 0; j < childArr.length; j++) {
                var li = $("<li>");
                var a = $("<a>");
                a.appendTo(li);
                li.appendTo(ul);


                a.text(childArr[j].name);
                a.attr("href", childArr[j].link);

                li.css({
                    "border":"none",
                    "height":"25px",
                    "float": "left",
                    "line-height":"25px",
                    // "text-align":"center",
                    "min-width":"60px",
                    "max-width":"100px"

                });
                a.css({
                    "color": "#666",
                    "text-decoration": "none",
                    "font-size": "12px",
                    "padding":"0",

                });
                a.hover(function () {
                    $(this).css({
                        "color": "#35b558"
                    });
                }, function () {
                    $(this).css({
                        "color": "#999"
                    });
                });

            }

            div1.css({
                "box-sizing": "border-box",
                // "height": "37px",
                "font-size": "14px",
                "color": "#000",
                // "border-bottom": "1px solid #eee",
                "float":"left"
            });
            $(".link").css({
                "padding":"0",
                "font-size": "14px",
                "color": "#000",
                "text-decoration": "none"
            });
            $(".link").hover(function () {
                $(this).css({
                    "color": "#35b558"
                });
            }, function () {
                $(this).css({
                    "color": "#000000"
                });
            });
        }


    })
}
//列表效果
function listType() {
    window.localStorage.setItem("type","list");
    $.ajaxSettings.async = false;
    var div=$("#right-class");
    // div.empty();

    var ul=$(".class-list");
    ul.empty();
    $.getJSON("js/allclass_json.js",function (data) {
        console.log(data);
        for(var i=0;i<data.length;i++){
            var child=data[i];
            ul.append(
                "<li class='item-class'><a href="+child.link+"><span class='play-button'></span><img class='c-img' src="+child.imgUrl+" /></a> <div class='dis-inlineblock'> <h2><a  href="+child.link+" class='class-title'>"+child.title+"</a> </h2> <p class='class-description'>"+child.description+"</p> <div class='class-tongji'> <span class='zhongji'><span class='zhongji-icon'></span>6课时 41分钟</span> <span><span class='xinhao-icon'></span>"+child.xinhao+"</span><span class='learn-count'>"+child.learnNumber+"</span></div></div> </li>")

        }

        // ul.append("<li><a href='http://www.jikexueyuan.com/course/3173.html'><img src='http://a1.jikexueyuan.com/home/201611/17/9d28/582d6e30c2d46.png'/></a> <div class='dis-inlineblock'> <h2><a  href='http://www.jikexueyuan.com/course/3173.html' class='class-title'>前端开发环境搭建(三种工具任选其一)</a> </h2> <p class='class-description'>本课程介绍常用前端开发工具 Sublime Text / Dreamweaver / WebStorm 的安装与使用技</p> <div class='class-tongji'> <span><span class='zhongji-icon'></span>6课时 41分钟</span> <span><span class='xinhao-icon'></span>初级</span><span>205人学习</span></div></div> </li>")


    });


}


//块级效果
function kuaiType() {
    window.localStorage.setItem("type","kuai");

   $(".item-class").stop().css({
       "width":"250px",
       "margin-right":"8px",
       "height":"225px"

   });

    $(".c-img").stop().css({
        "width":"250px",
        "height":"135px"
    });

    $(".class-title").stop().css({
        "width":"100%"
    });

    $(".dis-inlineblock").stop().css({
        "position":"relative",
        "width":"250px",
        "height":"86px",
        "z-index":"97",
        "padding":"5px",
        "box-sizing":"border-box"
    });

    $(".play-button").stop().css({
        "margin-left":"100px",
        "margin-top":"42px"
    });

    $(".class-description").css({
        "display":"none",
        "width":"250px"
    });

    $(".item-class").mouseenter(function () {
        $(this).find(".play-button").stop().fadeIn(500);
        $(this).find(".class-description").stop().show(200);
        $(this).find(".dis-inlineblock").stop().animate({
            height:"120px"
        },500);
    }).mouseleave(function () {
        $(this).find(".play-button").stop().fadeOut(500);
        $(this).find(".class-description").stop().hide(200);
        $(this).find(".dis-inlineblock").stop().animate({
            height:"86px"
        },200);
    });

    $(".zhongji").stop().css({
        "display":"block"
    });
    $(".class-tongji").stop().css({
        "margin-top":"10px",
        "width":"230px"
    });

    $(".learn-count ").stop().css({
        "float":"right"
    })

}
//打开搜索
function openSearch() {
    $(".searchbox").animate({
        display:"block",
        width:"850px",
        opacity:"1"
    },2000);

}
//关闭搜索
function closeSearchBox() {
    $(".searchbox").css({
        display:"none",
        "width":"0px"
    });

}
