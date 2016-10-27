<div class="feedbox">
    <div class="titlebox">
        <div class="line">
            <div class="linewid"></div>
        </div>
        <div class="title">
            <div class="abox">
                <a href="{{ feedlastcard }}" target="_blank">{{ feedtitle }}</a>
            </div>
        </div>
    </div>
    <div class="sliderbox">
        <div class="slider">
            <div class="sliderapge">
            {% for item in content %}
                    <a href="http://wear.net/{{item.user_name}}/{{item.snap_id}}" target="_blank">
                    <div class="contentbox">
                        <div class="picbox">
                            <div class="preload contenpic" data-source="{{ item.large_snap_image_url }}"></div>
                        </div>
                        <div class="contentbottom">
                                <p>{{item.user_name}}<p>
                        </div>
                        <div class="circle"><div class="preload" data-source="{{ item.large_profile_image_url }}"></div></div>
                    </div>
                    </a>
            {% if (loop.index%10 == 0 && ismobile!=true) %}
            </div>
            <div class="sliderapge">
            {% endif%}
            {% endfor %}
            {% if content.length == 29 %}
            <a href="{{ feedlastcard }}" target="_blank">
                <div class="contentboxs">
                    <div class="back">
                        <div class="preload" data-source="image/card_bg.jpg"></div>
                    </div>
                    <div class="seemore">
                        <p>seemore</p>
                        <p>{{ feedtitle }}</p>
                        <p>looks</p>
                        <p>on the app</p>
                    </div>
                    <div class="letsgo">
                        <p>let's go</p>
                        <div class="go">
                            <div class="preload" data-source="image/edn_ctaArrow.png"></div>
                        </div>
                    </div>
                </div>
            </a>
            {% endif %}
            </div>

        </div>
    </div>
    <div class="buttonbox desk">
        <div class="buttoncenter">
            <div class="middle "></div>
            <div class="buttonleft button">
                <p class='p1'>r</p>
                <span>back</span>
            </div>
            <div class="buttonright button">
                <span>next</span>
                <p class='p2'>l</p>
            </div>
        </div>
    </div>
</div>
