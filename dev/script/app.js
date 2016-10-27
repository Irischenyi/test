import PictureLoader from './component/pictureLoader';
import Platform from './component/platform';
import Slider from './component/slider';
import Util from './component/util';
import Iscroll from './component/iscroll';
// module
let $ =require('jquery');
let swig = require('swig');

PictureLoader.useStorage = false;

// vars
let modules;
let feeds = [];
let success = 0;
let urls = ['https://json2jsonp.com/?url='+encodeURIComponent('http://stapi.wear.jp/popular/155/women.json')+'&callback=CB_FUNCTION_HERE',
            'https://json2jsonp.com/?url='+encodeURIComponent('http://stapi.wear.jp/popular/156/women.json')+'&callback=CB_FUNCTION_HERE',
            'https://json2jsonp.com/?url='+encodeURIComponent('http://stapi.wear.jp/popular/157/women.json')+'&callback=CB_FUNCTION_HERE',
            'https://json2jsonp.com/?url='+encodeURIComponent('http://stapi.wear.jp/popular/158/women.json')+'&callback=CB_FUNCTION_HERE',
            'https://json2jsonp.com/?url='+encodeURIComponent('http://stapi.wear.jp/popular/159/women.json')+'&callback=CB_FUNCTION_HERE',
            'https://json2jsonp.com/?url='+encodeURIComponent('http://stapi.wear.jp/popular/160/women.json')+'&callback=CB_FUNCTION_HERE',
            'https://json2jsonp.com/?url='+encodeURIComponent('http://stapi.wear.jp/popular/161/women.json')+'&callback=CB_FUNCTION_HERE',
            'https://json2jsonp.com/?url='+encodeURIComponent('http://stapi.wear.jp/popular/162/women.json')+'&callback=CB_FUNCTION_HERE',
            'https://json2jsonp.com/?url='+encodeURIComponent('http://stapi.wear.jp/popular/163/women.json')+'&callback=CB_FUNCTION_HERE',
            'https://json2jsonp.com/?url='+encodeURIComponent('http://stapi.wear.jp/popular/164/women.json')+'&callback=CB_FUNCTION_HERE'
            ];
let feedtitles = ['#R29NotSoSkinnyJeans',
                '#R29VarsityJackets',
                '#R29OversizedChic',
                '#R29SlipDressing',
                '#R29DadHats',
                '#R29UnBasicBasics',
                '#R29CowboyStyle',
                '#R29FancySlippers',
                '#R29SweaterWeather',
                '#R29ThrowbackBrandLove'
                ];
let cardlink = [
'http://wear.net/women-popular/refinery29/155/?utm_source=refinery29&utm_medium=web&utm_campaign=160816_R29_WEAR_L P',
'http://wear.net/women-popular/refinery29/156/?utm_source=refinery29&utm_medium=web&utm_campaign=160816_R29_WEAR_L P',
'http://wear.net/women-popular/refinery29/157/?utm_source=refinery29&utm_medium=web&utm_campaign=160816_R29_WEAR_L P',
'http://wear.net/women-popular/refinery29/158/?utm_source=refinery29&utm_medium=web&utm_campaign=160816_R29_WEAR_L P',
'http://wear.net/women-popular/refinery29/159/?utm_source=refinery29&utm_medium=web&utm_campaign=160816_R29_WEAR_L P',
'http://wear.net/women-popular/refinery29/160/?utm_source=refinery29&utm_medium=web&utm_campaign=160816_R29_WEAR_L P',
'http://wear.net/women-popular/refinery29/161/?utm_source=refinery29&utm_medium=web&utm_campaign=160816_R29_WEAR_L P',
'http://wear.net/women-popular/refinery29/162/?utm_source=refinery29&utm_medium=web&utm_campaign=160816_R29_WEAR_L P',
'http://wear.net/women-popular/refinery29/163/?utm_source=refinery29&utm_medium=web&utm_campaign=160816_R29_WEAR_L P',
'http://wear.net/women-popular/refinery29/164/?utm_source=refinery29&utm_medium=web&utm_campaign=160816_R29_WEAR_L P'
];
let allsliders = [];
let datenum = 0;
let allPics = [];
function track(action, trackingString) {
    console.log(`Action:${action}`, `Track:${trackingString}`);

    if(typeof ga !== 'undefined') ga('send', 'event', 'xxx', action, trackingString);

    return false;
}

function init() {
    registerEvents();
    getModule();
    getDates();
}

function loadPicture() {
    new PictureLoader().load({
        end: () => {}
    });
    let loaderQueue = new PictureLoader({
        sourceQueue: allPics
    });
    loaderQueue.load({
        end: () => {
            $('.cover').addClass('disblock');
            $('.allbox').addClass('block');
            $('.allbox').removeClass('disblock');
        }
    });
}

function registerEvents() {
    document.getElementById('top-share-facebook').addEventListener('click', () => {
        Util.shareFacebook({
            app_id: '12345',
            link: location.href,
            picture: 'xxx.jpg',
            name: '123',
            description: '456',
            redirect_uri: location.href,
        });
    }, false);

    document.getElementById('top-share-twitter').addEventListener('click', () => {
        Util.shareTwitter({
            text: '123',
            href: location.href,
        });
    }, false);

    document.getElementById('top-share-pinterest').addEventListener('click', () => {
        Util.sharePinterest({
            url: location.href,
            media: 'xxx.jpg',
            description: '123',
        });
    }, false);
}
function getModule(){
    $.ajax({
        url: 'template/slider.swig',
        success: function(content){
            modules = content;
            success = 1;
            allControl();

        }
    });
}

function getDates(){
            datenum = 0;
            var time = 0;
            callback();
            function callback(){
                if(time == datenum){
                    $.ajax({
                        url:urls[time],
                        dataType:'jsonp',
                        success:function(feed){
                                datenum = datenum+1;
                                feeds.push([feed.snaps.length,feed.snaps]);
                                allControl();
                                if(datenum != urls.length){
                                    callback();
                                }
                         }
                    });
                }
                time = time+1;
            }
}
function allControl(){
    if(success && datenum == urls.length){
        feeds.forEach(function(item,n){
            if(item[0]>5){
                if(item[0]>=30){
                    item[1] = item[1].slice(0,29);
                    fillswipsSlider(n);
                    getPics(item[1]);
                }
                else{
                    fillswipsSlider(n);
                    getPics(item[1]);
                }
            }
        });
        $('.topbox').after(allsliders[0]);
        $('.circlebigbox').eq(0).after(allsliders[1]);
        $('.circlebigbox').eq(1).after(allsliders[2]);
        allsliders = allsliders.slice(3,10);
        allsliders.reverse();
        allsliders.forEach(function(item,n){
             $('.circlebigbox').eq(2).after(item);
        });
        loadPicture();
        slider();
    }
}
function getPics(content){
    content.forEach(function(item,n){
        if(n<20){
            allPics.push(item.large_snap_image_url);
        }
    });
}
function fillswipsSlider(num){
    var item = feeds[num];
    if(feeds)
    allsliders[num] = swig.render(modules,{
        locals:{
            feedtitle: feedtitles[num],
            content: item[1],
            ismobile: Platform.isMobile,
            feedlastcard:cardlink[num]
         }
    });
}
function slider(){
    let sliderbox = $('.sliderbox');
    let slider= $('.slider');
    let prevBtn = $('.buttonleft');
    let nextBtn = $('.buttonright');
    let i = sliderbox.length;
        for(var j = 0; j < i; ++j){
            if(Platform.isMobile){
                let widths = $(slider[j]).find('.contentbox').length;
                if(widths==29){
                    widths = 30;
                }
                $(slider[j]).children().css({
                    width:widths*216
                });
                new Iscroll(slider[j], {
                    scrollX: true,
                    scrollY: false,
                    eventPassthrough:true
                });
            }
            else{
                let slider = new Slider({
                    container :sliderbox[j],
                    prevBtn:prevBtn[j],
                    nextBtn:nextBtn[j],
                    loop :false,
                    dragable :false,
                    speed:400
                });
            }
    }
    //if 手机端 dragable －true
}

window.addEventListener('load', init, false);
