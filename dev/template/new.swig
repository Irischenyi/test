<div class ="aa">
{% for item in feed %}
    <li>{{ ooo }}<li>
    {% if (loop.index%5 == 0) %}
</div>

<div class ="aa">
    {% endif%}
{% endfor %}
</div>
